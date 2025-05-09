import { useState } from "react";
import { MathJax } from "better-react-mathjax";

const funciones = [
  { id: "t**n", label: "tⁿ", parametros: ["n"] },
  { id: "exp(a*t)", label: "e^{a·t}", parametros: ["a"] },
  { id: "t**n*exp(a*t)", label: "tⁿ·e^{a·t}", parametros: ["n", "a"] },
  { id: "sin(a*t)", label: "sin(a·t)", parametros: ["a"] },
  { id: "cos(a*t)", label: "cos(a·t)", parametros: ["a"] },
];

const FormularioLaplace = ({ setFormulaVista, setFormulaResultado, setResultado, setHistorial }) => {
  const [funcion, setFuncion] = useState(funciones[0].id);
  const [parametros, setParametros] = useState({ a: "0", n: "1" });

  const generarFormula = (paramSource) => {
    let expr = funcion;

    if (funcion.includes("n")) {
      const nVal = paramSource.n === "1" ? "" : `^{${paramSource.n}}`;
      expr = expr.replace("t**n", `t${nVal}`);
    }

    if (funcion.includes("a")) {
      expr = expr.replace(/a/g, paramSource.a || "a");
    }

    expr = expr.replace("**", "^");
    return `\\mathcal{L}\\{${expr}\\}`;
  };

  const obtenerParametros = () => {
    const f = funciones.find((f) => f.id === funcion);
    return f ? f.parametros : [];
  };

  const calcular = async () => {
    for (let p of obtenerParametros()) {
      if (!parametros[p]) {
        alert(`Por favor ingresa un valor para "${p}"`);
        return;
      }
    }
  
    const vista = generarFormula(parametros);
    setFormulaVista(vista);
  
    try {
      const res = await fetch("http://localhost:5000/laplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ funcion, parametros }),
      });
  
      const data = await res.json();
      const final = generarFormula(parametros);
      setFormulaResultado(final);
      setResultado(data.resultado);
  
      // 🧠 Guardar en historial
      const nuevoItem = {
        formula: final,
        resultado: data.resultado,
        fecha: new Date().toISOString(),
      };
  
      setHistorial((prev) => {
        const actualizados = [nuevoItem, ...prev];
        localStorage.setItem("laplaceHistorial", JSON.stringify(actualizados));
        return actualizados;
      });
  
    } catch (err) {
      console.error("❌ Error al calcular la transformada:", err);
      alert("Ocurrió un error al procesar la transformada.");
    }
  };
  

  return (
    <div className="space-y-4 dark:bg-gray-900 dark:text-white">
      <select
        className="border p-2 rounded w-full bg-gray-900"
        value={funcion}
        onChange={(e) => {
          setFuncion(e.target.value);
          setParametros({ a: "", n: "1" });
          setResultado("");
          setFormulaVista("");
        }}
      >
        {funciones.map((f) => (
          <option key={f.id} value={f.id}>{f.label}</option>
        ))}
      </select>

      <div className="space-y-2">
        {obtenerParametros().map((param) => (
          <div key={param} className="flex items-center gap-2 dark:bg-gray-900 dark:text-white">
            <button
                onClick={() =>
                    setParametros((prev) => {
                    const actual = parseInt(prev[param]);
                    const nuevo = isNaN(actual) ? 0 : actual - 1;
                    return {
                        ...prev,
                        [param]: String(Math.max(nuevo, -5)),
                    };
                    })
                }
                className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-900 dark:text-white"
            >-</button>
            <input
              type="number"
              name={param}
              value={parametros[param]}
              disabled
              className="w-16 text-center border rounded p-1 dark:bg-gray-900 dark:text-white"
            />
            <button
                onClick={() =>
                    setParametros((prev) => {
                    const actual = parseInt(prev[param]);
                    const nuevo = isNaN(actual) ? 0 : actual + 1;
                    return {
                        ...prev,
                        [param]: String(Math.min(nuevo, 40)),
                    };
                    })
                }
                className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-900 dark:text-white"
            >+</button>
          </div>
        ))}
      </div>

      {/* Vista previa */}
      <div className="p-4 bg-gray-100 rounded dark:bg-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-2 dark:bg-gray-800 dark:text-white">Vista previa:</h3>
        <MathJax>{`\\[${generarFormula(parametros)}\\]`}</MathJax>
      </div>

      <button
        onClick={calcular}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Calcular Transformada
      </button>
    </div>
  );
};

export default FormularioLaplace;
