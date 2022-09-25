# Ejercicio de lógica como prueba técnica

**1. Repositorio**

En el repositorio de github se encuentra el código fuente del proyecto, el cual se encuentra en el archivo script.js. 

Link del repositorio: https://github.com/Jemeye/Ejercicio-L-gica-Smartsoft-Labs.git

**2. Ejecución**

Para ejecutar el comando en la consola usar el comando: 
    
    ```ts-node script.ts```

**3. Explicación** 

Para el desarollo de la prueba técnica se utilizó el lenguaje de programación TypeScript, el cual es un superconjunto de JavaScript que añade tipado estático y objetos basados en clases. 

    **-Explicación funcionamiento general**

El programa se ejecuta en la consola, se le muestra al usuario el siguiente mensaje y se le pide ingresar el número de la pregunta de interés. 

    "Bienvenido, a continuación encontrara información relacionada con el COVID-19 en los Estados Unidos de América

    1. ¿Cuál es el estado con mayor acumulado?
    2. ¿Cuál es el estado con menor acumulado?
    3. ¿Cuál es el porcentaje de muertes vs población, por estado?
    4. ¿Cuál es el estado más afectado?

    Ingrese el número de la pregunta que desea consultar: "
 
Luego, el programa muestra la respuesta a la pregunta ingresada por el usuario.

    
    **- Explicación de la obntención de datos**

Para extraer la información del .csv se utilizó la librería fs que permite extraer toda la información en un string, además, se usaron las funciones map y filter para extraer la información de cada fila y columna del .csv, conviertiéndola en un arreglo de objetos.

Como delimitador se usó la coma (,) y se omitió la primera fila del .csv, ya que esta contiene los nombres de las columnas.

    **- Explicación de la agrupación de datos**

Para agrupar los datos se utilizó un foreach, el cual recorre el arreglo de objetos y va sumando las muertes y la población de cada ciudad perteneciente a un mismo estado, para luego agregarlos a un nuevo arreglo de tipo State que contiene el nombre, la población y el total de muertes de cada estado. 

El arreglo que se retorna es ordenado de menor a mayor por el total de muertes de cada estado.

    **- Explicación de la obtención de la respuesta a la primera pregunta**

Debido a que el arreglo deState se encuentra ordenado de menor a mayor por el total de muertes, la respuesta a la primera pregunta se obtiene de la siguiente manera: 

    ```let stateWithMoreDeaths = states[states.length - 1];```

    **- Explicación de la obtención de la respuesta a la segunda pregunta**

Debido a que el arreglo de State se encuentra ordenado de menor a mayor por el total de muertes, la respuesta a la segunda pregunta se obtiene de la siguiente manera: 

    ```let stateWithLessDeaths = states[0];```

Sólo se muestra el primer elemento del arreglo, por lo que si hay varios estados con un mismo nivel de afectación, se mostrará el primero de ellos.

    **- Explicación de la obtención de la respuesta a la tercera pregunta**

Para obtener la respuesta a la tercera pregunta se creó un arreglo con el nombre de cada estado y con el porcentaje, el cual fue obtenido con la siguiente fórmula: 

    ```let percentageOfDeaths = (state.deaths / state.population) * 100;```

Para aquellos estados que tenían 0 muertes, se asignó el valor 0 al porcentaje de muertes, debido a que la división por 0 da como resultado un NaN, como es el caso para los estados de American Samoa, Diamond Princess, Grand Princess, Guam, Northern Mariana Islands y Virgin Islands.

Por último, se mostró el arreglo de objetos en la consola con ayuda de, que permite mostrar el arreglo de objetos en la consola de una manera más legible.
    
        ```console.table(statesWithPercentageOfDeaths);```

    **- Explicación de la obtención de la respuesta a la cuarta pregunta**

Es importante mencionar que para esta pregunta se determinó que el estado más afectado correspondía a aquel que tuviera un porcentaje de muertes más alto. Por lo anterior, el arreglo de objetos objetivo en la tercera pregunta se ordenó de mayor a menor por el porcentaje de muertes y se mostró el primer elemento del arreglo en la consola.

    ```console.table(statesWithPercentageOfDeaths[0]);```   

Sólo se muestra el primer elemento del arreglo, por lo que si hay varios estados con un mismo porcentaje de afectación, se mostrará el primero de ellos.

Adicionalmente, el código fuente cuenta con comentarios que explican el funcionamiento de cada función y de cada parte del código, este en inglés por buenas prácticas.

**4. Evidencia**
 
  **- Tabla con los datos de los estados**
 image.png

  **- Respuesta a la primera pregunta**
    image.png

  **- Respuesta a la segunda pregunta**
  image.png

  **- Respuesta a la tercera pregunta**
  image.png
  image.png

  **- Respuesta a la cuarta pregunta**
  image.png


**5. Generalidades**

Se usaron los siguientes comandos para el uso de los recursos utilizados en la prueba técnica:

    ```npm install xlsx```
    ```npm install -g ts-nodeS```
    ```npm install prompt -- save```
    
Además, se usaron dos librerias para el manejo de archivos de excel (fs) y para la lectura de datos desde la consola (readline).

    ```import * as readline from 'readline';```
    ```import fs from 'fs';```
    