import { MathJax } from "better-react-mathjax";

const ResultadoLaplace = ({ formula, resultado }) => {
  return (
    <div className="mt-6 border-t pt-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Resultado:</h2>
      <div className="p-4 bg-gray-100 rounded dark:bg-gray-800 dark:text-white">
        <MathJax>{`\\[${formula} = ${resultado}\\]`}</MathJax>
      </div>
    </div>
  );
};

export default ResultadoLaplace;
