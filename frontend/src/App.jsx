import { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import FormularioLaplace from "./components/FormularioLaplace";
import ResultadoLaplace from "./components/ResultadoLaplace";

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

  return (
    <MathJaxContext config={mathjaxConfig}>
      <div className="p-10 max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Transformadas de Laplace 🧠</h1>
        <FormularioLaplace
          setFormulaVista={setFormulaVista}
          setFormulaResultado={setFormulaResultado}
          setResultado={setResultado}
        />
        {resultado && (
          <ResultadoLaplace formula={formulaResultado} resultado={resultado} />
        )}
      </div>
    </MathJaxContext>
  );
}

export default App;
