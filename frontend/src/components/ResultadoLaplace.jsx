import { MathJax } from "better-react-mathjax";

const ResultadoLaplace = ({ formula, resultado }) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-semibold">Resultado:</h2>
      <div className="p-4 bg-gray-100 rounded">
        <MathJax>{`\\[${formula} = ${resultado}\\]`}</MathJax>
      </div>
    </div>
  );
};

export default ResultadoLaplace;
