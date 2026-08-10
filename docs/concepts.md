# Modelo conceptual

## Propósito

Este documento define los conceptos que existen dentro de Máquinas y las relaciones entre ellos.

Su objetivo es crear un lenguaje común para diseñar el producto, producir los cursos y tomar decisiones futuras sin confundir conceptos educativos con representaciones visuales o detalles de implementación.

Este documento describe qué existe y qué significa. No define tecnologías, formatos de archivos ni arquitectura de software.

---

# Mapa general

Máquinas se organiza alrededor de cinco áreas conceptuales:

1. **La máquina:** el sistema real que el usuario quiere comprender.
2. **El curso:** el recorrido educativo mediante el cual la construye y comprende.
3. **El conocimiento:** las ideas y relaciones que explican por qué la máquina funciona.
4. **La experiencia:** las acciones, explicaciones y representaciones que hacen visible el aprendizaje.
5. **El alumno:** la persona, su progreso y el contexto que necesita para continuar.

La relación principal es:

Alumno
  └── recorre un Curso
        └── enseña una Máquina
              └── está formada por Componentes

Curso
  └── Capítulos
        └── Lecciones
              └── Pasos de ensamblaje
                    └── incorporan Componentes

Grafo de conocimiento
  └── explica la Máquina, sus Componentes y sus Relaciones

---

# La máquina

## Máquina

Una **Máquina** es un sistema compuesto por partes organizadas que cooperan para realizar una función.

Es el objeto de estudio de un curso y la respuesta a la pregunta del alumno: «¿Cómo funciona esto?».

Una máquina debe tener:

- un propósito claramente definido;
- un límite que determine qué pertenece al sistema y qué queda fuera;
- componentes identificables;
- relaciones entre esos componentes;
- un resultado producido por la cooperación de sus partes.

Una máquina puede ser física, digital, biológica o una combinación de varias categorías. No es necesario que todas sus partes sean visibles o materiales.

### Ejemplos

- Un candado convierte la posición correcta de ciertos componentes en la liberación de un mecanismo.
- Un procesador transforma instrucciones y datos mediante componentes lógicos coordinados.
- Una célula mantiene procesos vitales mediante estructuras que cumplen funciones relacionadas.

### Relaciones

- Una máquina tiene uno o más componentes principales.
- Una máquina es el objeto de estudio de uno o más cursos.
- Una máquina posee una representación visual, pero no es esa representación.
- Una máquina está descrita por un conjunto de conocimientos y relaciones.

---

## Componente

Un **Componente** es una parte identificable de una máquina que cumple una función dentro del sistema.

Un componente puede ser:

- una pieza elemental;
- un conjunto de piezas;
- un subsistema;
- una parte física;
- una parte lógica o conceptual.

Cada componente debe poder responder al menos estas preguntas:

- ¿Qué es?
- ¿Qué función cumple?
- ¿Por qué existe?
- ¿Con qué otros componentes se relaciona?
- ¿Qué ocurriría si faltara o cambiara?
- ¿De qué está formado, cuando sea relevante?

### Jerarquía de componentes

Un subcomponente es simplemente un componente observado desde la perspectiva de otro componente que lo contiene. La misma pieza puede ser:

- un componente de la máquina completa;
- un componente de un componente de la máquina completa;
- un componente de un componente de un componente de la máquina completa;
- ...

Esta estructura puede repetirse hasta alcanzar el nivel de detalle necesario para el objetivo del curso.

Máquina
  └── Componente
        └── Componente
              └── Componente

El nivel de profundidad no busca representar toda la realidad. Se detiene cuando agregar más detalle deja de contribuir al objetivo del curso.

### Relaciones

- Un componente pertenece directamente a una máquina o a otro componente.
- Un componente puede contener cero o más componentes.
- Un componente puede relacionarse con cualquier otro componente de la máquina.
- Un componente puede estar compuesto por uno o más materiales.
- Un componente puede aparecer en uno o más pasos de ensamblaje.
- Un componente puede estar asociado con varios conceptos de conocimiento.

---

## Relación entre componentes

Una **Relación entre componentes** explica cómo dos o más componentes cooperan dentro de la máquina.

Ensamblar piezas sin comprender sus relaciones produciría una maqueta, no comprensión. Por eso, las relaciones tienen la misma importancia educativa que los componentes.

Una relación puede describir, entre otras cosas:

- unión o encaje;
- soporte o contención;
- movimiento;
- transferencia de energía;
- transferencia de información;
- flujo de materia;
- control;
- dependencia;
- protección;
- transformación.

Cada relación debe explicar:

- qué componentes participan;
- qué intercambian o permiten;
- en qué dirección ocurre, si existe una dirección;
- por qué la relación es necesaria;
- qué función ayuda a producir.

---

## Material

Un **Material** es la sustancia o composición de la que está hecho un componente físico.

El material se incluye únicamente cuando contribuye a entender la función o el diseño del componente. No debe convertirse en información enciclopédica desconectada de la máquina.

Debe responder preguntas como:

- ¿Por qué se eligió este material?
- ¿Qué propiedad permite que el componente cumpla su función?
- ¿Qué limitación introduce?

Un material puede formar parte de muchos componentes y un componente puede estar formado por varios materiales.

---

# El recorrido educativo

## Curso

Un **Curso** es el recorrido completo para construir y comprender una máquina específica.

El curso transforma la estructura de la máquina en una secuencia educativa. Decide qué descubre primero el alumno, qué puede comprender en cada momento y cómo aumenta gradualmente la complejidad.

Un curso debe definir:

- la máquina que enseña;
- el alcance y nivel de detalle;
- el conocimiento previo esperado;
- el resultado de aprendizaje final;
- el orden de capítulos, lecciones y pasos;
- los componentes y conceptos que el alumno descubrirá;
- los criterios para considerar terminado el recorrido.

Completar un curso significa haber recorrido toda la construcción y demostrado comprensión suficiente en los puntos definidos. No significa dominar profesionalmente todas las disciplinas relacionadas con la máquina.

### Relaciones

- Un curso enseña una sola máquina principal.
- Un curso contiene uno o más capítulos ordenados.
- Un curso utiliza una parte definida del grafo de conocimiento.
- Un alumno puede tener un progreso independiente en cada curso.

---

## Capítulo

Un **Capítulo** es una etapa significativa dentro de la construcción de la máquina.

Normalmente corresponde a uno de estos elementos:

- un componente principal;
- un subsistema;
- una función importante;
- una etapa reconocible del ensamblaje.

Cada capítulo debe producir un avance visible y conceptualmente coherente. Al terminarlo, el alumno debe comprender una parte funcional de la máquina y cómo se integra con lo construido anteriormente.

### Relaciones

- Un capítulo pertenece a un curso.
- Un capítulo contiene una o más lecciones ordenadas.
- Un capítulo puede centrarse en uno o más componentes relacionados.
- Un capítulo puede depender de conocimientos introducidos en capítulos anteriores.

---

## Lección

Una **Lección** es la unidad mínima con un objetivo de aprendizaje completo.

Cada lección introduce únicamente la complejidad necesaria para producir un avance comprensible. Debe incorporar al menos un componente o una relación significativa y explicar por qué existe dentro de la máquina.

Una lección debe tener:

- un único objetivo principal;
- un estado inicial de la máquina;
- uno o más pasos de ensamblaje;
- un estado final observable;
- los conceptos que el alumno debe comprender;
- una forma proporcionada de comprobar esa comprensión.

Una lección no es una cantidad fija de texto, tiempo o interacciones. Su límite lo determina la unidad de comprensión que busca construir.

### Relaciones

- Una lección pertenece a un capítulo.
- Una lección contiene uno o más pasos de ensamblaje ordenados.
- Una lección introduce o refuerza conceptos.
- Una lección puede incluir explicaciones, animaciones y comprobaciones de comprensión.

---

## Paso de ensamblaje

Un **Paso de ensamblaje** es una acción concreta mediante la cual el alumno hace avanzar la construcción.

Normalmente consiste en descubrir, seleccionar, colocar o conectar un componente. También puede enfocar una relación importante entre piezas ya colocadas.

Cada paso debe definir conceptualmente:

- el estado de la máquina antes de la acción;
- el componente o relación protagonista;
- la acción esperada del alumno;
- el criterio de colocación o conexión correcta;
- el cambio visible que produce;
- la explicación asociada;
- el estado de la máquina después de la acción.

Un paso es una interacción, no una lección completa. Una lección puede requerir varios pasos para alcanzar su objetivo.

---

## Comprobación de comprensión

Una **Comprobación de comprensión** es una pregunta o actividad breve que permite verificar si el alumno entiende lo que acaba de construir.

Debe evaluar relaciones y razonamiento, no únicamente memoria de nombres.

Ejemplos:

- explicar por qué una pieza es necesaria;
- predecir qué ocurriría si faltara;
- identificar qué componentes cooperan para una función;
- elegir dónde debe conectarse una pieza y justificarlo;
- reconstruir una relación sin ayuda.

Un **Quiz** es un conjunto ordenado de comprobaciones. Es opcional y nunca debe interrumpir innecesariamente el flujo de construcción.

Las comprobaciones no existen para otorgar puntos o recompensas artificiales. Existen para detectar confusión y decidir si conviene explicar, practicar o continuar.

---

# El conocimiento

## Concepto de conocimiento

Un **Concepto de conocimiento** es una idea que el alumno necesita para comprender una máquina, un componente o una relación.

Puede describir:

- una función;
- un principio;
- una propiedad;
- una causa;
- una consecuencia;
- un fenómeno;
- una decisión de diseño;
- una limitación.

Los conceptos no se presentan de manera aislada. Aparecen cuando la construcción hace que sean necesarios.

Un mismo concepto puede participar en varias máquinas. Esto permite que el aprendizaje de un curso ayude a comprender cursos posteriores.

---

## Grafo de conocimiento

El **Grafo de conocimiento** es el conjunto organizado de entidades y relaciones que explica la máquina.

Conecta, como mínimo:

- máquinas;
- componentes;
- relaciones entre componentes;
- materiales;
- conceptos;
- funciones;
- dependencias y prerrequisitos.

El grafo responde preguntas como:

- ¿De qué está compuesto esto?
- ¿Para qué sirve?
- ¿Por qué está conectado de esta manera?
- ¿Qué conocimiento se necesita para entenderlo?
- ¿En qué otras máquinas aparece este concepto?
- ¿Qué puede aprender el alumno después?

El grafo de conocimiento no determina por sí solo el orden del curso. Describe la verdad educativa disponible; el curso selecciona y ordena una parte de esa verdad para un alumno y un objetivo concretos.

---

## Prerrequisito

Un **Prerrequisito** es un concepto o comprensión previa necesaria para introducir otro elemento sin generar una brecha de aprendizaje.

Puede existir entre:

- conceptos;
- lecciones;
- capítulos;
- cursos.

Los prerrequisitos deben usarse con moderación. Su propósito es ordenar la complejidad, no bloquear innecesariamente la curiosidad del alumno.

---

# La experiencia

## Representación visual

Una **Representación visual** es la forma visible de una máquina o componente dentro de la experiencia.

Puede mostrar:

- forma;
- posición;
- orientación;
- escala relativa;
- estado de ensamblaje;
- conexiones importantes.

La representación visual no es la máquina ni contiene por sí misma su significado educativo. Un componente conserva su identidad, función y relaciones aunque cambie su representación.

El realismo visual solo es valioso cuando mejora la comprensión. Puede simplificarse cualquier detalle que distraiga o no contribuya al objetivo de aprendizaje.

---

## Animación

Una **Animación** es una transición visual que muestra un cambio relevante durante la construcción o la explicación.

Puede utilizarse para:

- mostrar cómo encaja una pieza;
- revelar una relación oculta;
- seguir un flujo de energía, información o materia;
- comparar el estado anterior y posterior;
- dirigir la atención hacia una función.

Una animación explica; no pretende reproducir con exactitud todos los fenómenos físicos de la máquina.

---

## Vista de cámara

Una **Vista de cámara** determina qué parte de la máquina observa el alumno y desde qué perspectiva durante un momento educativo.

Su función es pedagógica:

- enfocar la pieza relevante;
- evitar que otras partes oculten la acción;
- mantener la orientación espacial;
- mostrar una conexión desde el ángulo más claro;
- pasar de una vista del detalle a una del sistema completo.

La cámara debe guiar la atención sin desorientar ni convertir la experiencia en un espectáculo visual.

---

## Explicación y narración

Una **Explicación** comunica el significado de un componente, una relación o una acción.

Debe responder en el momento adecuado:

- qué acaba de aparecer;
- qué función cumple;
- por qué es necesario;
- cómo se relaciona con lo ya construido.

La **Narración** es una forma de presentar una explicación mediante texto, voz o una combinación de ambos. No constituye conocimiento independiente: expresa una parte del grafo de conocimiento adaptada al momento del curso.

Toda explicación debe respetar el nivel actual del alumno y evitar adelantar complejidad que todavía no necesita.

---

# El alumno

## Alumno

Un **Alumno** es la persona que recorre uno o más cursos para comprender máquinas.

El alumno no es un receptor pasivo. Observa, pregunta, ensambla, relaciona, comprueba y vuelve a intentar.

Sus datos educativos relevantes incluyen:

- cursos iniciados;
- progreso dentro de cada curso;
- componentes descubiertos y colocados;
- lecciones y capítulos completados;
- conceptos presentados;
- dificultades o comprobaciones pendientes;
- punto exacto desde el cual debe continuar.

---

## Progreso

El **Progreso** representa el estado del recorrido de un alumno dentro de un curso.

Incluye:

- capítulo, lección y paso actuales;
- estado de las lecciones;
- estado de ensamblaje de la máquina;
- componentes disponibles y colocados;
- comprobaciones realizadas;
- conceptos que ya fueron presentados;
- último punto seguro para continuar.

Los estados básicos de un elemento del curso son:

- **bloqueado:** todavía no debe aparecer;
- **disponible:** el alumno ya puede comenzar;
- **en curso:** existe actividad incompleta;
- **completado:** se cumplió el criterio definido.

Los estados básicos de un componente durante el ensamblaje son:

- **oculto:** aún no forma parte de la experiencia visible;
- **disponible:** puede ser utilizado en el paso actual;
- **colocado:** ya ocupa su lugar dentro de la construcción.

Completar no equivale automáticamente a dominar. El progreso registra acciones y criterios observables; no afirma conocer con certeza el estado mental del alumno.

---

## Contexto del tutor de IA

El **Contexto del tutor de IA** es una descripción del momento educativo actual que permite responder de forma pertinente.

Se deriva de:

- el alumno y su progreso;
- la máquina y el curso activos;
- el capítulo, la lección y el paso actuales;
- los componentes visibles, disponibles y colocados;
- el componente seleccionado;
- los conceptos ya presentados;
- la parte relevante del grafo de conocimiento;
- la pregunta o dificultad inmediata.

El contexto no es una fuente independiente de verdad. Reúne información existente para que el tutor explique al nivel correcto y sin mencionar piezas o conceptos que el alumno todavía no conoce.

El tutor debe:

- responder desde el estado actual del curso;
- relacionar la respuesta con lo que el alumno puede ver;
- adaptar la profundidad de la explicación;
- hacer preguntas cuando ayuden a razonar;
- reconocer cuando una respuesta requiere conocimiento aún no introducido;
- orientar sin resolver innecesariamente la interacción.

El tutor no debe convertirse en un chatbot genérico separado de la experiencia.

---

# Relaciones principales

| Origen | Relación | Destino | Regla |
| --- | --- | --- | --- |
| Máquina | contiene | Componente | Una máquina tiene uno o más componentes principales. |
| Componente | contiene | Componente | La jerarquía puede repetirse hasta el nivel educativo necesario. |
| Componente | se relaciona con | Componente | Toda relación relevante debe tener un significado funcional. |
| Componente | utiliza | Material | Es opcional y solo se incluye cuando ayuda a comprender. |
| Curso | enseña | Máquina | Cada curso tiene una sola máquina principal. |
| Curso | contiene | Capítulo | Los capítulos forman una secuencia ordenada. |
| Capítulo | contiene | Lección | Las lecciones forman una secuencia ordenada. |
| Lección | contiene | Paso de ensamblaje | Cada lección tiene uno o más pasos. |
| Paso de ensamblaje | incorpora o conecta | Componente | Cada paso tiene un protagonista y un cambio observable. |
| Concepto | explica | Máquina, componente o relación | El conocimiento aparece cuando contribuye a comprender. |
| Curso | selecciona y ordena | Grafo de conocimiento | El curso utiliza solo el conocimiento pertinente a su alcance. |
| Alumno | recorre | Curso | Cada recorrido mantiene un progreso independiente. |
| Progreso | habilita | Capítulo, lección, paso o componente | Solo se muestra lo que corresponde al momento educativo. |
| Tutor de IA | utiliza | Contexto del tutor | Sus respuestas dependen del estado real del recorrido. |

---

# Reglas del dominio

Estas reglas deben mantenerse verdaderas en cualquier evolución futura del producto:

1. Toda máquina tiene un propósito, un límite y componentes relacionados.
2. Todo componente mostrado debe cumplir una función explicable.
3. Un subcomponente no es una entidad diferente; es un componente dentro de otro componente.
4. Toda relación incluida debe contribuir a explicar el funcionamiento de la máquina.
5. Cada curso enseña una máquina principal mediante una secuencia deliberada.
6. Cada capítulo representa un avance funcional o estructural coherente.
7. Cada lección tiene un único objetivo principal y produce un avance comprensible.
8. Cada paso de ensamblaje provoca un cambio visible y tiene significado educativo.
9. El conocimiento aparece cuando el alumno lo necesita para continuar construyendo.
10. La representación visual puede cambiar sin alterar la identidad conceptual de la máquina o sus componentes.
11. Una animación debe aclarar una relación o un cambio; no necesita simular toda la física involucrada.
12. El progreso registra hechos observables y nunca se confunde con una garantía de dominio.
13. El tutor de IA responde desde el contexto del curso y no desde información genérica desconectada.
14. La profundidad del contenido se detiene cuando deja de contribuir al objetivo educativo.

---

# Distinciones importantes

## Máquina y representación visual

La máquina es el sistema que se estudia. La representación visual es una forma de mostrarlo.

## Componente y pieza visual

El componente tiene identidad, función y relaciones. La pieza visual únicamente permite observarlo e interactuar con él.

## Ensamblaje y simulación

El ensamblaje revela estructura y relaciones. La simulación intenta reproducir comportamiento físico o lógico. Máquinas prioriza lo primero.

## Curso y grafo de conocimiento

El grafo organiza lo que se sabe. El curso decide qué parte se enseña, en qué orden y con qué experiencia.

## Lección y paso

La lección completa un objetivo de aprendizaje. El paso es una acción concreta dentro de ese objetivo.

## Progreso y comprensión

El progreso registra lo que el alumno hizo y completó. La comprensión se estima mediante sus decisiones y explicaciones, pero no puede reducirse a un porcentaje.

---

# Ejemplo conceptual: un candado de combinación

```text
Máquina: Candado de combinación
  Propósito: impedir o permitir la apertura según una combinación

  Componentes principales:
    - Cuerpo
    - Arco
    - Mecanismo de bloqueo
    - Selector de combinación

Curso: Candado de combinación
  Capítulo 1: El cuerpo y el arco
    Lección: Qué mantiene cerrado el candado
      Paso 1: colocar el arco
      Paso 2: conectar el arco con el mecanismo de bloqueo

  Capítulo 2: La combinación
    Lección: Cómo una posición permite el movimiento
      Paso 1: colocar el primer selector
      Paso 2: relacionarlo con el mecanismo de bloqueo

Conocimiento relevante:
  - restricción del movimiento
  - alineación
  - transferencia de movimiento
  - bloqueo y liberación

Contexto del tutor:
  - curso y lección actuales
  - piezas que el alumno ya colocó
  - selector actualmente visible
  - concepto de alineación ya presentado
  - pregunta del alumno sobre por qué el arco todavía no se libera
```

Este ejemplo no define todavía el contenido final del primer curso. Solo demuestra cómo se relacionan los conceptos del dominio.

---

# Criterio de finalización de esta fase

El modelo conceptual está suficientemente definido cuando cualquier persona que participe en el proyecto puede:

- nombrar las entidades principales usando el mismo vocabulario;
- distinguir una máquina de su curso y de su representación;
- describir la jerarquía entre curso, capítulo, lección y paso;
- explicar cómo componentes, relaciones y conceptos forman el conocimiento;
- identificar qué información compone el progreso del alumno;
- determinar qué contexto necesita el tutor de IA;
- detectar cuando una nueva idea duplica o contradice un concepto existente.

Las decisiones sobre almacenamiento, herramientas, servicios, renderizado o distribución pertenecen a fases posteriores.
