import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Puzzle({ onComplete }) {
  const [step, setStep] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);
  
  const questions = [
    {
      question: "Paciente reporta 'taquicardia severa' cada vez que suena su celular y es un mensaje tuyo. ¿Cuál es el tratamiento indicado?",
      options: ["Paracetamol", "Bloqueadores beta", "Un beso sublingual", "Oxigenoterapia"],
      answer: 2 // index of "Un beso sublingual"
    },
    {
      question: "Cálculo de goteo rápido: Si necesitas infundir 1000ml de 'Amorina' a una persona que te devolvió el brillo, ¿a cuántas gotas por minuto lo pasas?",
      options: ["A chorro (bolo directo al corazón)", "21 gotas/min", "14 gotas/min", "No se infunde, se abraza"],
      answer: 0
    }
  ];

  const handleOption = (idx) => {
    if (idx === questions[step].answer) {
      setError(false);
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="puzzle-container">
      <h3 className="section-title">🧩 Evaluación Clínica</h3>
      <div className="puzzle-card">
        <div className="puzzle-progress">Pregunta {step + 1} de {questions.length}</div>
        
        <motion.div 
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="puzzle-question"
        >
          <h4>{questions[step].question}</h4>
          
          <div className="puzzle-options">
            {questions[step].options.map((opt, idx) => (
              <motion.button 
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="puzzle-btn"
                onClick={() => handleOption(idx)}
              >
                {opt}
              </motion.button>
            ))}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="error-msg"
            >
              ❌ Diagnóstico incorrecto. Intenta otra vez, enfermera.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
