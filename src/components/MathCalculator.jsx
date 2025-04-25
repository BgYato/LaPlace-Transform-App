import React, { useState } from "react";
import { evaluate } from "mathjs";
import MathComponent from "./MathComponent";

// 🔄 Normalizador de entrada matemática
const normalizeMathInput = (input) => {
    // 1. Asegúrese de que las funciones matemáticas como sin, cos, tan, exp, sinh no reciban el `*` adicional
    const functionsRegex = /\b(sin|cos|tan|log|sqrt|sinh|exp)\(/;
    if (functionsRegex.test(input)) {
      return input; // No normalizar si es una función
    }
  
    // 2. Agregar multiplicación implícita solo entre números y letras
    input = input.replace(/([0-9])([a-zA-Z(])/g, "$1*$2");
  
    // 3. Reemplazar `e^{a*t}` con `exp(a*t)` correctamente
    input = input.replace(/e\^{/g, "exp(").replace(/}/g, ")");
  
    // 4. Reemplazar senh por sinh para que sea reconocido
    input = input.replace(/senh\(/g, "sinh(");
  
    return input;
  };
  
  
  
  
  
  
  




// 🔢 Variables por defecto
const defaultScope = {
  t: 2,       // Valor por defecto de t
  a: 1,       // Valor por defecto de a
  n: 3,       // Valor por defecto de n
  e: Math.E,  // Valor por defecto de e (base de los logaritmos)
  et: Math.E * 1, // Valor de e * t, donde t = 2 (o cualquier otro valor que quieras)
  o: 1,       // Definimos un valor para 'o' como 1 o el valor deseado
};

// 🧠 Lista de funciones comunes
const commonFunctions = [
  { label: "e^{a*t}", value: "e^{a*t}" },
  { label: "exp(2*t)", value: "exp(2*t)" },
  { label: "t^n", value: "t^n" },
  { label: "cos(t)", value: "cos(t)" },
  { label: "sin(t)", value: "sin(t)" },
  { label: "tan(t)", value: "tan(t)" },
  { label: "t^2", value: "t^2" },
  { label: "1", value: "1" },
  { label: "Borrar", value: "CLEAN" },
];

const MathCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    try {
      console.log(expression);
      const cleanedExpr = normalizeMathInput(expression);
      console.log(cleanedExpr);
      const evalResult = evaluate(cleanedExpr, defaultScope);
      console.log(evalResult);
      setResult(evalResult.toString());
    } catch (e) {
      console.log(e);
      setResult("❌ Error en la expresión");
    }
  };

  const handleInsert = (value) => {
    if (value === "CLEAN") {
      setExpression("");
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h2>✍️ Ingresa una expresión matemática</h2>

        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Ej: e^(a*t), sin(t), t^2"
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />

        <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {commonFunctions.map((func) => (
            <button
              key={func.label}
              onClick={() => handleInsert(func.value)}
              style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#f0f0f0",
                cursor: "pointer",
              }}
            >
              {func.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCalculate}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontWeight: "bold" }}
        >
          Calcular
        </button>

        <p style={{ marginTop: "1rem", color: "#888" }}>
          Puedes usar letras como <code>t</code>, <code>a</code>, <code>n</code>, y se evaluarán automáticamente.
        </p>
      </div>

      {/* 📤 Resultado */}
      <div style={{ flex: 1 }}>
        <h3>📤 Expresión escrita:</h3>
        <MathComponent expression={`f(t) = ${expression}`} />

        <h3 style={{ marginTop: "2rem" }}>✅ Resultado:</h3>
        <p style={{ fontSize: "1.2rem" }}>{result}</p>
      </div>
    </div>
  );
};

export default MathCalculator;
