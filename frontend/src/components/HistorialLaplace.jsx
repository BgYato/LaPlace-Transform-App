import { useState } from "react";
import { MathJax } from "better-react-mathjax";

const HistorialLaplace = ({ historial, setHistorial }) => {
  const [expandido, setExpandido] = useState(null);

  const eliminar = (index) => {
    const nuevo = historial.filter((_, i) => i !== index);
    setHistorial(nuevo);
    localStorage.setItem("laplaceHistorial", JSON.stringify(nuevo));
  };

  return (
    <div className="w-full max-w-md ml-auto space-y-4">
      <h2 className="text-xl font-bold">📜 Historial</h2>

      {historial.length === 0 && <p className="text-sm text-gray-400">Sin transformadas aún.</p>}

      {historial.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 p-3 rounded shadow dark:bg-gray-800 dark:text-white"
        >
          <div className="flex justify-between items-center">
            <button
              className="text-left w-full"
              onClick={() => setExpandido(expandido === index ? null : index)}
            >
              <MathJax>{`\\(${item.formula}\\)`}</MathJax>
            </button>
            <button
              className="ml-4 text-red-500 hover:text-red-700"
              onClick={() => eliminar(index)}
              title="Eliminar"
            >
              🗑️
            </button>
          </div>

          {expandido === index && (
            <div className="mt-2 pl-2 border-l-2 border-blue-400">
              <p className="text-sm font-semibold">Resultado:</p>
              <MathJax>{`\\(${item.resultado}\\)`}</MathJax>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistorialLaplace;
