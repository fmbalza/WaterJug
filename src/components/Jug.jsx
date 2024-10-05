import React, { useState, useEffect } from 'react';
import Water from '../assets/water2.png'
import '../styles.css'
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
          margin: '10px auto', 
          position: 'relative', 
          borderRadius: '15px', 
          overflow: 'hidden', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          border: '6px solid #fff',
          borderTop:'2px solid transparent',
          borderTopLeftRadius:'5px',
          borderTopRightRadius:'5px',
        }}>
        <div style={{ 
            height: `${waterHeight}%`, 
            borderRadius:'10px',
            position: 'absolute',
            bottom: 0, 
            width: '100%', 
            backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el div
            backgroundPosition: 'center', 
            backgroundImage: `url(${Water})`,
          }} ></div>
      </div>
 

    </div>
  );
};

export default Jug;