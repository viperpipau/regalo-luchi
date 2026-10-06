const pointsByDifficulty = { practice: 60, guardia: 90, critical: 120 }

const q = (id, category, difficulty, question, options, correct, explanation) => ({
  id,
  category,
  difficulty,
  question,
  options,
  correct,
  explanation,
  points: pointsByDifficulty[difficulty],
})

export const nursingQuestions = [
  // Cálculo de dosis · 10
  q('calc-001', 'Cálculo de dosis', 'practice', 'Se indican 10 mg/kg a una persona de 18 kg. ¿Qué dosis corresponde?', ['18 mg', '180 mg', '1.800 mg', '0,18 mg'], 1, 'Se multiplica 10 mg por 18 kg: la dosis indicada es 180 mg.'),
  q('calc-002', 'Cálculo de dosis', 'practice', 'Indicación: 750 mg. Disponible: 500 mg en 2 mL. ¿Qué volumen se administra?', ['1,5 mL', '2 mL', '3 mL', '4 mL'], 2, '750 × 2 / 500 = 3 mL.'),
  q('calc-003', 'Cálculo de dosis', 'practice', 'Una indicación de 0,25 g equivale a:', ['25 mg', '250 mg', '2.500 mg', '0,025 mg'], 1, 'Un gramo equivale a 1.000 mg; 0,25 g son 250 mg.'),
  q('calc-004', 'Cálculo de dosis', 'guardia', 'Se indican 1,2 g y cada frasco contiene 400 mg. ¿Cuántos frascos se necesitan?', ['2', '2,5', '3', '4'], 2, '1,2 g son 1.200 mg; 1.200 / 400 = 3 frascos.'),
  q('calc-005', 'Cálculo de dosis', 'guardia', 'Indicación: 30 mg/kg/día divididos en 3 dosis para 24 kg. ¿Cuántos mg corresponden por dosis?', ['180 mg', '240 mg', '360 mg', '720 mg'], 1, '30 × 24 = 720 mg al día; dividido en 3 dosis son 240 mg por dosis.'),
  q('calc-006', 'Cálculo de dosis', 'guardia', 'Se indican 125 microgramos. Hay comprimidos de 0,25 mg. ¿Qué fracción corresponde?', ['¼ comprimido', '½ comprimido', '1 comprimido', '2 comprimidos'], 1, '0,25 mg equivale a 250 microgramos; 125 es la mitad.'),
  q('calc-007', 'Cálculo de dosis', 'practice', '¿Cuántos mililitros hay en 1,5 litros?', ['150 mL', '500 mL', '1.050 mL', '1.500 mL'], 3, 'Cada litro contiene 1.000 mL; 1,5 L equivalen a 1.500 mL.'),
  q('calc-008', 'Cálculo de dosis', 'critical', 'Indicación: 45 mg. Solución disponible: 30 mg/mL. ¿Qué volumen corresponde?', ['0,67 mL', '1 mL', '1,5 mL', '2 mL'], 2, 'Volumen = 45 mg / 30 mg por mL = 1,5 mL.'),
  q('calc-009', 'Cálculo de dosis', 'critical', 'Se indican 0,4 mg. La ampolla contiene 1 mg en 2 mL. ¿Qué volumen se extrae?', ['0,4 mL', '0,8 mL', '1,2 mL', '2 mL'], 1, 'La concentración es 0,5 mg/mL; para 0,4 mg se necesitan 0,8 mL.'),
  q('calc-010', 'Cálculo de dosis', 'critical', 'Un frasco de 1 g se reconstituye a 10 mL. Se indican 600 mg. ¿Qué volumen corresponde?', ['4 mL', '5 mL', '6 mL', '8 mL'], 2, 'La concentración final es 100 mg/mL; 600 mg requieren 6 mL.'),

  // Goteo e infusión · 10
  q('inf-001', 'Goteo e infusión', 'practice', 'Se deben infundir 500 mL en 4 horas. ¿Qué velocidad se programa?', ['100 mL/h', '125 mL/h', '150 mL/h', '200 mL/h'], 1, '500 mL / 4 h = 125 mL/h.'),
  q('inf-002', 'Goteo e infusión', 'guardia', '1.000 mL en 8 horas con macrogotero de 20 gotas/mL. ¿Cuántas gotas/min?', ['21', '32', '42', '60'], 2, '(1.000 × 20) / 480 minutos = 41,7; se redondea a 42 gotas/min.'),
  q('inf-003', 'Goteo e infusión', 'practice', 'Una solución de 100 mL debe pasar en 30 minutos. ¿Qué velocidad en mL/h corresponde?', ['50', '100', '150', '200'], 3, 'Treinta minutos son 0,5 horas; 100 / 0,5 = 200 mL/h.'),
  q('inf-004', 'Goteo e infusión', 'guardia', 'Se infunden 120 mL en 2 horas con microgotero de 60 microgotas/mL. ¿Microgotas/min?', ['30', '45', '60', '120'], 2, '(120 × 60) / 120 minutos = 60 microgotas/min.'),
  q('inf-005', 'Goteo e infusión', 'practice', 'Una bolsa de 250 mL corre a 50 mL/h. ¿Cuánto durará?', ['2 h', '4 h', '5 h', '6 h'], 2, '250 / 50 = 5 horas.'),
  q('inf-006', 'Goteo e infusión', 'guardia', 'Quedan 300 mL y la bomba está a 75 mL/h. ¿En cuánto tiempo finalizará?', ['2 h', '3 h', '4 h', '5 h'], 2, '300 / 75 = 4 horas.'),
  q('inf-007', 'Goteo e infusión', 'critical', '1.000 mL en 12 horas con factor 15 gotas/mL. ¿Gotas/min aproximadas?', ['18', '21', '28', '35'], 1, '(1.000 × 15) / 720 = 20,8; se redondea a 21 gotas/min.'),
  q('inf-008', 'Goteo e infusión', 'guardia', '80 mL deben administrarse en 40 minutos. ¿Qué velocidad se programa?', ['80 mL/h', '100 mL/h', '120 mL/h', '160 mL/h'], 2, '40 minutos equivalen a 2/3 de hora; 80 ÷ 2/3 = 120 mL/h.'),
  q('inf-009', 'Goteo e infusión', 'critical', '500 mL en 6 horas con factor 20 gotas/mL. ¿Gotas/min?', ['20', '24', '28', '36'], 2, '(500 × 20) / 360 = 27,8; se redondea a 28 gotas/min.'),
  q('inf-010', 'Goteo e infusión', 'practice', 'Una infusión de 750 mL corre a 125 mL/h. ¿Cuántas horas requiere?', ['4', '5', '6', '8'], 2, '750 / 125 = 6 horas.'),

  // Priorización y triage · 10
  q('prio-001', 'Priorización', 'practice', '¿A quién valorar primero?', ['Paciente estable esperando el alta', 'Paciente con dolor crónico 6/10', 'Paciente con nueva disnea y SatO₂ 84%', 'Paciente que solicita medicación para dormir'], 2, 'La nueva dificultad respiratoria con hipoxemia amenaza de inmediato la oxigenación.'),
  q('prio-002', 'Priorización', 'guardia', 'Cuatro avisos llegan juntos. ¿Cuál tiene prioridad?', ['Glucemia de 68 mg/dL sin síntomas', 'Dolor torácico súbito con diaforesis', 'Cambio de vendaje programado', 'Solicitud de agua'], 1, 'Dolor torácico súbito y diaforesis pueden indicar una emergencia cardiovascular tiempo-dependiente.'),
  q('prio-003', 'Triage', 'guardia', 'En triage, ¿qué cuadro requiere atención inmediata?', ['Esguince de tobillo de ayer', 'Fiebre de 38 °C sin compromiso general', 'Estridor y dificultad para hablar', 'Herida superficial sin sangrado'], 2, 'El estridor sugiere obstrucción de vía aérea y exige intervención inmediata.'),
  q('prio-004', 'Priorización', 'critical', 'Paciente posoperatorio: ¿qué hallazgo se comunica primero?', ['Dolor 5/10 esperado', 'Diuresis 45 mL/h', 'Somnolencia nueva, FR 8/min', 'Náuseas leves'], 2, 'La depresión respiratoria y el cambio del estado mental comprometen ventilación y vía aérea.'),
  q('prio-005', 'Priorización', 'guardia', '¿Qué paciente debe reevaluarse primero?', ['TA 128/76 estable', 'SatO₂ cae de 96% a 89% en minutos', 'Temperatura 37,7 °C', 'Dolor de espalda crónico'], 1, 'Una caída aguda de saturación puede señalar deterioro respiratorio inmediato.'),
  q('prio-006', 'Triage', 'critical', 'Tras un incidente con múltiples víctimas, ¿quién recibe prioridad inmediata?', ['Persona ambulante con abrasiones', 'Persona sin respiración tras apertura de vía aérea', 'Persona con hemorragia controlable y confusión', 'Persona con fractura cerrada y pulso distal'], 2, 'Hemorragia y alteración mental indican compromiso grave potencialmente reversible con intervención rápida.'),
  q('prio-007', 'Priorización', 'practice', '¿Qué tarea no debería demorarse?', ['Registrar una ingesta habitual', 'Responder a alarma de oclusión de una infusión vasoactiva', 'Ordenar material', 'Actualizar una cartelería'], 1, 'La interrupción de una infusión crítica puede causar deterioro hemodinámico rápido.'),
  q('prio-008', 'Priorización', 'critical', 'Paciente séptico con TA 82/48, confusión y piel fría. ¿Cuál es la prioridad?', ['Completar antecedentes sociales', 'Evaluar perfusión y activar respuesta urgente', 'Ofrecer alimentos', 'Programar educación al alta'], 1, 'Hipotensión y alteración mental sugieren hipoperfusión; requiere evaluación y escalamiento inmediatos.'),
  q('prio-009', 'Priorización', 'guardia', '¿Cuál de estos cambios es más urgente?', ['FC de 78 a 86/min', 'Dolor de 3 a 4/10', 'Nueva debilidad facial y dificultad para hablar', 'Falta de apetito desde ayer'], 2, 'Los déficits neurológicos focales súbitos son tiempo-dependientes.'),
  q('prio-010', 'Triage', 'practice', '¿Qué principio guía la prioridad clínica?', ['Atender por orden de llegada siempre', 'Atender primero a quien más insiste', 'Tratar primero amenazas vitales reversibles', 'Resolver primero lo más rápido'], 2, 'La prioridad se basa en riesgo y amenaza vital, no en comodidad u orden de llegada.'),

  // Signos vitales y ABCDE · 10
  q('abc-001', 'ABCDE', 'practice', 'Una persona está inconsciente y emite ronquidos respiratorios. ¿Qué componente se aborda primero?', ['Circulación', 'Vía aérea', 'Exposición', 'Discapacidad'], 1, 'Los ronquidos sugieren obstrucción parcial; en ABCDE se asegura primero la vía aérea.'),
  q('abc-002', 'Signos vitales', 'guardia', 'FC 128, TA 88/54, FR 30, piel fría. ¿Qué patrón preocupa más?', ['Respuesta al sueño', 'Hipoperfusión', 'Estabilidad hemodinámica', 'Hipertensión aislada'], 1, 'Taquicardia, hipotensión, taquipnea y piel fría son compatibles con hipoperfusión.'),
  q('abc-003', 'ABCDE', 'guardia', 'Tras asegurar la vía aérea, SatO₂ 86% y uso de músculos accesorios. ¿Siguiente prioridad?', ['Evaluar respiración e iniciar soporte indicado', 'Tomar antecedentes completos', 'Controlar peso', 'Revisar dieta'], 0, 'En la secuencia ABCDE, la respiración comprometida requiere intervención inmediata.'),
  q('abc-004', 'Signos vitales', 'practice', '¿Qué medición debe verificarse si la SatO₂ marca 82% pero la persona está cómoda y tiene manos frías?', ['Solo temperatura', 'Señal, perfusión y colocación del sensor', 'Únicamente glucemia', 'Nada; el valor siempre es exacto'], 1, 'La mala perfusión periférica puede alterar la lectura; se verifica señal y sensor sin ignorar la evaluación clínica.'),
  q('abc-005', 'ABCDE', 'critical', 'Paciente con hemorragia activa, piel pálida, FC 138 y TA 78/44. ¿Intervención prioritaria en C?', ['Controlar la hemorragia y activar soporte urgente', 'Realizar escala de dolor primero', 'Ofrecer líquidos por boca', 'Completar el registro antes de actuar'], 0, 'En circulación se controla la hemorragia amenazante y se solicita respuesta inmediata.'),
  q('abc-006', 'Signos vitales', 'guardia', 'FR 8/min después de un opioide y somnolencia creciente. ¿Interpretación?', ['Hallazgo esperado sin riesgo', 'Posible depresión respiratoria', 'Fiebre incipiente', 'Hiperventilación'], 1, 'La bradipnea con disminución del nivel de conciencia requiere evaluación y respuesta inmediata.'),
  q('abc-007', 'ABCDE', 'practice', 'En D de ABCDE se valora principalmente:', ['Vía aérea', 'Estado neurológico', 'Hemorragia externa', 'Temperatura ambiental'], 1, 'D corresponde a disability: estado neurológico, pupilas, glucemia y nivel de conciencia según contexto.'),
  q('abc-008', 'Signos vitales', 'critical', 'TA 210/120 con nueva confusión y cefalea intensa. ¿Qué hace prioritario el cuadro?', ['La cifra aislada solamente', 'La presencia de posible daño agudo de órgano', 'La edad de la persona', 'El horario de la medición'], 1, 'Los síntomas neurológicos junto con hipertensión marcada sugieren una emergencia que requiere evaluación inmediata.'),
  q('abc-009', 'ABCDE', 'guardia', 'En E de ABCDE, ¿qué acción es correcta?', ['Exponer lo necesario y prevenir hipotermia', 'Mantener toda la ropa sin inspección', 'Omitir lesiones ocultas', 'Retrasar hasta el alta'], 0, 'Se expone para buscar lesiones o signos relevantes, preservando dignidad y temperatura.'),
  q('abc-010', 'Signos vitales', 'practice', 'Un cambio de FC 80 a 122/min acompañado de mareo debe:', ['Ignorarse si no hay dolor', 'Compararse con tendencia y evaluarse de inmediato', 'Registrarse al final del turno', 'Atribuirse siempre a ansiedad'], 1, 'El cambio agudo sintomático requiere evaluación; la tendencia aporta más información que un valor aislado.'),

  // Farmacología y seguridad · 10
  q('safe-001', 'Seguridad del paciente', 'practice', 'Antes de administrar medicación, ¿cómo se confirma identidad?', ['Número de habitación', 'Apellido solamente', 'Dos identificadores válidos', 'Reconocimiento visual'], 2, 'Se utilizan al menos dos identificadores válidos; la habitación no identifica a la persona.'),
  q('safe-002', 'Farmacología', 'guardia', 'La dosis indicada difiere notablemente de la habitual. ¿Qué corresponde?', ['Administrarla para no demorar', 'Verificar indicación y aclarar antes de administrar', 'Dividirla sin consultar', 'Omitir el registro'], 1, 'Una discrepancia debe detener el proceso hasta verificar la orden y el contexto.'),
  q('safe-003', 'Seguridad del paciente', 'practice', 'Una pulsera no coincide con la orden. ¿Primera acción?', ['Administrar y corregir después', 'Detenerse y resolver la identificación', 'Preguntar al acompañante solamente', 'Usar el número de cama'], 1, 'No se administra hasta resolver de forma segura la identificación.'),
  q('safe-004', 'Farmacología', 'critical', 'Dos soluciones IV tienen compatibilidad desconocida. ¿Qué hacer?', ['Mezclarlas lentamente', 'Confirmar compatibilidad en una fuente autorizada antes de conectarlas', 'Observar si cambia el color', 'Asumir compatibilidad si son transparentes'], 1, 'La apariencia no demuestra compatibilidad; debe verificarse en una fuente institucional confiable.'),
  q('safe-005', 'Seguridad del paciente', 'guardia', '¿Qué reduce mejor un error con medicación de alto riesgo?', ['Memorizar la dosis', 'Doble chequeo independiente según protocolo', 'Usar abreviaturas', 'Preparar varias personas a la vez'], 1, 'El doble chequeo independiente puede detectar errores antes de que lleguen al paciente.'),
  q('safe-006', 'Farmacología', 'practice', 'Una tableta de liberación prolongada sin ranura debe:', ['Triturarse siempre', 'Partirse en cuatro', 'Verificarse antes de alterar; en general no triturarse', 'Disolverse en cualquier líquido'], 2, 'Alterar una formulación prolongada puede cambiar su liberación; se verifica la presentación y el protocolo.'),
  q('safe-007', 'Seguridad del paciente', 'guardia', 'Se descubre una dosis omitida. ¿Qué acción es adecuada?', ['Ocultarla', 'Administrar doble la próxima vez', 'Evaluar, informar y documentar según protocolo', 'Borrar la orden'], 2, 'Los eventos se gestionan con evaluación del paciente, comunicación y registro seguro, sin compensaciones improvisadas.'),
  q('safe-008', 'Farmacología', 'critical', 'Antes de administrar un fármaco que puede bajar la presión, el dato más relevante es:', ['Color favorito', 'TA actual y tendencia clínica', 'Número de habitación', 'Hora del alta'], 1, 'La presión y su tendencia ayudan a identificar riesgo y necesidad de aclarar la administración.'),
  q('safe-009', 'Seguridad del paciente', 'practice', 'Para prevenir caídas en una persona desorientada, lo más seguro es:', ['Dejar barandas y entorno sin revisar', 'Evaluar riesgo y aplicar medidas individualizadas', 'Restringir siempre', 'Apagar toda iluminación'], 1, 'La prevención efectiva parte de evaluar factores y aplicar medidas proporcionales e individualizadas.'),
  q('safe-010', 'Farmacología', 'guardia', 'Si una persona refiere una alergia antes de la dosis:', ['Se administra una cantidad menor', 'Se detiene y verifica alergia, fármaco e indicación', 'Se ignora si no hay pulsera', 'Se cambia la vía'], 1, 'La alergia debe verificarse antes de exponer a la persona al medicamento.'),

  // Glasgow, aislamiento, balance y oxigenoterapia · 10
  q('mix-001', 'Glasgow', 'practice', 'Apertura ocular a la voz (3), conversación confusa (4) y localiza dolor (5). ¿Glasgow total?', ['10', '11', '12', '13'], 2, 'Se suman E3 + V4 + M5 = 12.'),
  q('mix-002', 'Glasgow', 'guardia', 'Apertura ocular al dolor (2), palabras inapropiadas (3), retirada al dolor (4). ¿Total?', ['7', '8', '9', '10'], 2, 'E2 + V3 + M4 = 9.'),
  q('mix-003', 'Glasgow', 'critical', 'Sin apertura ocular (1), sonidos incomprensibles (2), extensión al dolor (2). ¿Total?', ['3', '4', '5', '6'], 2, 'E1 + V2 + M2 = 5; representa compromiso neurológico grave y exige respuesta urgente.'),
  q('mix-004', 'Aislamientos', 'practice', 'Ante precauciones de contacto, ¿qué elemento es central al entrar según riesgo de contacto?', ['Solo mascarilla quirúrgica', 'Guantes y bata según protocolo', 'Respirador siempre', 'Ninguna higiene de manos'], 1, 'Contacto requiere higiene de manos y barreras como guantes/bata según interacción y protocolo.'),
  q('mix-005', 'Aislamientos', 'guardia', 'Para un agente transmitido por aerosoles, la medida específica incluye:', ['Solo guantes', 'Respirador adecuado y ambiente indicado', 'Únicamente distancia de un metro', 'Compartir equipos sin desinfectar'], 1, 'Las precauciones por aerosoles requieren protección respiratoria y controles ambientales definidos.'),
  q('mix-006', 'Balance hídrico', 'practice', 'Ingresos 1.200 mL; egresos 900 mL. ¿Balance?', ['−300 mL', '0 mL', '+300 mL', '+2.100 mL'], 2, 'Balance = ingresos − egresos = +300 mL.'),
  q('mix-007', 'Balance hídrico', 'guardia', 'Ingresos: 1.000 mL de suero, 450 mL oral y 100 mL IV. Egresos: 950 mL de diuresis y 180 mL de drenaje. ¿Balance?', ['−420 mL', '+420 mL', '+1.130 mL', '+1.550 mL'], 1, 'Ingresos 1.550 mL menos egresos 1.130 mL = +420 mL.'),
  q('mix-008', 'Balance hídrico', 'critical', 'En 8 h ingresan 640 mL. Egresan 520 mL de orina, 90 mL de drenaje y 80 mL de vómito. ¿Balance?', ['−50 mL', '+50 mL', '−130 mL', '+130 mL'], 0, 'Egresos totales 690 mL; 640 − 690 = −50 mL.'),
  q('mix-009', 'Oxigenoterapia', 'practice', 'Una lectura baja de SatO₂ debe interpretarse junto con:', ['Solo la edad', 'Evaluación clínica y calidad de señal', 'El número de cama', 'La hora del día'], 1, 'La oximetría se valida con la clínica, perfusión y calidad de la señal.'),
  q('mix-010', 'Oxigenoterapia', 'critical', 'Persona con hipoxemia, trabajo respiratorio intenso y deterioro del sensorio. ¿Prioridad?', ['Esperar una segunda ronda', 'Evaluar ABC, iniciar soporte indicado y pedir ayuda urgente', 'Ofrecer agua', 'Completar educación'], 1, 'Hipoxemia con fatiga y alteración mental amenaza ventilación y oxigenación; requiere respuesta inmediata.'),
]

export const difficultyLabels = {
  practice: 'NIVEL I · PRÁCTICA',
  guardia: 'NIVEL II · GUARDIA',
  critical: 'NIVEL III · TURNO CRÍTICO',
}
