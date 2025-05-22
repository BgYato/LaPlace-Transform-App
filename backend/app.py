from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore
import sympy as sp  # type: ignore

app = Flask(__name__)
CORS(app)

t, s, = sp.symbols('t s')

@app.route('/laplace', methods=['POST'])
def laplace_transform():
    data = request.get_json()
    funcion = data.get('funcion')
    params = data.get('parametros', {})

    pasos = []
    expr = None

    try:
        if funcion == "t**n":
            n_val = int(params.get("n", 1))
            expr = t**n_val
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad n = {n_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = t^{{{n_val}}}")
            pasos.append("\\textbf{3. Fórmula:} \\quad \\mathcal{L}\\{t^n\\} = \\frac{n!}{s^{n+1}}")
            pasos.append(f"\\textbf{{4. Sustituimos:}} \\quad \\frac{{{n_val}!}}{{s^{{{n_val+1}}}}} = \\frac{{{sp.factorial(n_val)}}}{{s^{{{n_val+1}}}}}")

        elif funcion == "exp(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.exp(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = e^{{{a_val}t}}")
            pasos.append("\\textbf{3. Fórmula:} \\quad \\mathcal{L}\\{e^{at}\\} = \\frac{1}{s - a}")
            pasos.append(f"\\textbf{{4. Sustituimos:}} \\quad \\frac{{1}}{{s - ({a_val})}}")

        elif funcion == "t**n*exp(a*t)":
            n_val = int(params.get("n", 1))
            a_val = float(params.get("a", 1))
            expr = (t**n_val) * sp.exp(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad n = {n_val},\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = t^{{{n_val}}} e^{{{a_val}t}}")
            pasos.append("\\textbf{3. Fórmula:} \\quad \\mathcal{L}\\{t^n e^{at}\\} = \\frac{n!}{(s - a)^{n+1}}")
            pasos.append(f"\\textbf{{4. Sustituimos:}} \\quad \\frac{{{sp.factorial(n_val)}}}{{(s - ({a_val}))^{{{n_val + 1}}}}}")

        elif funcion == "sin(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.sin(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = \\sin({a_val}t)")
            pasos.append("\\textbf{3. Fórmula:} \\quad \\mathcal{L}\\{\\sin(at)\\} = \\frac{a}{s^2 + a^2}")
            pasos.append(f"\\textbf{{4. Sustituimos:}} \\quad \\frac{{{a_val}}}{{s^2 + ({a_val})^2}}")

        elif funcion == "cos(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.cos(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = \\cos({a_val}t)")
            pasos.append("\\textbf{3. Fórmula:} \\quad \\mathcal{L}\\{\\cos(at)\\} = \\frac{s}{s^2 + a^2}")
            pasos.append(f"\\textbf{{4. Sustituimos:}} \\quad \\frac{{s}}{{s^2 + ({a_val})^2}}")

        else:
            return jsonify({"error": "Función no soportada"}), 400

        pasos.append(f"\\textbf{{5. Forma simbólica:}}\\quad f(t) = {sp.latex(expr)}")

        transformada = sp.laplace_transform(expr, t, s, noconds=True)
        eq = sp.Eq(sp.Function('L')(expr), transformada)

        pasos.append(f"\\textbf{{6. Aplicamos la transformada:}}\\quad {sp.latex(eq)}")
        pasos.append(f"\\textbf{{7. Resultado final:}}\\quad \\boxed{{{sp.latex(transformada)}}}")

        return jsonify({
            "resultado": sp.latex(transformada),
            "pasos": pasos
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
