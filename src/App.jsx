import { useState } from 'react'
import './App.css'
import MathCalculator from './components/MathCalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>🌟 Aplicación Matemática</h1>
      <MathCalculator />
    </>
  )
}

export default App
