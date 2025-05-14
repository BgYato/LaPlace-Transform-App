import { MathJaxContext } from "better-react-mathjax";
import FormularioLaplace from "./components/FormularioLaplace";
import ResultadoLaplace from "./components/ResultadoLaplace";
import HistorialLaplace from "./components/HistorialLaplace";
import { useState } from "react";
import { useTheme } from "./context/ThemeContext"; // 👈

const mathjaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
};

function App() {
  const [formulaVista, setFormulaVista] = useState("");
  const [formulaResultado, setFormulaResultado] = useState("");
  const [resultado, setResultado] = useState("");
  const [historial, setHistorial] = useState(() => {
    const data = localStorage.getItem("laplaceHistorial");
    return data ? JSON.parse(data) : [];
  });

  const { darkMode, setDarkMode } = useTheme();

  return (
    <MathJaxContext config={mathjaxConfig}>
      <div
        className={`min-h-screen transition-colors duration-500 ease-in-out ${
          darkMode ? "bg-gray-900 text-white" : "bg-[#f9f9f9] text-black"
        }`}
      >
        <div className="flex justify-end px-6 pt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border border-gray-400 dark:border-white transition-all duration-300 hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Cambiar tema"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Transformadas de Laplace
            <img src={`${ darkMode ? "/icon_white.png" : "/icon_dark.png" }`} alt="" className="h-10 w-10" />
          </h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 lg:w-3/6">
              <FormularioLaplace
                setFormulaVista={setFormulaVista}
                setFormulaResultado={setFormulaResultado}
                setResultado={setResultado}
                setHistorial={setHistorial}
              />
              {resultado && (
                <ResultadoLaplace
                  formula={formulaResultado}
                  resultado={resultado}
                />
              )}
            </div>

            <div className="lg:w-3/6">
              <HistorialLaplace
                historial={historial}
                setHistorial={setHistorial}
              />
            </div>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
