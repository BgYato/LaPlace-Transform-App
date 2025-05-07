from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
import sympy as sp # type: ignore

app = Flask(__name__)
CORS(app)  # para permitir requests desde React

# Variables simbólicas
t, s, a, n = sp.symbols('t s a n')

@app.route('/laplace', methods=['POST'])
def laplace_transform():
    data = request.get_json()
    funcion = data.get('funcion')
    params = data.get('parametros', {})

    pasos = []
    expr = None

    try:
        # Construir expresión según el tipo
        if funcion == "t**n":
            n_val = int(params.get("n", 1))
            expr = t**n_val
            pasos.append(f"Función original: t**n con n={n_val}")
            pasos.append(f"Expresión simbólica: t^{n_val}")

        elif funcion == "exp(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.exp(a_val * t)
            pasos.append(f"Función original: e^(a*t) con a={a_val}")
            pasos.append(f"Expresión simbólica: e^({a_val}*t)")

        elif funcion == "t**n*exp(a*t)":
            n_val = int(params.get("n", 1))
            a_val = float(params.get("a", 1))
            expr = (t**n_val) * sp.exp(a_val * t)
            pasos.append(f"Función original: t**n * e^(a*t) con n={n_val}, a={a_val}")
            pasos.append(f"Expresión simbólica: t^{n_val} * e^({a_val}*t)")

        elif funcion == "sin(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.sin(a_val * t)
            pasos.append(f"Función original: sin(a*t) con a={a_val}")
            pasos.append(f"Expresión simbólica: sin({a_val}*t)")

        elif funcion == "cos(a*t)":
            a_val = float(params.get("a", 1))
            expr = sp.cos(a_val * t)
            pasos.append(f"Función original: cos(a*t) con a={a_val}")
            pasos.append(f"Expresión simbólica: cos({a_val}*t)")

        else:
            return jsonify({"error": "Función no soportada"}), 400

        # Calcular la transformada de Laplace
        transformada = sp.laplace_transform(expr, t, s, noconds=True)
        latex_resultado = sp.latex(transformada)

        pasos.append(f"Transformada de Laplace: {transformada}")

        return jsonify({
            "resultado": latex_resultado,
            "pasos": pasos
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
