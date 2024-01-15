Ideas de diseño de la web-app:

La web main, traerá siempre la ultima carrera y sus resultados.
Tendremos un Bar menu a la izda compuesto por:

- Últimos resultados (home de la web) ( Mostrara en una tabla información como ( https://ergast.com/api/f1/current/last/results ))
 Este componente en la tabla tendrá 2 botones en cada extremo del Nombre del circuito, donde podrás ver resultado de la carrera anterior con un botón que sea "Carrera Anterior" Si no es la ultima, tendrá otro botón para "Siguiente Carrera" 
 Estos botones estarán deshabilitado si no existe carrera anterior, para el botón de "Carrera/Resultado anterior" y también para "Siguiente Carrera/Resultado" si es la ultima disputada

- Standings ( Para ver una tabla con los resultados totales de esa temporada dividido en 2)
        - Drivers ( Clasificación por pilotos )
        - Constructors ( Clasificación por equipos )

-Schedule ( Donde podrás ver una lista con fechas de cuando se disputara, lugar, circuito, hora...etc. )
    Esta tabla se podrá pinchar en los nombres para mandarte a la ficha de Circuito

- Drivers ( Lista de pilotos )
    - Dentro de la lista los nombres se podrá hacer click para mandarte a una ficha del piloto 
        - Ficha del Piloto ( Sera una tabla con datos como,nombre, apellidos, fecha nacimiento , escudería, nacionalidad ...)
        Al pinchar en escudería , redirecionara a la ficha del equipo

-Teams ( Lista de equipos )
    - Dentro de la lista de equipos también se podrá hacer click para cargar el componente de ficha de equipo.
        -Ficha del equipo ( Sera una tabla con datos del equipo, nombre, nacionalidad, pilotos de la escudería y link a la Wikipedia)
        Al pinchar en el nombre del piloto, redirecionara a la ficha del piloto.

- Tracks ( Lista de Circuitos )
    - Misma composición que Drivers y Teams
        - Ficha del circuito ( Otra tabla con datos del circuito)




    