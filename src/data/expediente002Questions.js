const question = (level, category, scenario, options, correct, explanation, points = 10, safety = '') => ({
  level,
  category,
  scenario,
  options,
  correct,
  explanation,
  points,
  safety,
})

export const expediente002Levels = [
  { title: 'Enfermero competente', subtitle: 'Nivel 1 · Valoración y seguridad', points: 10 },
  { title: 'Enfermero avanzado', subtitle: 'Nivel 2 · Farmacología y decisiones', points: 15 },
  { title: 'Terapia intensiva', subtitle: 'Nivel 3 · Deterioro y cuidados críticos', points: 20 },
  { title: 'Jefe de guardia', subtitle: 'Nivel 4 · Liderazgo y prioridades', points: 25 },
]

export const expediente002Questions = [
  question(0, 'Valoración neurológica', 'Un paciente de 72 años, hospitalizado por una infección urinaria, pasa de estar orientado a responder con frases inconexas. La presión arterial es 118/70 mmHg, la frecuencia respiratoria 22/min y la saturación 95% en aire ambiente. No hay un déficit motor evidente. ¿Cuál es la respuesta de enfermería más adecuada?', [
    'Documentar el cambio y esperar la ronda habitual porque los signos vitales son aceptables.',
    'Realizar una valoración ABCDE y neurológica inmediata, revisar glucemia y cambios recientes, y comunicar el deterioro según el protocolo.',
    'Administrar un sedante para reducir la agitación y valorar de nuevo al final del turno.',
    'Restringir líquidos y asumir que la confusión es parte esperable de la edad.',
  ], 1, 'Un cambio agudo del estado mental es un signo de deterioro que exige valoración estructurada, búsqueda de causas reversibles y escalamiento oportuno. Los signos vitales aparentemente estables no lo descartan.', 10)
  ,
  question(0, 'Seguridad del paciente', 'En la verificación previa a una medicación oral, la pulsera y la hoja de administración muestran apellidos distintos. El paciente está despierto, confirma su nombre de pila y dice que “esa pastilla es de siempre”. ¿Qué se debe hacer?', [
    'Administrarla porque el paciente reconoce el medicamento.',
    'Pedir a un compañero que confirme visualmente que parece ser la persona correcta.',
    'Detener la administración y resolver la discrepancia con identificadores aprobados y la fuente de la prescripción.',
    'Cambiar la pulsera por una con el apellido de la hoja.',
  ], 2, 'Una discrepancia de identidad impide administrar con seguridad. Hay que pausar, verificar con identificadores institucionales y resolver el origen de la discrepancia; nunca se modifica una identificación para hacerla coincidir.', 10)
  ,
  question(0, 'Cuidados postoperatorios', 'A las dos horas de una cirugía abdominal, una paciente está más somnolienta que en la evaluación previa. Respira 9 veces por minuto, tiene respiraciones superficiales y cuesta despertarla. El dolor es 2/10. ¿Cuál es la prioridad inmediata?', [
    'Administrar la siguiente dosis analgésica para evitar que el dolor aumente.',
    'Evaluar y apoyar vía aérea y ventilación, solicitar ayuda urgente y revisar las intervenciones recientes.',
    'Dejarla dormir y volver a controlarla en una hora.',
    'Ayudarla a caminar para estimular la respiración.',
  ], 1, 'Somnolencia nueva con respiración lenta y superficial puede indicar compromiso ventilatorio. La prioridad es vía aérea/respiración y respuesta urgente conforme al protocolo; la analgesia no se administra de forma automática en este contexto.', 10)
  ,
  question(0, 'RCP y soporte vital', 'En una sala, un adulto colapsa, no responde y presenta respiración agónica. No hay pulso claramente identificable en una comprobación breve. El equipo de emergencias aún no llega. ¿Qué acción corresponde dentro del entrenamiento de soporte vital básico?', [
    'Esperar a que llegue el equipo antes de iniciar cualquier intervención.',
    'Activar el sistema de respuesta, iniciar RCP de calidad y usar el DEA en cuanto esté disponible siguiendo su voz y el protocolo local.',
    'Dar agua y elevar las piernas mientras se observa.',
    'Realizar ventilaciones prolongadas antes de pedir ayuda.',
  ], 1, 'La respiración agónica no es normal. La respuesta debe activar ayuda, iniciar RCP de calidad y aplicar el DEA tan pronto esté disponible, dentro del nivel de formación y protocolo vigente.', 10)
  ,
  question(0, 'Electrolitos', 'Un paciente con vómitos persistentes presenta debilidad y parestesias. El laboratorio informa potasio de 2,8 mmol/L y el monitor muestra ondas T aplanadas. ¿Cuál es la mejor conducta de enfermería?', [
    'Considerarlo un hallazgo leve y dejar el resultado para el pase de turno.',
    'Verificar el resultado y el estado clínico, mantener vigilancia cardíaca según protocolo y escalarlo de inmediato.',
    'Indicar al paciente que tome un suplemento propio.',
    'Retirar la monitorización para que pueda descansar.',
  ], 1, 'La hipopotasemia con cambios electrocardiográficos eleva el riesgo de arritmia. Se requiere vigilancia, comunicación urgente y tratamiento únicamente bajo prescripción/protocolo validado.', 10)
  ,
  question(0, 'Anticoagulantes', 'Una paciente en tratamiento anticoagulante informa que cayó al suelo durante la noche y se golpeó la cabeza. No recuerda con claridad el episodio, niega dolor y quiere volver a dormir. ¿Qué debe priorizarse?', [
    'Dejarla descansar porque no hay herida visible.',
    'Realizar valoración neurológica y de lesiones, escalar de inmediato y seguir el protocolo de traumatismo craneal y anticoagulación.',
    'Suspender por cuenta propia todas las dosis futuras y no documentar la caída.',
    'Aplicar hielo y esperar a que aparezcan síntomas.',
  ], 1, 'Un traumatismo craneal bajo anticoagulación puede tener complicaciones aunque no haya signos externos. Requiere valoración y escalamiento inmediatos; los cambios de tratamiento corresponden al equipo autorizado.', 10)
  ,
  question(0, 'Antibioticoterapia', 'Antes de la primera dosis de un antibiótico prescrito, el paciente refiere que años atrás tuvo hinchazón de labios y dificultad respiratoria tras tomar un medicamento de la misma familia. En la historia no figura ninguna alergia. ¿Qué hacer?', [
    'Administrar la dosis y observar porque la historia está vacía.',
    'Detener la administración, aclarar y documentar la reacción, y contactar al prescriptor/farmacéutico para verificar la orden.',
    'Reducir la dosis a la mitad sin consultar.',
    'Borrar la prescripción para que no vuelva a aparecer.',
  ], 1, 'La reacción descrita es compatible con hipersensibilidad grave y la historia debe reconciliarse antes de exponer al paciente. No se altera ni se administra la prescripción hasta resolverlo con el equipo correspondiente.', 10)
  ,
  question(0, 'Signos vitales', 'Una persona de 63 años presenta presión arterial 86/54 mmHg, frecuencia cardíaca 124/min, piel fría y nueva confusión. La medición se confirma con manguito adecuado. ¿Qué dato orienta más a hipoperfusión y requiere escalamiento urgente?', [
    'La combinación de hipotensión, taquicardia, piel fría y alteración mental.',
    'La edad del paciente por sí sola.',
    'Que la presión diastólica sea menor que la sistólica.',
    'La ausencia de una temperatura elevada.',
  ], 0, 'El patrón combinado apunta a posible hipoperfusión y deterioro. Debe activarse la respuesta clínica y priorizarse una evaluación ABCDE, no esperar a que todos los signos clásicos estén presentes.', 10)
  ,

  question(1, 'Cálculo simulado de dosis', 'SIMULACIÓN FICTICIA: una orden educativa indica 6 mg/kg para un paciente ficticio de 20 kg. El preparado didáctico contiene 40 mg/mL. El ejercicio supone expresamente que la prescripción ya fue validada, que no hay alergias, que la función renal está revisada y que el límite didáctico es 150 mg. ¿Qué volumen resulta del cálculo?', [
    '1,5 mL',
    '2 mL',
    '3 mL',
    '6 mL',
  ], 2, 'Cálculo: 6 mg/kg × 20 kg = 120 mg; 120 mg ÷ 40 mg/mL = 3 mL. El resultado está por debajo del límite ficticio de 150 mg, pero en la práctica se debe verificar de forma independiente la orden, el paciente, alergias, función renal, concentración y límites institucionales antes de cualquier administración.', 15, 'Caso exclusivamente educativo: no representa una prescripción ni una instrucción de administración real.')
  ,
  question(1, 'Dilución simulada', 'SIMULACIÓN FICTICIA: un vial de demostración contiene 100 mg de un compuesto no farmacológico para ejercicios. Se reconstituye hasta un volumen final exacto de 20 mL. Para una práctica en papel se solicitan 30 mg. La orden, alergias, función renal y límite didáctico han sido verificados para este supuesto. ¿Qué volumen corresponde?', [
    '3 mL',
    '5 mL',
    '6 mL',
    '10 mL',
  ], 2, 'La concentración del preparado del ejercicio es 100 mg ÷ 20 mL = 5 mg/mL. Para 30 mg: 30 ÷ 5 = 6 mL. En situaciones reales, comprobar el volumen final tras reconstitución y validar el cálculo con el protocolo y un segundo control cuando corresponda.', 15, 'Compuesto, concentración y paciente ficticios; no utilizar como guía de preparación real.')
  ,
  question(1, 'Goteo e infusión', 'En un ejercicio de simulación, se programa una solución inerte de 360 mL para pasar en 3 horas mediante un equipo con factor de goteo de 20 gotas/mL. ¿Cuál es el flujo teórico aproximado en gotas por minuto?', [
    '20 gotas/min',
    '30 gotas/min',
    '40 gotas/min',
    '60 gotas/min',
  ], 2, '(360 mL × 20 gotas/mL) ÷ (3 × 60 min) = 40 gotas/min. El cálculo es académico; en asistencia real se verifica la solución, el acceso, la bomba o equipo, la prescripción y los límites del protocolo.', 15, 'Solución inerte ficticia; confirmar equipo y prescripción antes de toda infusión real.')
  ,
  question(1, 'Insulinoterapia', 'Al recibir el turno, la glucemia capilar es de 54 mg/dL. La paciente está despierta, puede tragar y refiere sudoración y temblor. Está prescrita una insulina prandial, pero aún no ha comido. ¿Cuál es la prioridad?', [
    'Administrar la insulina prandial y esperar a que llegue la comida.',
    'Tratar la hipoglucemia según protocolo, reevaluar y avisar; retener la dosis prandial hasta aclarar la situación con la orden/protocolo.',
    'Repetir la glucemia al final del turno sin intervenir.',
    'Dar una dosis adicional de insulina basal.',
  ], 1, 'La hipoglucemia sintomática requiere actuación inmediata según protocolo y reevaluación. La insulina prandial no debe administrarse sin considerar glucemia, ingesta y prescripción vigente; se escala cualquier discrepancia.', 15)
  ,
  question(1, 'Interacciones medicamentosas', 'Una paciente toma un anticoagulante oral y se le prescribe un nuevo antibiótico. En la entrevista también menciona un suplemento herbal que no aparece en su lista de medicación. ¿Cuál es la acción más segura antes de la primera dosis?', [
    'Asumir que no hay interacción si el suplemento es de venta libre.',
    'Conciliar todos los fármacos y suplementos y solicitar revisión de interacciones y plan de monitorización al prescriptor/farmacéutico.',
    'Suspender por cuenta propia el anticoagulante durante el antibiótico.',
    'Pedir a la paciente que elija qué medicamento omitir.',
  ], 1, 'Los antibióticos y suplementos pueden modificar el efecto o el riesgo hemorrágico de algunos anticoagulantes. La conciliación y revisión profesional preceden al cambio de tratamiento; no se suspende por iniciativa propia.', 15)
  ,
  question(1, 'ECG y arritmias', 'En un trazado, la frecuencia ventricular es de 150/min, los complejos QRS son estrechos y regulares, y no se identifican ondas P claras. El paciente está consciente, con presión estable y sin dolor torácico. ¿Cuál es la interpretación y prioridad inicial más apropiada?', [
    'Ritmo sinusal normal; retirar el monitor.',
    'Taquicardia de complejo estrecho; confirmar el trazado y valorar al paciente, síntomas y estabilidad mientras se avisa según protocolo.',
    'Fibrilación ventricular; iniciar desfibrilación sin comprobar el estado clínico.',
    'Asistolia; comenzar compresiones de inmediato.',
  ], 1, 'Un ritmo regular de complejo estrecho a esa frecuencia puede corresponder a una taquiarritmia supraventricular. La interpretación debe confirmarse y guiarse por el estado hemodinámico; las intervenciones dependen de la evaluación y protocolos locales.', 15)
  ,
  question(1, 'Administración segura', 'La etiqueta de un medicamento de alto riesgo no coincide con la concentración registrada en la bomba de infusión. La paciente está estable y no hay signos inmediatos de daño. ¿Qué debe hacer el enfermero?', [
    'Elegir la concentración que parece más probable y continuar.',
    'Detener o no iniciar la infusión, comprobar la orden y el producto con el proceso de doble verificación y escalar la discrepancia.',
    'Cambiar el registro electrónico para que coincida con la etiqueta.',
    'Preguntar a la paciente qué concentración suele recibir.',
  ], 1, 'La discrepancia entre la etiqueta, la prescripción y la programación es un riesgo de error. Se pausa de forma segura, se verifica la fuente primaria y se solicita una segunda comprobación según las normas de medicamentos de alto riesgo.', 15)
  ,
  question(1, 'Antibioticoterapia', 'Una persona con una infección tratada con antibióticos presenta diarrea acuosa frecuente, dolor abdominal y fiebre nueva. Comparte baño con otros pacientes. ¿Cuál es la respuesta de enfermería más adecuada?', [
    'Suspender todas las precauciones porque la diarrea puede ser un efecto secundario común.',
    'Aplicar precauciones y medidas de control de infecciones según sospecha clínica, notificar al equipo y facilitar evaluación diagnóstica.',
    'Administrar un antidiarreico sin consultar y mantener el cuidado habitual.',
    'Esperar al resultado de laboratorio antes de modificar cualquier práctica de aislamiento.',
  ], 1, 'La diarrea asociada a antibióticos puede representar una infección transmisible. Se inicia el control de infecciones conforme al protocolo institucional y se escala para evaluación; las pruebas y el tratamiento se deciden con el equipo.', 15)
  ,

  question(2, 'Shock séptico', 'Paciente de 68 años en cuidados intensivos por infección pulmonar: temperatura 39,1 °C, presión 82/46 mmHg, frecuencia cardíaca 132/min, llenado capilar prolongado, diuresis decreciente y confusión nueva. La saturación es 91% con soporte de oxígeno ya indicado. ¿Cuál es la prioridad de enfermería?', [
    'Completar primero el formulario de ingreso y esperar el próximo control horario.',
    'Reconocer el deterioro, activar el equipo de respuesta/sepsis y realizar evaluación ABCDE y vigilancia estrecha mientras se facilita el paquete de atención prescrito.',
    'Administrar líquidos o vasopresores por iniciativa propia sin una orden o protocolo aplicable.',
    'Reducir la frecuencia de controles para evitar molestias.',
  ], 1, 'La hipotensión con signos de hipoperfusión y disfunción orgánica exige respuesta urgente. La enfermería escala, vigila y facilita intervenciones prescritas/protocolizadas; no sustituye la orden clínica ni demora la reanimación por tareas administrativas.', 20)
  ,
  question(2, 'Shock anafiláctico', 'Durante una infusión, un paciente desarrolla urticaria generalizada, voz ronca, edema labial, sibilancias y presión arterial descendente. ¿Qué actuación es prioritaria?', [
    'Detener la exposición sospechosa, activar respuesta de emergencia y atender vía aérea/circulación según protocolo de anafilaxia.',
    'Esperar a que aparezca una erupción más extensa para confirmar el diagnóstico.',
    'Administrar el resto de la infusión y registrar la reacción al terminar.',
    'Trasladar al paciente sin activar ayuda ni vigilancia.',
  ], 0, 'La combinación de compromiso de vía aérea, respiración y circulación sugiere anafilaxia potencialmente mortal. Se detiene la exposición y se activa respuesta inmediata; las intervenciones farmacológicas corresponden a protocolos y personal autorizado.', 20)
  ,
  question(2, 'Interpretación ECG', 'Un paciente con dolor torácico opresivo presenta cambios dinámicos del ST en derivaciones contiguas y diaforesis. Está consciente, pero el dolor persiste. ¿Qué decisión de enfermería refleja mejor la prioridad temporal?', [
    'Tratarlo como posible síndrome coronario agudo, activar la ruta urgente y obtener/compartir ECG y datos según protocolo.',
    'Esperar una troponina antes de informar al equipo.',
    'Clasificarlo como reflujo porque sigue hablando.',
    'Completar primero una historia familiar extensa.',
  ], 0, 'Cambios isquémicos y dolor persistente son tiempo-dependientes. La enfermería activa la ruta de atención urgente y facilita evaluación diagnóstica sin esperar a que una prueba aislada confirme el cuadro.', 20)
  ,
  question(2, 'Electrolitos y ECG', 'Un paciente con enfermedad renal crónica tiene potasio de 6,4 mmol/L en una muestra no hemolizada y el monitor muestra ensanchamiento reciente del QRS. Está débil, pero responde. ¿Cuál es el paso más importante?', [
    'Repetir el laboratorio mañana antes de informar.',
    'Escalar inmediatamente el hallazgo, mantener monitorización y preparar respuesta conforme al protocolo de hiperpotasemia.',
    'Animarlo a consumir alimentos ricos en potasio.',
    'Desconectar el monitor porque genera alarmas.',
  ], 1, 'La hiperpotasemia significativa con alteración de conducción puede evolucionar a arritmias graves. Se requiere comunicación inmediata, monitorización continua y tratamiento bajo órdenes/protocolo; no se espera a la siguiente ronda.', 20)
  ,
  question(2, 'Cuidados críticos', 'Una paciente ventilada presenta caída brusca de saturación, aumento de presión pico, hipotensión y alarma de baja ventilación minuto. La tubuladura parece acodada. ¿Cómo priorizar?', [
    'Silenciar las alarmas y revisar el registro de la última hora.',
    'Valorar inmediatamente al paciente y el circuito, pedir ayuda, comprobar causas reversibles y seguir el protocolo de deterioro ventilatorio.',
    'Aumentar por cuenta propia todos los parámetros del ventilador.',
    'Desconectar el ventilador y salir a buscar al médico.',
  ], 1, 'Primero se valora al paciente, no solo el monitor. Se solicita apoyo, se comprueba de forma segura el circuito y se siguen las competencias y el protocolo local; los cambios del ventilador requieren personal autorizado.', 20)
  ,
  question(2, 'Valoración neurológica', 'Tras un procedimiento, un paciente presenta cefalea súbita intensa, vómitos y debilidad nueva de un brazo. Su glucemia es normal. ¿Qué conjunto de acciones es prioritario?', [
    'Activar la respuesta neurológica urgente, registrar la hora de inicio/último momento bien y realizar valoración focal seriada.',
    'Observar durante varias horas porque la glucemia es normal.',
    'Administrar alimentos para recuperar fuerza.',
    'Esperar a que la debilidad se resuelva antes de comunicarla.',
  ], 0, 'El déficit focal súbito con cefalea intensa puede indicar una emergencia neurológica tiempo-dependiente. Se activa la ruta apropiada, se documenta con precisión el inicio y se mantiene valoración mientras se coordina la evaluación.', 20)
  ,
  question(2, 'Seguridad de infusiones', 'Una infusión vasoactiva está conectada a un lumen compartido. Se requiere administrar otro medicamento cuya compatibilidad no está disponible en la referencia accesible. La presión del paciente depende de la infusión. ¿Qué hacer?', [
    'Conectar el segundo medicamento en Y porque todas las soluciones son compatibles.',
    'No mezclar sin confirmar compatibilidad; proteger la infusión crítica y consultar farmacia/equipo para una vía o plan seguro.',
    'Pausar la infusión vasoactiva sin avisar para liberar el lumen.',
    'Usar cualquier lumen y revisar al final del turno.',
  ], 1, 'La compatibilidad desconocida y la interrupción de una infusión crítica representan riesgos. Se mantiene la terapia esencial, se evita la mezcla no verificada y se busca una alternativa aprobada con el equipo/farmacia.', 20)
  ,
  question(2, 'Balance hídrico y función renal', 'En una unidad crítica, la diuresis cae progresivamente a 0,2 mL/kg/h durante tres horas. La presión arterial disminuyó respecto a la basal y la creatinina está en ascenso. ¿Qué enfoque es el más apropiado?', [
    'Reconocer posible lesión renal/hipoperfusión, validar medición y catéter, revisar tendencias y escalar prontamente.',
    'Registrar el dato solo al cierre del turno porque la creatinina cambia lentamente.',
    'Aumentar líquidos por cuenta propia hasta normalizar la diuresis.',
    'Retirar el catéter para evitar mediciones bajas.',
  ], 0, 'Oliguria sostenida, deterioro hemodinámico y creatinina en ascenso requieren verificación y evaluación pronta. Se comunican tendencias y factores asociados; los cambios de fluidos son decididos por el equipo responsable.', 20)
  ,

  question(3, 'Liderazgo en emergencia', 'Durante el cambio de turno, dos pacientes se deterioran simultáneamente: uno presenta anafilaxia con estridor tras una exposición y otro una caída de saturación con somnolencia. Hay recursos limitados y el equipo de respuesta está en camino. Como jefe de guardia, ¿cómo organizar la respuesta?', [
    'Asignar responsables con comunicación de circuito cerrado, priorizar vía aérea/amenazas vitales, pedir refuerzos y asegurar reevaluación de ambos.',
    'Atender solo al paciente que llamó primero y esperar a que termine antes de delegar.',
    'Enviar a ambos pacientes a pruebas diagnósticas sin acompañamiento.',
    'Delegar ambas valoraciones a personal no competente y continuar el relevo.',
  ], 0, 'El liderazgo eficaz combina priorización clínica, delegación según competencias, comunicación de circuito cerrado y solicitud de recursos. Las amenazas de vía aérea no esperan, pero ambos pacientes necesitan cobertura y reevaluación.', 25)
  ,
  question(3, 'Dosis y límites simulados', 'SIMULACIÓN FICTICIA: un protocolo de aula indica 4 mg/kg/día de un compuesto didáctico, dividido en dos dosis, para un paciente ficticio de 30 kg. Cada dosis no puede exceder el límite de simulación de 70 mg. El preparado de práctica contiene 20 mg/mL. Prescripción, alergias y función renal se declaran verificadas solo para el ejercicio. ¿Cuál es el volumen por dosis y qué control detecta un error de límite?', [
    '3 mL por dosis; la dosis es 60 mg, inferior a 70 mg.',
    '6 mL por dosis; la dosis es 120 mg, supera el límite y debe detenerse para revisión.',
    '1,5 mL por dosis; la dosis es 30 mg.',
    'Ningún volumen calculable con los datos proporcionados.',
  ], 0, 'Total diario: 4 mg/kg × 30 kg = 120 mg/día; dividido en dos son 60 mg por dosis. Volumen: 60 mg ÷ 20 mg/mL = 3 mL. La revisión del límite se hace antes de cualquier preparación real, junto con orden, identidad, alergias, función renal y verificación independiente requerida.', 25, 'Problema de papel con compuesto ficticio: nunca usar como orden ni como recomendación de tratamiento.')
  ,
  question(3, 'Farmacología y función renal', 'En la conciliación de medicación, una paciente con deterioro renal agudo tiene una orden habitual de un medicamento eliminado principalmente por vía renal. La creatinina se duplicó desde ayer y no hay plan documentado de ajuste. ¿Qué debe hacer el jefe de guardia?', [
    'Administrar la dosis habitual porque ya estaba indicada antes del ingreso.',
    'Pausar la decisión si es seguro, validar la orden y escalar al prescriptor/farmacéutico para revisión renal antes de la siguiente dosis.',
    'Reducir la dosis a la mitad por criterio personal y actualizar la orden después.',
    'Eliminar el fármaco de la historia del paciente.',
  ], 1, 'El cambio agudo de función renal puede alterar exposición y toxicidad. La orden debe revisarse con el equipo autorizado usando datos clínicos actualizados; enfermería no modifica la prescripción de manera unilateral.', 25)
  ,
  question(3, 'Hemorragia y anticoagulación', 'Un paciente anticoagulado en postoperatorio presenta taquicardia progresiva, presión descendente, drenaje quirúrgico con incremento rápido de sangre y piel fría. ¿Qué combinación de acciones refleja mejor el liderazgo seguro?', [
    'Activar respuesta urgente, valorar ABC/perfusión, cuantificar y comunicar pérdidas, preservar accesos/monitorización y coordinar las órdenes del equipo.',
    'Esperar al control de hemoglobina de rutina antes de alertar.',
    'Retirar el drenaje y desechar su contenido para evitar contaminación.',
    'Administrar un reversor sin verificar prescripción, indicación ni protocolo.',
  ], 0, 'El patrón sugiere hemorragia con compromiso circulatorio. La respuesta urgente y la comunicación estructurada son prioritarias; intervenciones hemostáticas o reversoras dependen de la evaluación, prescripción y protocolo institucional.', 25)
  ,
  question(3, 'Ética y seguridad del paciente', 'Un profesional reporta que pudo haber administrado por error una dosis duplicada de un medicamento de alto riesgo. El paciente está asintomático. La familia pregunta si ocurrió un error. ¿Cuál es la respuesta inicial más segura?', [
    'Asegurar que no pasó nada porque no hay síntomas.',
    'Evaluar al paciente, detener nuevas dosis si procede, activar el proceso clínico de seguridad, comunicar al responsable y documentar hechos con transparencia según política.',
    'Borrar el registro duplicado para evitar alarma.',
    'Esperar al fin del turno para informar solo si aparecen síntomas.',
  ], 1, 'La ausencia de síntomas inmediatos no descarta daño. Se prioriza la evaluación y monitorización, se escala sin demora y se sigue la política de comunicación y reporte transparente, sin alterar registros.', 25)
  ,
  question(3, 'Sepsis y antibióticos', 'Una paciente con sospecha de sepsis tiene orden de cultivos y antibiótico urgente. La toma de cultivos se retrasa porque no se encuentra el segundo juego; la paciente se vuelve más hipotensa. ¿Cuál es la respuesta de coordinación más adecuada?', [
    'Permitir que la toma de cultivos demore indefinidamente el tratamiento prescrito.',
    'Escalar el deterioro, coordinar de inmediato los recursos y seguir la ruta institucional para obtener muestras sin demora indebida del tratamiento urgente.',
    'Cancelar antibióticos y cultivos sin informar.',
    'Esperar a que la presión se normalice antes de avisar.',
  ], 1, 'La obtención de muestras es valiosa, pero no debe provocar una demora peligrosa del tratamiento urgente. Se coordina rápidamente según protocolo, se informa el deterioro y se documentan tiempos y acciones.', 25)
  ,
  question(3, 'RCP y liderazgo', 'Durante una reanimación, dos miembros del equipo comienzan compresiones en momentos distintos y nadie está registrando tiempos. Una persona trae el DEA. ¿Qué acción de liderazgo mejora más la seguridad y coordinación?', [
    'Asignar roles claros, usar comunicación de circuito cerrado, organizar relevos de compresiones y asegurar que el DEA se aplique siguiendo instrucciones y protocolo.',
    'Permitir que cada integrante actúe sin coordinación para ahorrar tiempo.',
    'Detener todas las acciones hasta que llegue un jefe superior.',
    'Pedir a una sola persona que realice simultáneamente compresiones, registro y manejo del DEA.',
  ], 0, 'Los roles definidos y la comunicación cerrada reducen interrupciones y duplicación. Se mantienen compresiones de calidad, relevos coordinados y uso del DEA según su guía y el protocolo vigente.', 25)
  ,
  question(3, 'Seguridad y continuidad asistencial', 'Al cierre del turno, un paciente con riesgo de deterioro tiene una tendencia de lactato en ascenso, presión sostenida con apoyo y un plan de reevaluación cada 15 minutos. El equipo entrante está ocupado. ¿Cómo asegurar continuidad?', [
    'Dejar una nota genérica en la historia y retirarse.',
    'Realizar un traspaso estructurado y directo con los riesgos, tendencia, acciones pendientes, umbrales de escalamiento y confirmación de recepción.',
    'Esperar al siguiente valor de laboratorio para decidir si vale la pena informar.',
    'Cambiar el intervalo de vigilancia para que coincida con la carga de trabajo.',
  ], 1, 'La información crítica y las tareas pendientes deben transferirse de manera estructurada y confirmada. La carga operativa no justifica omitir la vigilancia ni cambiar un plan sin autorización.', 25)
  ,
]
