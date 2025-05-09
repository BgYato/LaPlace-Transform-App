import { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import FormularioLaplace from "./components/FormularioLaplace";
import ResultadoLaplace from "./components/ResultadoLaplace";
import HistorialLaplace from "./components/HistorialLaplace";



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

  return (
    <MathJaxContext config={mathjaxConfig}>
      <div className="max-w-screen-xl mx-auto px-6 py-10 space-y-6 bg-white text-black dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold">Transformadas de Laplace 🧠</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 lg:w-3/6"> {/* Ajusta el ancho del formulario */}
            <FormularioLaplace
              setFormulaVista={setFormulaVista}
              setFormulaResultado={setFormulaResultado}
              setResultado={setResultado}
              setHistorial={setHistorial}
            />
            {resultado && (
              <ResultadoLaplace formula={formulaResultado} resultado={resultado} />
            )}
          </div>

          <div className="lg:w-3/6"> {/* Ajusta el ancho del historial */}
            <HistorialLaplace historial={historial} setHistorial={setHistorial} />
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
