export const chainedCases = [
  {
    id: 'case-shock-01',
    title: 'CASO ENCADENADO · DETERIORO AGUDO',
    description: 'Paciente de 72 años: FC 124, TA 86/52, FR 31, SatO₂ 87% y confusión aguda.',
    stages: [
      {
        question: '¿Cuál es la prioridad inicial?',
        options: ['Completar antecedentes', 'Evaluar ABC y activar respuesta urgente', 'Ofrecer alimentos', 'Programar control para mañana'],
        correct: 1,
        explanation: 'Hay compromiso respiratorio, circulatorio y neurológico; se requiere evaluación ABC y ayuda inmediata.',
      },
      {
        question: '¿Qué parámetro refleja directamente la perfusión cerebral en este momento?',
        options: ['Color del cabello', 'Estado mental', 'Peso habitual', 'Talla'],
        correct: 1,
        explanation: 'La confusión aguda puede ser una manifestación temprana de hipoperfusión cerebral.',
      },
      {
        question: '¿Qué cambio indicaría mayor deterioro?',
        options: ['FC baja a 116', 'SatO₂ sube a 92%', 'TA cae a 72/38 y responde solo al dolor', 'FR baja a 26 con menor esfuerzo'],
        correct: 2,
        explanation: 'La hipotensión más profunda y el descenso del nivel de conciencia indican deterioro de perfusión.',
      },
    ],
  },
  {
    id: 'case-resp-02',
    title: 'CASO ENCADENADO · COMPROMISO RESPIRATORIO',
    description: 'Paciente de 54 años con disnea súbita, FR 34, SatO₂ 85%, habla entrecortada y ansiedad.',
    stages: [
      {
        question: '¿Qué evaluación tiene prioridad?',
        options: ['Patrón respiratorio y permeabilidad de vía aérea', 'Preferencias alimentarias', 'Historia familiar completa', 'Escala de caídas'],
        correct: 0,
        explanation: 'La dificultad respiratoria obliga a valorar primero vía aérea y respiración.',
      },
      {
        question: '¿Qué hallazgo sugiere fatiga respiratoria?',
        options: ['Habla más fluida', 'Disminución del sensorio y respiración cada vez más superficial', 'SatO₂ en ascenso', 'Menor uso de músculos accesorios con mejoría clínica'],
        correct: 1,
        explanation: 'El deterioro neurológico y la respiración superficial pueden indicar agotamiento ventilatorio.',
      },
      {
        question: '¿Qué conducta es prioritaria ante ese cambio?',
        options: ['Dejar a la persona sola', 'Activar ayuda urgente y preparar soporte ventilatorio según protocolo', 'Esperar una hora', 'Ofrecer medicación oral'],
        correct: 1,
        explanation: 'La fatiga respiratoria puede preceder al paro; requiere escalamiento y soporte inmediato.',
      },
    ],
  },
]

export const priorityScenarios = [
  {
    id: 'priority-a',
    prompt: '¿A quién valorarías primero?',
    patients: ['A. Paciente estable esperando alta.', 'B. Dolor crónico 6/10 sin cambios.', 'C. Nueva dificultad respiratoria y SatO₂ 84%.', 'D. Solicita medicación para dormir.'],
    correct: 2,
    explanation: 'La hipoxemia con disnea constituye la amenaza inmediata.',
  },
  {
    id: 'priority-b',
    prompt: 'Cuatro llamados simultáneos. ¿Cuál tiene prioridad?',
    patients: ['A. Pide ayuda para acomodar una almohada.', 'B. Presenta debilidad facial súbita y lenguaje alterado.', 'C. Refiere hambre.', 'D. Espera un cambio de vendaje programado.'],
    correct: 1,
    explanation: 'El déficit neurológico focal súbito es una emergencia tiempo-dependiente.',
  },
  {
    id: 'priority-c',
    prompt: '¿Qué paciente requiere respuesta inmediata?',
    patients: ['A. Temperatura 37,6 °C.', 'B. TA habitual 132/78.', 'C. Somnolencia nueva con FR 7/min tras analgesia.', 'D. Náuseas leves sin vómitos.'],
    correct: 2,
    explanation: 'La bradipnea y somnolencia sugieren depresión respiratoria.',
  },
]

export const errorScenarios = [
  {
    id: 'error-a',
    situation: 'Se prepara medicación para habitación 204 verificando únicamente el número de cama.',
    options: ['Falta higiene de manos exclusivamente', 'No se usaron dos identificadores válidos', 'La habitación es un identificador suficiente', 'El error es registrar antes'],
    correct: 1,
    explanation: 'El número de habitación no identifica de forma segura; deben usarse dos identificadores válidos.',
  },
  {
    id: 'error-b',
    situation: 'Una medicación de alto riesgo es chequeada por dos personas leyendo juntas la misma etiqueta.',
    options: ['El chequeo no fue independiente', 'Sobran identificadores', 'La vía siempre es incorrecta', 'No existe ningún error'],
    correct: 0,
    explanation: 'Un doble chequeo independiente evita que una persona influya sobre la verificación de la otra.',
  },
  {
    id: 'error-c',
    situation: 'Se tritura una tableta de liberación prolongada para facilitar la deglución sin verificar la formulación.',
    options: ['No se registró el peso', 'Puede alterarse la liberación del fármaco', 'La trituración siempre mejora seguridad', 'El horario es el único problema'],
    correct: 1,
    explanation: 'Las formulaciones de liberación prolongada no deben alterarse sin verificación específica.',
  },
]
