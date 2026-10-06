import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Downloadables() {
  const [unlocked, setUnlocked] = useState(false);

  const vouchers = [
    { title: 'Vale por un masaje post-guardia', icon: '💆‍♀️', code: 'MASAJE-100' },
    { title: 'Vale por una cena donde vos quieras', icon: '🍷', code: 'CENA-LOVE' },
    { title: 'Vale por una guardia cubierta de abrazos', icon: '🫂', code: 'ABRAZO-24H' }
  ];

  return (
    <div className="downloadables-container">
      <h3 className="section-title">🎁 Recompensas del Expediente</h3>
      
      {!unlocked ? (
        <motion.div 
          className="lock-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Para desbloquear estos vales exclusivos, necesitas confirmar tu identidad como la persona más especial.</p>
          <button className="btn-primary" onClick={() => setUnlocked(true)}>
            Desbloquear Recompensas 🔓
          </button>
        </motion.div>
      ) : (
        <div className="vouchers-grid">
          {vouchers.map((voucher, idx) => (
            <motion.div 
              key={idx}
              className="voucher-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="voucher-icon">{voucher.icon}</div>
              <h4>{voucher.title}</h4>
              <div className="voucher-code">Código: {voucher.code}</div>
              <button className="btn-print" onClick={() => window.print()}>
                Imprimir / Guardar 🖨️
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
