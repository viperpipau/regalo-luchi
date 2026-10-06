import React from 'react';
import { motion } from 'framer-motion';

export default function Dossier() {
  const entries = [
    {
      date: "Día 1 - El inicio",
      content: "Después de todo lo que viví, después de los días difíciles, los hospitales, la rehabilitación, el miedo, el cansancio y esos momentos en los que sentía que estaba perdiendo todo... apareciste vos."
    },
    {
      date: "Día 14 - El Cambio",
      content: "Y no sé exactamente cómo explicarlo, porque no fue un cambio grande ni espectacular, pero sí fue uno de esos cambios que se sienten en el cuerpo, en el alma, en la forma en que uno vuelve a mirar el mundo. Vos me devolviste las ganas de reírme con ganas."
    },
    {
      date: "Día 30 - El Brillo",
      content: "Ese brillo que alguna vez estuvo ahí, y que, sin darme cuenta, se había ido apagando un poquito. Con vos volví a sentirme linda. Divertida. Querida. Acompañada."
    },
    {
      date: "Día 60 - El Agradecimiento",
      content: "Gracias, Luchi. Por llegar en un momento tan particular de mi vida y hacerme recordar que todavía podía reírme así, que todavía podía ilusionarme, que todavía podía sentirme... querida. Me devolviste a mí."
    }
  ];

  return (
    <div className="dossier-container">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="dossier-title"
      >
        📑 Expediente 001: Evolución
      </motion.h2>
      
      <div className="dossier-timeline">
        {entries.map((entry, index) => (
          <motion.div 
            key={index}
            className="dossier-entry"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="dossier-date">{entry.date}</div>
            <div className="dossier-content">{entry.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
