import React, { useState } from 'react';
import Jug from './components/jug';
import Modal from './components/Modal';
import './App.css';
import './styles.css';

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const solveWaterJug = () => {
    // Check if any input is empty
    if (!x || !y || !z) {
      setError('Please enter all data.');
      setSteps([]);
      setIsModalOpen(true);
      return;
    }
  
    // Validate that capacities and the desired amount are reasonable
    if (x <= 0 || y <= 0 || z <= 0 || z > Math.max(x, y)) {
      setError('No Solution');
      setSteps([]);
      setIsModalOpen(true);
      return;
    }
  
    const result = calculateSteps(x, y, z);
    setSteps(result);
    setError(result.length === 0 ? 'No Solution' : '');
    setIsModalOpen(true);
  };

  const calculateSteps = (x, y, z) => {
    const visited = new Set(); // Set to track visited states
    const queue = [[0, 0, []]]; // Queue for BFS: [amount in Jug X, amount in Jug Y, steps]

    while (queue.length > 0) {
      const [a, b, currentSteps] = queue.shift(); // Dequeue the first element

      // If we find the solution
      if (a === z || b === z) {
        return [...currentSteps, `SOLVED: [${a}, ${b}]`];
      }

      // Define possible states
      const states = [
        [x, b, [...currentSteps, `Fill Jug X: [${x}, ${b}]`]], // Fill Jug X
        [a, y, [...currentSteps, `Fill Jug Y: [${a}, ${y}]`]], // Fill Jug Y
        [0, b, [...currentSteps, `Empty Jug X: [0, ${b}]`]],   // Empty Jug X
        [a, 0, [...currentSteps, `Empty Jug Y: [${a}, 0]`]],   // Empty Jug Y
        [Math.max(0, a - (y - b)), Math.min(y, b + a), [...currentSteps, `Transfer from Jug X to Jug Y: [${Math.max(0, a - (y - b))}, ${Math.min(y, b + a)}]`]], // Transfer from X to Y
        [Math.min(x, a + b), Math.max(0, b - (x - a)), [...currentSteps, `Transfer from Jug Y to Jug X: [${Math.min(x, a + b)}, ${Math.max(0, b - (x - a))}]`]]  // Transfer from Y to X
      ];

      for (const state of states) {
        const [newA, newB, newSteps] = state;
        const stateKey = `${newA},${newB}`; // Create a unique key for the state
        if (!visited.has(stateKey)) { // If we haven't visited this state
          visited.add(stateKey);
          queue.push([newA, newB, newSteps]); // Enqueue the new state
        }
      }
    }

    return [];
  };

  return (
    <div className="app">
      <h1>Water Jug Challenge.</h1>
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

      {/* Display the modal with steps */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} steps={steps} />
    </div>
  );
};

export default App;