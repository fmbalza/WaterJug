import React, { useState } from 'react';
import Jug from './components/jug';
import Step from './components/Step';
import './App.css';
import './styles.css'

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');

  const solveWaterJug = () => {
    if (x <= 0 || y <= 0 || z <= 0 || z > Math.max(x, y)) {
      setError('No Solution');
      return;
    }
    const result = calculateSteps(x, y, z);
    setSteps(result);
    setError(result.length === 0 ? 'No Solution' : '');
  };

  const calculateSteps = (x, y, z) => {
    const steps = [];
    const visited = new Set();
    const queue = [[0, 0, []]]; // [amount in Jug X, amount in Jug Y, steps]

    while (queue.length > 0) {
      const [a, b, currentSteps] = queue.shift();

      if (a === z || b === z) {
        return [...currentSteps, `SOLVED: [${a}, ${b}]`];
      }

      // Generar todos los posibles estados
      const states = [
        [x, b, [...currentSteps, `Fill Jug X: [${x}, ${b}]`]],     // Fill Jug X
        [a, y, [...currentSteps, `Fill Jug Y: [${a}, ${y}]`]],     // Fill Jug Y
        [0, b, [...currentSteps, `Empty Jug X: [0, ${b}]`]],       // Empty Jug X
        [a, 0, [...currentSteps, `Empty Jug Y: [${a}, 0]`]],       // Empty Jug Y
        [Math.max(0, a - (y - b)), Math.min(y, b + a), [...currentSteps, `Transfer from Jug X to Jug Y: [${Math.max(0, a - (y - b))}, ${Math.min(y, b + a)}]`]], // Transfer X to Y
        [Math.min(x, a + b), Math.max(0, b - (x - a)), [...currentSteps, `Transfer from Jug Y to Jug X: [${Math.min(x, a + b)}, ${Math.max(0, b - (x - a))}]`]]  // Transfer Y to X
      ];

      for (const state of states) {
        const [newA, newB, newSteps] = state;
        const stateKey = `${newA},${newB}`;
        if (!visited.has(stateKey)) {
          visited.add(stateKey);
          queue.push([newA, newB, newSteps]);
        }
      }
    }

    return []; // No solution found
  };

  return (
    <div className="app">
      <h1>Water Jug Challenge</h1>
      <div className="input-container">
        <input type="number" placeholder="Capacity of Jug X" onChange={(e) => setX(parseInt(e.target.value))} />
        <input type="number" placeholder="Capacity of Jug Y" onChange={(e) => setY(parseInt(e.target.value))} />
        <input type="number" placeholder="Desired Amount (Z)" onChange={(e) => setZ(parseInt(e.target.value))} />
        
      </div>
      <div>
      <button className='solve' onClick={solveWaterJug}>Solve</button>
      </div>
      <Jug capacity={x} initialAmount={z} />
      <Jug capacity={y} initialAmount={z} />
      {error && <div className="error">{error}</div>}
         {steps.length > 0 && (
        <div className="steps">
          <h2>Steps:</h2>
          <table>
            <thead>
              <tr className="title">
                <th>Step</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr key={index}>
                  <td>{step.includes('SOLVED') ? 'SOLVED' : step}</td>
                  <td>{step.includes('[') ? step.split('[')[1].split(']')[0] : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
};

export default App;