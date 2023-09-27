# EIF400_II_2023_OFS_P1_Eduardo_03-3pm

Descripción del Proyecto:

Este proyecto se compone de tres componentes principales: un área de edición de código (EA), una zona de salida de transpilación (TA) y una sección de respuesta de ejecución (RA). El cliente interactúa con estas áreas para editar código, solicitar la compilación y ejecución, así como ver los resultados.

En el área de edición (EA), los usuarios pueden modificar el código, que generalmente se utiliza para scripts en un entorno de desarrollo llamado OFS. La zona de salida de transpilación (TA) muestra la salida de la compilación de ese código, mientras que la sección de respuesta (RA) muestra los resultados de la ejecución del código.

La comunicación entre el cliente y el servidor se realiza a través de una API REST que ofrece diversos servicios. Por ejemplo, el cliente puede solicitar traer scripts desde el servidor y guardar scripts editados en el servidor. Durante estas interacciones, pueden ocurrir validaciones que generen mensajes de error o advertencia, según las circunstancias. Por ejemplo, si se intenta evaluar el código sin haberlo compilado previamente, se puede mostrar un mensaje de error.

En lo que respecta al servidor, se ofrecen varios servicios a través de la API. Cuando el usuario hace clic en "About", se invoca un servicio que responde con información sobre el equipo, el curso, el proyecto y otros detalles relevantes en formato JSON. El cliente muestra estos datos, por ejemplo, en un cuadro de diálogo.

Cuando se solicita traer un script, el servidor tiene un servicio que responde con el texto del script almacenado en el backend. Para compilar el código que se encuentra en EA, el servidor ofrece un servicio que toma el contenido de EA y lo devuelve con un timestamp añadido al inicio del texto. Este resultado se muestra en la zona de transpilación (TA).

Finalmente, cuando se solicita la evaluación del código, el servidor tiene un servicio que inicia la evaluación de la versión transpilada del script en EA. Dependiendo de la naturaleza de OFS y la posibilidad de flujos infinitos, se puede considerar la paginación para gestionar los resultados. En esta versión inicial, el resultado de la evaluación se simula con un archivo en el sistema de archivos del servidor y se muestra en la zona de evaluación (RA).

Este proyecto busca proporcionar un entorno de desarrollo y ejecución de scripts OFS con capacidades de edición, compilación y evaluación, junto con servicios para interactuar con el servidor y obtener información relevante sobre el proyecto.

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Navega al directorio del proyecto
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm run dev`


## Créditos

Equipo de Desarrollo:
- Alvaro Bonilla Ugalde
- Fransico Fuentes Gonzalez
- Eduardo Orellana Rivas
- Lesly Vargas Quesada

Curso: EIF_400 Paradigmas de Programación
Proyecto: One Flow Stream
Semestre: II CICLO
Año: 2023
Escuela: Escuela de Informática
Universidad: Universidad Nacional de Costa Rica

## Estado del Proyecto

Este proyecto está actualmente en desarrollo.



