from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore
import sympy as sp  # type: ignore

app = Flask(__name__)
CORS(app)

t, s, a, n = sp.symbols('t s a n')

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

        elif funcion == "exp(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.exp(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = e^{{{a_val}t}}")

        elif funcion == "t**n*exp(a*t)":
            n_val = int(params.get("n", 1))
            a_val = float(params.get("a", 1))
            expr = (t**n_val) * sp.exp(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad n = {n_val},\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = t^{{{n_val}}} e^{{{a_val}t}}")

        elif funcion == "sin(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.sin(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = \\sin({a_val}t)")

        elif funcion == "cos(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.cos(a_val * t)
            pasos.append(f"\\textbf{{1. Definimos:}}\\quad a = {a_val}")
            pasos.append(f"\\textbf{{2. Función:}}\\quad f(t) = \\cos({a_val}t)")

        else:
            return jsonify({"error": "Función no soportada"}), 400

        # Mostrar función simbólica bonita
        pasos.append(f"\\textbf{{3. Forma simbólica:}}\\quad f(t) = {sp.latex(expr)}")

        # Calcular transformada
        transformada = sp.laplace_transform(expr, t, s, noconds=True)

        # Paso 4: Aplicar transformada
        eq = sp.Eq(sp.Function('L')(expr), transformada)
        pasos.append(f"\\textbf{{4. Aplicamos la transformada:}}\\quad {sp.latex(eq)}")

        # Resultado final
        pasos.append(f"\\textbf{{5. Resultado final:}}\\quad {sp.latex(transformada)}")


        return jsonify({
            "resultado": sp.latex(transformada),
            "pasos": pasos
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
