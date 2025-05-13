import { useState } from "react";
import { MathJax } from "better-react-mathjax";
import { useTheme } from "../context/ThemeContext";

const HistorialLaplace = ({ historial, setHistorial }) => {
  const [expandido, setExpandido] = useState(null);
  const { darkMode } = useTheme();

  const eliminar = (index) => {
    const nuevo = historial.filter((_, i) => i !== index);
    setHistorial(nuevo);
    localStorage.setItem("laplaceHistorial", JSON.stringify(nuevo));
  };

  return (
    <div className="w-full max-w-md ml-auto space-y-4">
      <h2 className="text-xl font-bold">📜 Historial</h2>

      {historial.length === 0 && <p className={`text-sm ${darkMode ? "text-gray-400" : "text-black"}`}>Sin transformadas aún.</p>}

      {historial.map((item, index) => (
        <div
          key={index}
          className={`bg-gray-100 p-3 rounded shadow ${darkMode ? "bg-gray-800 text-white" : ""}`}
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

          <div
            className={`mt-2 pl-2 border-l-2 border-blue-400 overflow-hidden transition-all duration-300 ${
              expandido === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-sm font-semibold">Resultado:</p>
            <MathJax>{`\\(${item.resultado}\\)`}</MathJax>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorialLaplace;
