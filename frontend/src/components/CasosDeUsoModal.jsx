import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { MathJax } from "better-react-mathjax";
import { ejemplos } from "../utils/diccionario";


const extraerFuncion = (formula) => {
  const match = formula.match(/\\mathcal{L}\\\\?\{(.+?)\\\\?\}/);
  return match ? match[1] : formula;
};

const normalizarFuncion = (funcion) => {
  return funcion
    .replace(/\^{(\d+)}/g, "^$1") 
    .replace(/\\cdot/g, "*");      
};

const obtenerTipoFuncion = (formula) => {
  const funcionRaw = extraerFuncion(formula);
  const funcion = normalizarFuncion(funcionRaw);

  if (/^1$/.test(funcion)) return "1";
  if (/t\^\d+\*?exp\([^)]+\)/.test(funcion)) return "t^n*exp(a*t)";
  if (/sin\([^)]+\)\*exp\([^)]+\)/.test(funcion)) return "sin(a*t)*exp(a*t)";
  if (/cos\([^)]+\)\*exp\([^)]+\)/.test(funcion)) return "cos(a*t)*exp(a*t)";
  if (/t\^\d+/.test(funcion)) return "t^n";
  if (/exp\([^)]+\)/.test(funcion)) return "exp(a*t)";
  if (/sin\([^)]+\)/.test(funcion)) return "sin(a*t)";
  if (/cos\([^)]+\)/.test(funcion)) return "cos(a*t)";

  return null;
};

const CasosDeUsoModal = ({ formula, onClose }) => {
  const { darkMode } = useTheme();
  const tipo = obtenerTipoFuncion(formula);
  const ejemplosTipo = ejemplos[tipo] || ["Este resultado puede aplicarse en distintos campos como la ingeniería o la física."];

  const aleatorio = ejemplosTipo[Math.floor(Math.random() * ejemplosTipo.length)];  

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className={`p-6 rounded shadow-lg max-w-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
        <h2 className="text-lg font-bold mb-4">🧠 Caso de Uso</h2>
        <p className="mb-4">
          <MathJax>
            {`La función \\(${formula}\\) se puede aplicar en:`}
          </MathJax>
        </p>
        <div className={`italic border-l-4 border-blue-500 pl-4 ${darkMode ? "bg-gray-800 text-blue-300" : "bg-gray-200"}`}>
          {aleatorio}
        </div>
        <button
          className={`p-2 mt-2 rounded ${ darkMode ? "bg-gray-600 text-white hover:bg-gray-500" :  "bg-gray-300 text-black hover:bg-gray-400"}`}
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CasosDeUsoModal;
