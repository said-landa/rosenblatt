# Pipeline de creación de cursos

## Propósito

Este documento define cómo nace, se valida, se publica y se mantiene un curso de Máquinas.

El pipeline convierte una máquina real en una experiencia educativa de ensamblaje. Su función es hacer que la producción de cursos sea repetible, medible y cada vez más eficiente, sin sacrificar rigor ni claridad.

El producto no es solamente la aplicación que utiliza el alumno. También es la capacidad de producir cursos excelentes de manera constante.

Este documento describe el proceso y sus criterios de calidad. El formato exacto en el que se representará un curso se definirá en la fase correspondiente al formato de cursos.

---

# Resultado esperado

Al terminar el pipeline debe existir un curso que permita a un alumno:

- construir una máquina de forma gradual;
- reconocer sus componentes principales;
- explicar la función de cada componente presentado;
- comprender las relaciones que hacen funcionar al sistema;
- continuar desde el punto donde dejó el curso;
- pedir ayuda sin recibir explicaciones fuera de contexto;
- terminar con una representación mental clara de la máquina completa.

Un curso no está terminado solo porque existan textos, modelos visuales o interacciones. Está terminado cuando todos esos elementos forman una experiencia educativa coherente y validada.

---

# Principios del pipeline

## El aprendizaje dirige la producción

Los modelos, animaciones, explicaciones e interacciones existen para construir comprensión. Ningún elemento se incluye únicamente porque sea atractivo o técnicamente posible.

## La verdad se establece antes de simplificar

Primero se investiga cómo funciona realmente la máquina. Después se decide qué nivel de detalle necesita el alumno. Simplificar sin comprender produce explicaciones engañosas.

## El curso se diseña antes de producir sus activos

No se modelan piezas ni se escriben lecciones definitivas hasta conocer el alcance, la descomposición de la máquina y la secuencia educativa.

## Cada etapa deja una salida verificable

Una etapa no termina por tiempo transcurrido. Termina cuando produce los resultados y cumple los criterios definidos para avanzar.

## Los errores regresan a su origen

Si una lección resulta confusa por una mala descomposición de la máquina, se corrige la descomposición. No se oculta el problema agregando explicaciones o interacciones innecesarias.

## Se reutiliza conocimiento, no errores

Los conceptos, componentes, materiales y patrones de interacción pueden reutilizarse entre cursos una vez validados. La reutilización nunca sustituye la revisión de su pertinencia para la nueva máquina.

## La primera versión debe ser completa, no enorme

El primer curso debe contar una historia funcional de principio a fin con el menor alcance que conserve el valor educativo. La profundidad puede crecer después.

---

# Flujo general

```text
Proponer una máquina
        ↓
Seleccionar y delimitar
        ↓
Investigar y validar
        ↓
Descomponer en componentes y relaciones
        ↓
Construir el grafo de conocimiento
        ↓
Diseñar capítulos, lecciones y objetivos
        ↓
Diseñar la secuencia de ensamblaje
        ↓
Probar el curso en baja fidelidad
        ↓
Producir representaciones, animaciones y vistas
        ↓
Escribir explicaciones y comprobaciones
        ↓
Preparar el contexto del tutor de IA
        ↓
Integrar el curso completo
        ↓
Validar con expertos y alumnos
        ↓
Publicar
        ↓
Observar, corregir y mantener
```

Cada flecha representa una puerta de calidad. Si la salida de una etapa no es suficiente, el curso no avanza todavía.

---

# Estados de un curso

Durante su creación, un curso puede encontrarse en uno de los siguientes estados:

| Estado | Significado |
| --- | --- |
| Propuesto | Existe una idea inicial, pero aún no se evaluó. |
| Seleccionado | La máquina tiene valor educativo y viabilidad suficientes para invertir en ella. |
| En investigación | Se está estableciendo cómo funciona y cuál será su alcance. |
| En diseño | Se están definiendo el modelo de la máquina y el recorrido educativo. |
| En producción | Se están creando los activos, contenidos e interacciones aprobados. |
| Integrado | Todas las partes existen juntas dentro de un recorrido ejecutable. |
| En validación | El curso completo está siendo revisado y probado. |
| Candidato a publicación | Cumplió las puertas obligatorias y solo admite correcciones finales. |
| Publicado | Está disponible para los alumnos. |
| En revisión | Una versión publicada necesita cambios o una nueva validación. |
| Retirado | Ya no se ofrece, pero se conserva su historial y aprendizaje de producción. |

Un curso solo puede estar en un estado principal a la vez. Los problemas encontrados pueden hacerlo regresar a una etapa anterior.

---

# Responsabilidades

El pipeline define responsabilidades, no necesariamente puestos de trabajo. Al principio, una sola persona puede asumir varias.

## Responsable del curso

Mantiene el propósito, alcance, prioridades y decisión final de avance del curso.

## Especialista de dominio

Valida cómo funciona la máquina, revisa las fuentes y detecta simplificaciones incorrectas.

## Diseñador de aprendizaje

Convierte el conocimiento en objetivos, capítulos, lecciones, pasos y comprobaciones de comprensión.

## Diseñador de interacción

Define qué hace el alumno, cómo recibe retroalimentación y cómo avanza el estado de ensamblaje.

## Productor visual

Crea y valida representaciones, animaciones y vistas que comuniquen correctamente la estructura de la máquina.

## Autor y editor

Redacta explicaciones y narraciones claras, consistentes y adecuadas al nivel del alumno.

## Responsable del tutor de IA

Define el contexto disponible, los límites de respuesta y las pruebas de comportamiento del tutor.

## Revisor de calidad

Verifica el recorrido completo, registra defectos y evita que una etapa se apruebe sin evidencia.

Una misma persona no debe aprobar en solitario los aspectos de alto riesgo que ella produjo. Como mínimo, la precisión técnica y la experiencia educativa final requieren una segunda revisión.

---

# Etapa 1 — Proponer y seleccionar una máquina

## Objetivo

Decidir si una máquina merece convertirse en curso antes de invertir en investigación y producción.

## Preguntas de selección

- ¿Despierta curiosidad de forma natural?
- ¿Tiene un propósito fácil de expresar?
- ¿Puede dividirse en componentes funcionales comprensibles?
- ¿El ensamblaje revela realmente cómo funciona?
- ¿Puede producir un avance visual satisfactorio?
- ¿Existe información confiable para investigarla?
- ¿Su alcance puede limitarse sin deformar su funcionamiento?
- ¿Reutiliza o introduce conceptos valiosos para otros cursos?
- ¿Su complejidad es apropiada para el lugar que ocupará en el catálogo?
- ¿Es viable representar sus partes esenciales?

## Actividades

1. Describir la máquina y su propósito en una sola frase.
2. Definir a qué alumno podría interesarle y qué pregunta desea responder.
3. Identificar de manera preliminar entre tres y doce componentes principales.
4. Estimar los mayores riesgos de conocimiento, producción visual e interacción.
5. Comparar la propuesta con otras candidatas del catálogo.
6. Decidir si se selecciona, se pospone o se descarta.

## Salida

Una propuesta breve que incluya:

- nombre de la máquina;
- propósito del sistema;
- alumno principal;
- promesa educativa;
- alcance preliminar;
- componentes principales tentativos;
- valor para el catálogo;
- riesgos conocidos;
- decisión y razón.

## Puerta de selección

La máquina avanza cuando su valor educativo es claro, el alcance parece controlable y no existe un impedimento conocido que haga inviable producir una experiencia de ensamblaje significativa.

---

# Etapa 2 — Delimitar e investigar

## Objetivo

Establecer una comprensión confiable de la máquina y decidir exactamente qué versión del sistema enseñará el curso.

## Delimitación

La misma categoría puede contener máquinas con diseños muy diferentes. El curso debe declarar:

- qué variante concreta estudia;
- qué función y condiciones se consideran normales;
- qué componentes pertenecen al sistema;
- qué elementos externos se mostrarán solo como contexto;
- hasta qué nivel de detalle se descompondrá;
- qué variantes quedan fuera;
- qué fenómenos se explicarán sin simularse;
- qué conocimientos previos se asumirán.

## Investigación

La investigación debe cubrir:

- propósito y funcionamiento general;
- componentes y subsistemas;
- relaciones, flujos y dependencias;
- materiales relevantes;
- secuencia real o lógica de funcionamiento;
- decisiones de diseño;
- fallos y casos límite que ayuden a comprender;
- terminología correcta;
- ideas erróneas frecuentes;
- diferencias entre variantes.

## Evidencia

Toda afirmación técnica importante debe poder rastrearse hasta una fuente confiable o una validación experta.

Las fuentes deben registrarse junto con:

- la afirmación que respaldan;
- su nivel de autoridad;
- su fecha o versión, cuando sea relevante;
- las discrepancias con otras fuentes;
- las dudas que permanecen abiertas.

Las imágenes o modelos de referencia no deben confundirse con evidencia suficiente del funcionamiento interno.

## Salida

Un expediente de investigación que contenga:

- definición y límite de la máquina;
- descripción funcional validada;
- vocabulario inicial;
- mapa de fuentes y afirmaciones;
- variantes excluidas;
- incertidumbres y riesgos;
- revisión del especialista de dominio.

## Puerta de investigación

La etapa termina cuando el equipo puede explicar la máquina de principio a fin, justificar su alcance y distinguir con claridad los hechos validados de las simplificaciones educativas todavía por diseñar.

---

# Etapa 3 — Descomponer la máquina

## Objetivo

Convertir la investigación en un modelo estructurado de componentes y relaciones.

## Actividades

1. Identificar los componentes principales responsables de las funciones de la máquina.
2. Descomponer cada componente hasta el nivel necesario para el curso.
3. Detener la descomposición cuando un nivel adicional no produzca comprensión útil.
4. Describir la función y razón de existencia de cada componente.
5. Registrar las relaciones entre componentes.
6. Identificar flujos de energía, información, materia, movimiento o control.
7. Asociar materiales únicamente cuando expliquen una función o limitación.
8. Marcar componentes opcionales, variantes y elementos externos.
9. Comparar la estructura con la explicación funcional validada.

## Reglas

- Un componente no entra al curso solo porque aparezca en una referencia visual.
- Toda pieza visible debe tener una función educativa.
- Toda función importante debe estar explicada por componentes y relaciones.
- Un subcomponente se modela como un componente contenido por otro.
- La jerarquía física no determina automáticamente el orden educativo.
- La simplificación nunca debe crear una relación causal falsa.

## Salida

Un modelo de la máquina que incluya:

- árbol de componentes;
- propósito y función de cada componente;
- relaciones entre componentes;
- flujos principales;
- materiales relevantes;
- límites de profundidad;
- decisiones de simplificación;
- preguntas todavía sin resolver.

## Puerta del modelo de máquina

La máquina está correctamente descompuesta cuando otra persona puede recorrer sus partes y explicar cómo cooperan para producir la función completa sin encontrar piezas huérfanas, funciones sin responsable o relaciones contradictorias.

---

# Etapa 4 — Construir el grafo de conocimiento

## Objetivo

Organizar todo lo que debe saberse para comprender la máquina y hacerlo reutilizable en otros cursos.

## Actividades

1. Convertir funciones, propiedades, causas y decisiones de diseño en conceptos de conocimiento.
2. Relacionar cada concepto con las máquinas, componentes, relaciones o materiales que explica.
3. Definir prerrequisitos entre conceptos.
4. Identificar conceptos ya existentes que puedan reutilizarse.
5. Distinguir conocimiento esencial, complementario y fuera de alcance.
6. Asociar las afirmaciones importantes con su evidencia.
7. Registrar explicaciones alternativas para distintos niveles de profundidad.
8. Detectar conceptos que el alumno podría transferir a otras máquinas.

## Preguntas de control

- ¿Qué necesita comprender el alumno para explicar la función completa?
- ¿Qué concepto hace comprensible cada relación importante?
- ¿Qué puede enseñarse con la máquina visible y qué requiere una analogía?
- ¿Qué conocimiento debe aparecer antes que otro?
- ¿Qué detalle puede omitirse sin crear una idea falsa?
- ¿Qué conceptos ya fueron enseñados en otro curso?

## Salida

La sección validada del grafo de conocimiento correspondiente a la máquina, con sus fuentes, prerrequisitos, niveles de profundidad y relaciones con otros cursos.

## Puerta de conocimiento

La etapa termina cuando cada componente y relación importante puede explicarse mediante conceptos respaldados, y cuando el conocimiento necesario puede ordenarse sin depender de saltos ocultos.

---

# Etapa 5 — Diseñar el recorrido educativo

## Objetivo

Transformar la estructura de la máquina y el grafo de conocimiento en una secuencia de aprendizaje.

## Definir el resultado final

Antes de dividir el curso, se debe completar esta frase:

> Al terminar este curso, el alumno podrá explicar cómo ________ mediante la cooperación de ________.

El resultado debe poder observarse mediante explicaciones, decisiones o reconstrucciones. «Conocer» o «entender» sin una demostración asociada no es suficiente.

## Diseñar capítulos

Cada capítulo debe representar:

- un subsistema importante;
- una función reconocible;
- una etapa coherente de construcción;
- un avance visible hacia la máquina completa.

Al finalizar un capítulo, el alumno debe poder explicar algo nuevo que antes no podía.

## Diseñar lecciones

Cada lección debe definir:

- un único objetivo principal;
- el estado inicial y final de la máquina;
- componentes y relaciones introducidos;
- conceptos necesarios;
- idea errónea que debe evitarse;
- comprobación de comprensión;
- dependencia con lecciones anteriores.

## Ordenar la complejidad

El orden educativo debe buscar que:

- cada nueva pieza responda una pregunta visible;
- el alumno utilice conocimientos recientes;
- los prerrequisitos aparezcan antes de necesitarlos;
- cada explicación pueda apoyarse en lo ya construido;
- la máquina conserve una progresión visual clara;
- los capítulos culminen en resultados funcionales reconocibles.

## Salida

Un plano del curso que contenga:

- promesa y resultado final;
- perfil y conocimientos previos del alumno;
- capítulos ordenados;
- lecciones y objetivos;
- componentes y conceptos por lección;
- dependencias;
- comprobaciones previstas;
- duración estimada únicamente como referencia, no como criterio de calidad.

## Puerta de diseño educativo

El recorrido avanza cuando no existen lecciones sin objetivo, componentes sin momento educativo, conceptos introducidos antes de ser necesarios ni saltos de complejidad sin preparación.

---

# Etapa 6 — Diseñar la secuencia de ensamblaje

## Objetivo

Definir exactamente qué hace el alumno y cómo cada acción construye comprensión.

## Para cada paso

Se debe especificar:

- estado previo de la máquina;
- componente o relación protagonista;
- piezas disponibles y piezas ocultas;
- acción esperada;
- lugar, orientación o conexión correctos;
- pistas permitidas;
- respuesta ante un intento incorrecto;
- cambio visual posterior;
- explicación que se revela;
- concepto reforzado;
- condición para continuar.

## Diseño del error

Un intento incorrecto debe ayudar a razonar. La retroalimentación puede:

- señalar una incompatibilidad funcional;
- recordar qué necesita el componente;
- dirigir la atención hacia una conexión;
- reducir gradualmente la dificultad;
- mostrar una consecuencia conceptual sencilla.

No debe limitarse a decir «incorrecto» ni colocar automáticamente la pieza desde el primer intento.

## Puntos de ensamblaje

Cada conexión debe representar una relación real o una simplificación explícita y pedagógicamente válida. Debe quedar claro:

- qué componentes conecta;
- qué posiciones admite;
- cuándo se considera completada;
- qué relación funcional representa;
- si permanecerá visible en etapas posteriores.

## Salida

Un guion completo de ensamblaje que pueda recorrerse de inicio a fin sin necesitar decisiones improvisadas durante la producción.

## Puerta de interacción

La secuencia está lista cuando cada acción tiene propósito, toda colocación puede evaluarse y el alumno nunca necesita utilizar información que todavía no se le presentó.

---

# Etapa 7 — Probar en baja fidelidad

## Objetivo

Detectar errores de estructura y aprendizaje antes de producir activos costosos.

## Forma de la prueba

El curso completo debe poder representarse con materiales simples:

- diagramas;
- tarjetas de componentes;
- bocetos;
- bloques provisionales;
- descripciones de animaciones;
- un recorrido escrito paso a paso.

La fidelidad visual no importa en esta etapa. Importa comprobar que la secuencia tiene sentido.

## Actividades

1. Recorrer el curso como si se fuera un alumno nuevo.
2. Pedir a otra persona que prediga dónde y por qué coloca cada pieza.
3. Registrar puntos donde necesita información no presentada.
4. Detectar pasos repetitivos, irrelevantes o demasiado difíciles.
5. Verificar que cada capítulo produce una recompensa intelectual y visual.
6. Probar las comprobaciones de comprensión.
7. Revisar el alcance y eliminar detalles que no aportan.

## Salida

Un prototipo completo de baja fidelidad, observaciones de prueba y una lista priorizada de correcciones.

## Puerta de prototipo

No comienza la producción definitiva hasta que una persona ajena al diseño pueda recorrer el prototipo, comprender su lógica y alcanzar el resultado final con ayudas razonables.

---

# Etapa 8 — Producir las representaciones e interacciones

## Objetivo

Crear los elementos visuales y de interacción aprobados por el prototipo.

## Inventario de producción

Antes de crear activos se prepara un inventario con:

- máquinas y componentes que necesitan representación;
- estados visuales requeridos;
- puntos de conexión;
- animaciones;
- vistas de cámara;
- cortes, transparencias o ampliaciones necesarias;
- referencias validadas;
- elementos reutilizables existentes;
- responsable y estado de revisión.

## Representaciones

Cada representación debe:

- mantener una identidad visual consistente;
- conservar las proporciones relevantes para comprender;
- simplificar detalles irrelevantes;
- distinguir componentes cercanos cuando sea necesario;
- permitir observar las conexiones importantes;
- coincidir con el alcance y la variante investigados.

## Animaciones y cámara

Las animaciones y vistas se producen desde el guion aprobado. Cada una debe tener una intención educativa explícita.

Se rechaza una animación si:

- solo decora;
- sugiere un comportamiento falso;
- oculta la relación importante;
- desorienta espacialmente;
- añade realismo sin aportar comprensión.

## Validación de ensamblaje

Antes de aprobar una pieza se verifica:

- que puede seleccionarse y reconocerse;
- que su orientación es comprensible;
- que encaja donde corresponde;
- que no atraviesa o bloquea elementos incorrectamente;
- que su colocación final coincide con el modelo conceptual;
- que sigue siendo legible en el conjunto completo.

## Salida

Representaciones, conexiones, estados, animaciones y vistas revisados y listos para integrarse en el recorrido.

## Puerta visual e interactiva

La producción se aprueba cuando todos los activos del inventario existen, representan correctamente la máquina y permiten ejecutar la secuencia sin ambigüedades visuales.

---

# Etapa 9 — Escribir el contenido educativo

## Objetivo

Convertir el conocimiento validado en explicaciones breves, oportunas y adaptadas al recorrido.

## Contenido por lección

Cada lección puede requerir:

- introducción y pregunta guía;
- explicación de componentes;
- explicación de relaciones;
- instrucciones de ensamblaje;
- retroalimentación para errores;
- narración de animaciones;
- recapitulación;
- comprobaciones de comprensión;
- glosario contextual;
- referencias internas de verificación.

## Reglas editoriales

- Explicar primero con lo que el alumno puede observar.
- Presentar un término técnico cuando sea útil, no antes.
- Separar claramente una simplificación de un hecho literal.
- Evitar información interesante que no ayuda al objetivo actual.
- Usar el mismo término para el mismo concepto en todo el curso.
- Relacionar cada explicación con componentes ya visibles.
- Preferir causas y relaciones sobre listas de datos.
- No afirmar más de lo que respaldan las fuentes.

## Comprobaciones

Las preguntas deben revelar comprensión. Se priorizan tareas como:

- justificar la ubicación de una pieza;
- predecir el efecto de retirarla;
- identificar una relación funcional;
- comparar dos configuraciones;
- reconstruir una parte con menos ayuda;
- explicar el sistema con palabras propias.

## Revisión

Todo contenido pasa por:

1. revisión de precisión;
2. revisión pedagógica;
3. revisión editorial;
4. lectura dentro de la experiencia, no únicamente como texto aislado.

## Salida

Contenido completo, trazable, consistente y asociado con cada momento del recorrido.

## Puerta de contenido

El contenido se aprueba cuando es correcto, suficiente para continuar y no compite con la acción principal del alumno.

---

# Etapa 10 — Preparar el tutor de IA

## Objetivo

Permitir que el tutor responda desde la situación exacta del alumno y dentro de los límites del curso.

## Contexto requerido

Para cada momento deben poder identificarse:

- curso, capítulo, lección y paso;
- objetivo actual;
- estado de ensamblaje;
- componentes visibles, disponibles y colocados;
- componente seleccionado;
- conceptos presentados y todavía no presentados;
- fuentes y conocimiento relevante;
- errores recientes;
- profundidad de respuesta permitida.

## Comportamientos esperados

El tutor debe poder:

- explicar qué es una pieza y por qué existe;
- relacionarla con lo ya construido;
- dar pistas graduadas;
- responder preguntas de seguimiento;
- detectar una premisa incorrecta;
- reconocer límites e incertidumbre;
- posponer una explicación que depende de contenido futuro sin ignorar al alumno;
- invitar al alumno a observar o razonar antes de revelar la respuesta.

## Casos de prueba

El tutor se prueba con preguntas:

- directas;
- ambiguas;
- basadas en una pieza equivocada;
- fuera del alcance;
- que intentan adelantar el curso;
- que requieren reconocer incertidumbre;
- que comparan con otra máquina;
- formuladas con vocabulario no técnico.

También se verifica que no:

- invente componentes;
- contradiga el curso o sus fuentes;
- describa como visible una pieza todavía oculta;
- entregue siempre la solución completa;
- responda con una profundidad desproporcionada;
- convierta la experiencia en una conversación desconectada del ensamblaje.

## Salida

Contextos definidos, conocimiento disponible, límites y conjunto de evaluaciones para todos los momentos relevantes del curso.

## Puerta del tutor

El tutor se aprueba cuando responde de manera correcta y contextual en los casos previstos, falla de forma segura cuando no tiene evidencia y conserva la progresión educativa.

---

# Etapa 11 — Integrar el curso

## Objetivo

Unir estructura, conocimiento, representaciones, interacciones, contenido, progreso y tutor en un recorrido completo.

## Actividades

1. Incorporar todos los capítulos, lecciones y pasos aprobados.
2. Asociar cada componente con su representación y conocimiento.
3. Configurar estados iniciales, transiciones y condiciones de finalización.
4. Vincular animaciones, vistas, explicaciones y comprobaciones.
5. Preparar el contexto del tutor para cada estado.
6. Verificar bloqueo, disponibilidad y colocación de componentes.
7. Comprobar que el progreso puede guardarse y retomarse.
8. Recorrer todas las rutas normales y de error.
9. Confirmar que no existen elementos huérfanos o referencias faltantes.

## Regla de integración

El curso debe construirse mediante las capacidades generales de la plataforma. Si una lección exige comportamiento exclusivo, primero se decide si representa una capacidad reutilizable del motor o un defecto del diseño del curso.

No se agrega lógica especial silenciosamente para resolver un único caso.

## Salida

Una versión completa y ejecutable del curso, acompañada por un registro de elementos integrados, problemas conocidos y revisiones pendientes.

## Puerta de integración

La versión avanza cuando el recorrido puede completarse de inicio a fin, puede retomarse después de una interrupción y no contiene bloqueos, pérdidas de progreso ni pasos imposibles.

---

# Etapa 12 — Validar la calidad

## Objetivo

Demostrar que el curso es correcto, comprensible, utilizable y coherente antes de publicarlo.

## Líneas de validación

### Precisión de dominio

- La variante de la máquina coincide con lo investigado.
- Los componentes y relaciones son correctos.
- Las simplificaciones están justificadas.
- Las afirmaciones importantes conservan evidencia.
- Un especialista aprueba el recorrido completo.

### Calidad educativa

- Los objetivos son observables.
- La complejidad aumenta gradualmente.
- Las explicaciones aparecen cuando son necesarias.
- Las comprobaciones evalúan razonamiento.
- El alumno puede explicar el sistema al terminar.

### Experiencia de ensamblaje

- Las piezas son reconocibles.
- Las conexiones son comprensibles.
- Los errores producen retroalimentación útil.
- La cámara y las animaciones orientan.
- El curso nunca depende de adivinar sin información.

### Continuidad y progreso

- El curso inicia en el estado correcto.
- Cada paso desbloquea lo previsto.
- Salir y regresar conserva el avance.
- Repetir una lección no daña el estado.
- Completar el curso produce un estado final coherente.

### Tutor de IA

- Conoce el estado actual.
- Utiliza conocimiento respaldado.
- No revela elementos futuros sin motivo.
- Da pistas proporcionadas.
- Reconoce preguntas fuera de alcance.

### Accesibilidad y claridad

- La experiencia no depende únicamente del color o el audio.
- El lenguaje es legible y consistente.
- Las acciones importantes tienen señales suficientes.
- Existe una alternativa comprensible para el contenido esencial.
- La interacción no exige precisión innecesaria.

## Registro de defectos

Cada problema debe incluir:

- lugar donde aparece;
- comportamiento observado;
- comportamiento esperado;
- impacto en el aprendizaje;
- severidad;
- etapa donde se originó;
- responsable de corregirlo;
- evidencia de nueva validación.

Los defectos se corrigen en la etapa que generó la causa, no únicamente donde se manifestó el síntoma.

## Puerta de calidad

Un curso se convierte en candidato a publicación cuando:

- no tiene defectos que impidan completar o comprender el recorrido;
- las revisiones técnica y pedagógica están aprobadas;
- el tutor supera sus evaluaciones obligatorias;
- el progreso funciona durante todo el curso;
- los riesgos restantes están documentados y son aceptables.

---

# Etapa 13 — Realizar un piloto con alumnos

## Objetivo

Observar si personas reales construyen la comprensión prevista sin depender de quienes diseñaron el curso.

## Selección de participantes

El piloto debe incluir personas parecidas al alumno objetivo y, cuando sea útil, algunas con mayor o menor conocimiento para detectar supuestos ocultos.

## Qué observar

- dónde dudan;
- qué piezas intentan usar primero;
- qué explicaciones releen;
- cuándo piden ayuda;
- qué errores se repiten;
- qué capítulos abandonan o aceleran;
- si pueden explicar la función de lo construido;
- qué recuerdan después de terminar;
- si miran la máquina completa como un sistema relacionado.

## Preguntas posteriores

- ¿Qué creías que ocurría antes del curso?
- ¿Qué entiendes ahora de forma diferente?
- ¿Qué componente te resultó más difícil de justificar?
- ¿En qué momento sentiste mayor claridad?
- ¿Qué parte pareció decorativa o innecesaria?
- ¿Podrías explicar el funcionamiento sin ver el modelo?

## Interpretación

Las métricas de finalización y tiempo no bastan. Un recorrido rápido puede indicar claridad o superficialidad; uno lento puede indicar aprendizaje profundo o confusión.

La evidencia principal combina:

- comportamiento observado;
- explicaciones del alumno;
- resultados de comprobaciones;
- solicitudes de ayuda;
- percepción subjetiva de claridad.

## Salida

Un informe de piloto con hallazgos, evidencia, severidad, cambios propuestos y decisión de publicar, repetir el piloto o regresar a diseño.

## Puerta de piloto

El curso avanza cuando alumnos representativos pueden completar el recorrido y explicar sus relaciones esenciales sin depender de ayuda extraordinaria.

---

# Etapa 14 — Publicar

## Objetivo

Hacer disponible una versión identificable, validada y recuperable del curso.

## Lista de publicación

Antes de publicar se confirma:

- alcance y variante de la máquina;
- versión del curso;
- aprobaciones técnica, pedagógica y editorial;
- inventario completo de activos;
- evaluaciones del tutor;
- funcionamiento del progreso;
- resultados del piloto;
- problemas conocidos aceptados;
- responsable de mantenimiento;
- forma de retirar o sustituir la versión si aparece un problema grave.

## Publicación gradual

Cuando el riesgo lo justifique, el curso puede liberarse primero a un grupo limitado. La ampliación depende de evidencia de estabilidad y comprensión, no únicamente de ausencia de reportes.

## Salida

Una versión publicada con identidad, fecha, alcance, responsables, historial de aprobación y canales de observación.

---

# Etapa 15 — Observar, mantener y mejorar

## Objetivo

Conservar la precisión y mejorar el aprendizaje después de la publicación.

## Señales de mantenimiento

- preguntas repetidas al tutor;
- errores frecuentes en el mismo paso;
- abandono concentrado en una lección;
- explicaciones que requieren demasiadas pistas;
- nuevos hallazgos o cambios en las fuentes;
- activos visuales que producen interpretaciones incorrectas;
- diferencias inesperadas entre grupos de alumnos;
- conceptos que podrían reutilizarse mejor en otros cursos.

## Tipos de cambio

### Editorial

Aclara el lenguaje sin cambiar el significado ni la secuencia.

### Educativo

Modifica explicaciones, pistas, comprobaciones u orden dentro de una lección.

### Estructural

Cambia componentes, relaciones, capítulos, lecciones o secuencia de ensamblaje.

### Correctivo de dominio

Corrige una afirmación, representación o relación técnica.

### Evolución de plataforma

Aprovecha una capacidad general nueva sin alterar innecesariamente la intención del curso.

## Regla de revalidación

Cada cambio se revalida desde la etapa más temprana que afecte.

Por ejemplo:

- cambiar una palabra requiere revisión editorial;
- cambiar una explicación requiere revisión pedagógica;
- cambiar la función atribuida a una pieza regresa a investigación y conocimiento;
- cambiar el orden de ensamblaje regresa al diseño educativo e interacción;
- cambiar una representación requiere validación visual y del ensamblaje.

## Salida

Una nueva versión o una corrección documentada, con evidencia de las validaciones repetidas.

---

# Puertas de calidad resumidas

| Puerta | Pregunta que debe responder | Evidencia mínima |
| --- | --- | --- |
| Selección | ¿Vale la pena producir esta máquina? | Propuesta, alcance y riesgos. |
| Investigación | ¿Sabemos cómo funciona y qué enseñaremos? | Fuentes, límites y revisión experta. |
| Modelo de máquina | ¿Todas las partes y relaciones tienen sentido? | Árbol, funciones, flujos y simplificaciones. |
| Conocimiento | ¿Podemos explicar lo importante sin saltos? | Conceptos, prerrequisitos y evidencia. |
| Diseño educativo | ¿Existe una progresión completa de comprensión? | Capítulos, lecciones, objetivos y comprobaciones. |
| Interacción | ¿Cada acción enseña y puede evaluarse? | Guion de ensamblaje y retroalimentación. |
| Prototipo | ¿La secuencia funciona antes de producirla? | Prueba de baja fidelidad observada. |
| Producción | ¿Todo lo visual representa correctamente el diseño? | Inventario y revisión de activos. |
| Contenido | ¿Las explicaciones son correctas y oportunas? | Revisiones técnica, pedagógica y editorial. |
| Tutor | ¿La IA responde desde el contexto correcto? | Evaluaciones superadas y límites definidos. |
| Integración | ¿El recorrido completo funciona y conserva progreso? | Ejecución de inicio a fin y reanudación. |
| Calidad | ¿Puede convertirse en candidato a publicación? | Validaciones sin defectos críticos. |
| Piloto | ¿Los alumnos construyen la comprensión prevista? | Observación y demostraciones de comprensión. |
| Publicación | ¿La versión es responsablemente liberable? | Aprobaciones, versión y plan de mantenimiento. |

Ninguna puerta debe aprobarse únicamente por intuición. La evidencia puede ser sencilla durante las primeras etapas, pero siempre debe existir.

---

# Ciclos de retroalimentación

El pipeline no es una cadena rígida. Es normal volver atrás cuando aparece nueva evidencia.

| Problema observado | Etapa a revisar primero |
| --- | --- |
| Una pieza no tiene una función clara | Descomposición de la máquina. |
| La explicación requiere demasiada teoría previa | Grafo de conocimiento y diseño educativo. |
| El alumno no sabe dónde colocar una pieza | Secuencia de ensamblaje y representación visual. |
| Una animación parece contradecir el funcionamiento | Investigación, modelo de máquina y producción visual. |
| El tutor inventa detalles | Evidencia, grafo de conocimiento y contexto del tutor. |
| El curso solo puede funcionar con una excepción especial | Diseño de interacción o capacidades generales de la plataforma. |
| Los alumnos completan pero no pueden explicar | Objetivos, comprobaciones y secuencia educativa. |
| La producción visual crece sin control | Alcance, profundidad y reutilización. |

Volver a una etapa anterior no representa un fracaso. Evita consolidar un error y abarata su corrección futura.

---

# Métricas del pipeline

Las métricas deben observar tanto la calidad educativa como la capacidad de producción.

## Aprendizaje

- proporción de alumnos que explica la función completa al terminar;
- componentes y relaciones que generan más confusión;
- cambio entre explicaciones previas y posteriores;
- capacidad de predecir qué ocurre al retirar o modificar una pieza;
- cantidad y tipo de ayuda necesaria;
- retención de la estructura esencial después del curso.

## Experiencia

- finalización por capítulo y lección;
- intentos repetidos en un mismo paso;
- solicitudes de ayuda;
- reanudaciones exitosas;
- momentos de abandono;
- percepción de claridad y descubrimiento.

## Producción

- tiempo transcurrido por etapa;
- porcentaje de trabajo rehecho y su causa;
- activos y conceptos reutilizados;
- defectos encontrados antes y después de publicar;
- etapas que producen más bloqueos;
- costo relativo de mantener cada curso.

## Calidad del tutor

- respuestas correctas y respaldadas;
- respuestas ajustadas al contexto;
- pistas útiles sin revelar de inmediato;
- fallos seguros ante preguntas fuera de alcance;
- contradicciones detectadas.

Ninguna métrica aislada decide la calidad de un curso. Deben interpretarse juntas y con observación cualitativa.

---

# Reglas de alcance y eficiencia

## Detener antes de producir

Una propuesta debe pausarse si:

- no puede delimitarse una variante concreta;
- faltan fuentes confiables;
- la función depende de fenómenos que no pueden explicarse con claridad en el alcance elegido;
- el ensamblaje sería únicamente decorativo;
- exige demasiadas capacidades exclusivas de la plataforma;
- su costo impide completar una primera versión útil.

## Producir de adentro hacia afuera

Primero se valida una lección representativa que incluya conocimiento, ensamblaje, contenido y tutor. Después se escala la producción al resto del curso.

Esta lección vertical no sustituye el prototipo completo de baja fidelidad. Sirve para descubrir riesgos de producción antes de crear todos los activos.

## Reutilizar con intención

Antes de crear un elemento nuevo se revisa si ya existe:

- el concepto;
- el componente genérico;
- el material;
- una relación equivalente;
- un patrón de interacción;
- una animación explicativa;
- una comprobación adaptable.

La reutilización se registra para saber qué partes del pipeline están reduciendo realmente el costo de los cursos futuros.

---

# Qué no debe ocurrir

- Empezar a modelar antes de definir el alcance.
- Copiar una descomposición visual sin validar el funcionamiento.
- Organizar capítulos únicamente según la estructura física.
- Escribir teoría extensa antes de diseñar la acción del alumno.
- Crear una animación sin propósito educativo declarado.
- Añadir una pieza que nunca se explica.
- Usar una comprobación que solo evalúa memoria cuando el objetivo es comprender relaciones.
- Permitir que el tutor responda sin conocer el estado de ensamblaje.
- Resolver una necesidad de un curso con una excepción que no se documenta.
- Publicar sin un recorrido completo de reanudación y progreso.
- Interpretar finalización como prueba suficiente de aprendizaje.
- Mantener un curso publicado cuando ya no puede respaldarse su precisión.

---

# Aplicación al primer curso

El primer curso tiene una responsabilidad adicional: validar el propio pipeline.

Debe elegirse una máquina pequeña, reconocible y con un mecanismo visualmente comprensible. El objetivo no es demostrar la amplitud futura del catálogo, sino responder estas preguntas:

- ¿La descomposición conceptual produce una buena secuencia educativa?
- ¿El ensamblaje genera comprensión y no solo entretenimiento?
- ¿Puede crearse el curso como datos y contenido, sin programarlo de forma exclusiva?
- ¿Qué partes de producción requieren herramientas internas?
- ¿Qué conocimiento y activos podrán reutilizarse?
- ¿Cuánto trabajo real exige completar y mantener un curso excelente?

Antes de construir el motor completo, el primer curso debe existir de principio a fin en baja fidelidad. Después se desarrolla únicamente la capacidad necesaria para ejecutar ese recorrido validado.

El primer curso no se considera exitoso porque funcione técnicamente. Se considera exitoso cuando alumnos reales pueden construir la máquina y explicar cómo funciona.

---

# Criterio de finalización de esta fase

El pipeline está suficientemente definido cuando el equipo puede:

- explicar cómo una propuesta se convierte en un curso publicado;
- saber qué resultado debe producir cada etapa;
- decidir con evidencia si un curso puede avanzar;
- identificar dónde se originó un problema;
- asignar responsabilidades aunque una persona cumpla varias;
- producir primero un prototipo barato y después activos costosos;
- validar precisión, aprendizaje, interacción, tutor y progreso;
- mantener una versión publicada sin perder trazabilidad;
- medir si producir el siguiente curso será más rápido y confiable.

La fase siguiente debe convertir este proceso en una arquitectura capaz de sostenerlo. La plataforma, el motor, el grafo de conocimiento, las herramientas de autoría y los sistemas de publicación deberán existir para servir a este pipeline.
