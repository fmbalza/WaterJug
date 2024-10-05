import React, { useState, useEffect } from 'react';
import waterImage from '../assets/water.jpg'
const Jug = ({ capacity, initialAmount }) => {
  const [amount, setAmount] = useState(initialAmount); 
  console.log(capacity)

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]); 

  const waterHeight =  (amount / capacity) * 100;
  // console  store+78480
 
  return (
    <div className="jug">
      <h3>Jug {capacity} Gallons</h3>
      <div className="jug-state">
        {amount === 0 ? 'Empty' : amount === capacity ? 'Full' : 'Partially Full'}
      </div>
      <div style={{ 
          height: '200px', 
          width: '80px', 
          background: 'lightblue', 
          margin: '10px auto', 
          position: 'relative', 
          borderRadius: '40px 40px 0 0', 
          overflow: 'hidden', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderLeft: '5px solid #d4f5ff',
          borderRight: '5px solid #d4f5ff',
          borderBottom: '5px solid #d4f5ff',
        }}>
        <div style={{ 
            height: `${waterHeight}%`, 
            borderRadius:'10px',
            position: 'absolute',
            bottom: 0, 
            width: '100%', 
            backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el div
            backgroundPosition: 'center', 
            backgroundImage: `url(${waterImage})`,
          }}></div>
      </div>
 

    </div>
  );
};

export default Jug;