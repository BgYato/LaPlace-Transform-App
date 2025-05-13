import { MathJax } from "better-react-mathjax";
import { useTheme } from "../context/ThemeContext";

const ResultadoLaplace = ({ formula, resultado }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`p-4 bg-gray-100 rounded mt-4 ${ darkMode ? "bg-gray-800 text-white" :  ""}`}>
      <h2 className="text-xl font-semibold mb-4">Resultado:</h2>
      <div className={`bg-gray-100 rounded ${ darkMode ? "bg-gray-800 text-white" :  ""}`}>
        <MathJax>{`\\[${formula} = ${resultado}\\]`}</MathJax>
      </div>
    </div>
  );
};

export default ResultadoLaplace;
