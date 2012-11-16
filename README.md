<center>
Editor de Diagramas de Flujo
============================
----------
</center>
<center>
### Documentación de Aplicación I Etapa
</center>

<center>
### Tecnológico de Costa Rica</center>
<center>
### Escuela de Ingeniería en Computación</center>
<center>
### Curso: Introducción al Diseño de Interfaces Gráficas de Usuario</center>
<center>
### Profesor: Armando Arce Orozco</center>

<center>
### Cristina Valverde Mora - 200844549</center>
<center>
### Kevin Martínez Montero - 201029891</center>
<center>
### II Semestre 2012</center>

----------

##Introducción

La presente documentación se refiere a la primera etapa del proyecto, la cual incluye la funcionalidad básica del editor a desarrollar y a su vez una investigación preliminar de las librerías en javascript para poder implementar el editor correctamente.
 
La implementación del editor se realizará de forma estática para esta primera etapa del proyecto, por lo que sólo se mostrará la funcionalidad principal del editor sin incorporar aún interacción o características avanzadas a su comportamiento. La funcionalidad principal del editor consiste en la carga y despliegue de diagramas, desde archivos en disco.
 
Para implementar el editor y visualizador de contenido asignado, se debe hacer uso de Mozilla XUL como ambiente gráfico y herramienta de desarrollo. Además se utilizará el lenguaje CoffeeScript junto con D3.js, de forma que se describirán las decisiones de implementación necesarias, las estructuras de datos a utilizar y se hará un análisis de las características del editor utilizado.
 
Se realizarán las pruebas necesarias al editor, las cuales se mostrarán en este documento, utilizando un conjunto de datos de prueba específicos. Para las siguientes etapas del proyecto se manejará funciones más complejas del editor, de modo que cada diagrama pueda cargarse, editarse y guardarse correctamente a través de la aplicación. 

Se explicará a profundidad el editor a desarrollar, el cual es de diagramas de flujo,  junto con las posibles interacciones y características avanzadas que se incorporarán a la aplicación en las próximas etapas del proyecto.
 
Finalmente, se presentarán las conclusiones de la primera etapa del proyecto las cuales estarán basadas en las limitaciones observadas y posibles mejoras (lista TO DO) de la aplicación.

----------

## Descripción del contenido a desplegar

Para este proyecto el contenido a desplegar son los diagramas de flujo, los cuales representan algoritmos o procesos, donde cada símbolo utilizado tiene un único significado, pero puede ser representado por diversas figuras. A continuación se muestra una tabla con los símbolos y las figuras que los representan:

--------------------------------------------------
Símbolo	-> Figura
--------------------------------------------------
Inicio	-> Rectángulo redondeado
--------------------------------------------------
Fin	-> Rectángulo redondeado
--------------------------------------------------
Flujo de control	-> Flechas
--------------------------------------------------
Pasos de proceso genéricos	-> Rectángulo
--------------------------------------------------
Estilo alterno de proceso	-> Rectángulo con doble borde
--------------------------------------------------
Entrada/Salida	-> Romboide
--------------------------------------------------
Paso de decisión 	-> Rombo
--------------------------------------------------

----------

##Definición de estructuras de datos (formato) utilizadas

Para el despliegue de los gráficos se creó en el archivo main.xul  una especificación de gráficos  vectoriales redimensionables (SVG), en la cual se dibujan los gráficos generados con la biblioteca joint.all.min.js, para implementarla se agrega el siguiente namespace  al window principal

<pre><code>
xmlns:svg="http://www.w3.org/2000/svg"
</code></pre>

Esto solo define que se van a utilizar elementos del tipo svg. La siguiente etiqueta es utilizada para crear un elemento de ese tipo donde se van a dibujar los diagramas:

<svg:svg version="1.1" baseProfile="full" width="550" height="550" id="ide">
      
    </svg:svg>

El archivo main.coffee contiene código en coffeescript de la clase implementada para dibujar de nombre Diagram la función draw es invocada cuando se abre un archivo cualquiera y dibuja dos círculos a los que si se  les da click se invoca al evento el cual despliega una alerta. A continuación se  detalla el código de la clase Diagram:

	draw: ->
		w = screen.width/4
		h = screen.height/4
		@paper = Raphael("container", w, h)
		nodes = @paper.set()
		circle1 = @paper.circle(w/8, h/3, w/16)
				.attr({fill: "#f33"})
				.click(@evento)
		circle2 = @paper.circle(w - w/8, h/3, w/16)
				.attr({fill: "#acb"})
				.click(@evento)
			
	line: ->
		alert "Hizo click sobre el circulo 1"
		band = @paper.path("M 0 0").attr({"stroke-width": 5})
		band.node.style.pointerEvents = "none"
		dimensions = this.getBBox()
		x = dimensions.x + dimensions.width/2
		y = dimensions.y + dimensions.height/2
		if (!window.onmousemove) then window.onmousemove = ((e) -> band.attr({path: "M " + x + " " + y + "L " + e.x + " " + e.y}))
		else window.onmousemove = null
		
	mensaje: (dato) ->
		if dato is "rojo" then alert "Hizo click sobre el circulo rojo"
		else if dato is "verde" then alert "Hizo click sobre el circulo verde"
		
	evento: ->
		alert "Hizo click sobre un circulo"


----------

##Forma de compilación, ejecución y utilización de la aplicación

Para hacer uso del editor de diagramas de flujo es necesario tener instalada la aplicación Mozilla XUL. Antes de compilar el programa es conveniente crear los archivos y directorios que utiliza XUL para poder ejecutar la aplicación correctamente.

Primero se crea la jerarquía de archivos, a partir de los archivos que han sido proporcionados en el repositorio de github, de la siguiente manera:

    Proyecto1
      + chrome
         + content
             * program.xul
         * chrome.manifest
      + defaults
         + preferences
             * prefs.js
      + application.ini

Para la compilación del programa es necesario tomar el archivo de extensión .coffee donde se tiene escrita la lógica de la aplicación. Para generar el archivo en extensión .js es necesario llamar al compilador de coffeescript desde la línea de comandos. Se debe abrir la terminal de comandos de Windows y tener disponible el compilador de coffeescript llamado coffee.exe en el directorio donde se escribirá la siguiente línea: 

<pre><code>
coffee -c main.coffee
</code></pre>

Con esto se creará un archivo equivalente al anterior sólo que con extensión .js, lo cual es necesario para ejecutar la aplicación. El compilador de coffeescript, las librerías y el programa con extensión .js deben residir en el mismo directorio en donde se encuentra la carpeta: "D:\Proyecto1\chrome\content\” con el fin de que la aplicación pueda compilarse correctamente y proceder a su ejecución.

Para la ejecución del programa se debe abrir la terminal de comandos de Windows y escribir la siguiente línea (se asume que el proyecto reside en el disco D y que Mozilla XULRunner se encuentra instalado en el directorio indicado):

<pre><code>
"C:\Program Files (x86)\Mozilla XULRunner\xulrunner.exe" "D:\Proyecto1\application.ini" -jsconsole
</code></pre>

En caso de que la línea anterior no trabaje puede variarse de la siguiente manera:

<pre><code>
"C:\Program Files\Mozilla XULRunner\xulrunner.exe" "D:\Proyecto1\application.ini" -jsconsole
</code></pre>
 
Si no se desea desplegar la consola de javascript simplemente se elimina el -jsconsole de la línea. En caso de que no se cuente con Mozilla XUL para ejecutar la aplicación, ésta también puede ejecutarse directamente usando Firefox de la siguiente manera:

<pre><code>
"C:\Program Files\Mozilla Firefox\firefox.exe" -app "D:\Proyecto1\application.ini"
</code></pre>

O bien:

<pre><code>
"C:\Program Files (x86)\Mozilla Firefox\firefox.exe" -app "D:\Proyecto1\application.ini"
</code></pre>

De esta forma el editor está listo para utilizarse. Las opciones disponibles a utilizar son las del menú, situado en la parte superior de la aplicación, desde la opción File donde se encuentran las opciones Open, Save y Exit. Save está presente pero no está implementada para la presente etapa. La opción de Exit sirve para cerrar la aplicación en caso de que ya no se desee trabajar en el editor. La opción de Open se encarga de abrir una nueva ventana donde el usuario pueda recorrer los directorios que desee y seleccionar un diagrama de flujo en formato XML, el cual el editor leerá y a partir de esto lo desplegará en la ventana de trabajo situada en la parte derecha del editor.

----------

##Ejemplos de datos a utilizar como pruebas

Los ejemplos de datos a utilizar como pruebas son diagramas de flujo en archivos con formato XML. Este formato nos permite crear un diagrama de flujo y guardarlo correctamente para su carga en nuevas ediciones. Es un formato útil para definir las características que contendrá cada diagrama de flujo de modo que el programa pueda definir un estilo capaz de leer correctamente cada diagrama de flujo tomado como archivo de entrada.

Para la carga de archivos se manejará uno de dos formatos, el cual aún no se encuentra definido. Esto se decidirá para la siguiente implementación del editor pero se presentará un ejemplo de cada formato a continuación.
 
El primer ejemplo de un archivo en formato XML que representa un diagrama de flujo es el siguiente:

```
<code>
<flowchart>
    <block id="b1" cap-pos="inside" type="rhombus_small_lightgreen" caption="x>0" left="221" top="124" width="46" height="46" lock="false" zindex="1001">
        <connection ref="b4" output="1" input="2" label="true" type="none-arrow"></connection>
        <connection ref="b3" output="3" input="2" label="false" type="none-arrow"></connection>
    </block>
    <block caption="start" cap-pos="inside" type="circle_small_lightgreen" id="b2" width="45" height="45" lock="false" left="308" top="27" zindex="1001">
        <connection ref="b1" output="4" input="2" type="none-arrow"></connection>
    </block>
    <block caption="End" cap-pos="inside" type="circle_small_lightgreen" id="b3" width="45" height="45" lock="false" left="355" top="330" zindex="1001"></block>
    <block caption="z>5" cap-pos="inside" type="rhombus_small_lightgreen" id="b4" width="46" height="46" lock="false" left="136" top="250" zindex="1001">
        <connection ref="b3" output="3" input="1" label="false" type="none-arrow"></connection>
        <connection ref="b7" output="1" input="2" label="true" type="none-arrow"></connection>
    </block>
    <block caption="i++" cap-pos="inside" type="rect_small_lightgreen" id="b7" width="46" height="46" lock="false" left="69" top="354" zindex="1001">
        <connection ref="b3" output="4" input="4" type="none-arrow"></connection>
    </block>
</flowchart>
</code>
```

El segundo ejemplo con formato distinto en XML es el siguiente: 

```
<code>
<mxGraphModel dx="800" dy="800" grid="1" guides="1" tooltips="1" connect="1" fold="1" page="1" pageScale="1" pageWidth="826" pageHeight="1169" style="default-style2">
	<root>
		<mxCell id="0"/>
		<mxCell id="1" parent="0"/>
		<mxCell id="2" value="inicio" style="ellipse" vertex="1" parent="1">
			<mxGeometry x="180" y="80" width="80" height="80" as="geometry"/>
		</mxCell>
		<mxCell id="3" value="codigo1" style="rounded=1" vertex="1" parent="1">
			<mxGeometry x="400" y="100" width="120" height="60" as="geometry"/>
		</mxCell>
		<mxCell id="5" value="" style="endArrow=none;exitX=1;exitY=0.5;entryX=0;entryY=0.75" edge="1" parent="1" source="2" target="3">
			<mxGeometry as="geometry"/>
		</mxCell>
		<mxCell id="7" value="condicion" style="rhombus" vertex="1" parent="1">
			<mxGeometry x="420" y="210" width="80" height="80" as="geometry"/>
		</mxCell>
		<mxCell id="10" value="" style="endArrow=none;exitX=0.5;exitY=0;entryX=0.5;entryY=1" edge="1" parent="1" source="7" target="3">
			<mxGeometry as="geometry"/>
		</mxCell>
		<mxCell id="11" value="codigo2" vertex="1" parent="1">
			<mxGeometry x="400" y="340" width="120" height="60" as="geometry"/>
		</mxCell>
		<mxCell id="14" value="" style="endArrow=none;exitX=0.5;exitY=1;entryX=0.5;entryY=0" edge="1" parent="1" source="7" target="11">
			<mxGeometry as="geometry"/>
		</mxCell>
		<mxCell id="15" value="fin" style="ellipse;shape=doubleEllipse" vertex="1" parent="1">
			<mxGeometry x="420" y="450" width="80" height="80" as="geometry"/>
		</mxCell>
		<mxCell id="16" value="" style="endArrow=none;exitX=0.5;exitY=1;entryX=0.5;entryY=0" edge="1" parent="1" source="11" target="15">
			<mxGeometry as="geometry"/>
		</mxCell>
	</root>
</mxGraphModel>
</code>
```

Un ejemplo al que se quisiera llegar es el siguiente:

![Alt text](http://3.bp.blogspot.com/_JmIzs1RspX0/TDFbgDZnRnI/AAAAAAAAAFs/pB57qilCSdg/s1600/DIAGRAMA+DE+FLUJO2.jpg)

----------

##Limitaciones observadas y posibles mejoras (lista TO DO)

Las limitaciones encontradas para esta primer etapa del proyecto fueron bastantes, pues el ambiente Mozilla XUL no resultó muy cooperativo para los objetivos que se debían cumplir para implementar el primer módulo del editor de diagramas de flujo en cuestión. A continuación se presentan las limitaciones observadas y posibles mejoras:

* Mozilla XUL no permite utilizar una gran cantidad de librerías en javascript, ya que genera errores constantemente en librerías que funcionan perfectamente en HTML.
* El uso de Mozilla XUL se restringe únicamente a crear aplicaciones muy sencillas, ya que no se nos permitió implementar una librería en javascript que nos facilitará la creación del editor y visualizador de diagramas de flujo.
* A partir de constantes pruebas se determina que sólo pueden crearse figuras en el marco de trabajo del editor de forma estática, ya que implementar eventos sobre las figuras no fue exitoso.
* La lectura de archivos no fue implementada como se propuso, pues no se pudo hacer el mapeo de los archivos de prueba en formato XML sobre las figuras pertinentes en el marco de trabajo, debido a los constantes problemas que generaba Mozilla XUL.
* Para las próximas implementaciones del editor de diagramas de flujo se utilizará una nueva herramienta o tecnología, la cual aún no ha sido seleccionada, para su correspondiente desarrollo, esto porque Mozilla XUL resultó ser más restrictiva de lo que se  esperaba.
* Para las nuevas etapas del editor, se agregarán nuevas funcionalidades y características, de modo que sea posible realizar todas las acciones necesarias de carga, visualización y edición de diagramas de flujo para aprovechar esta herramienta al máximo. Asimismo, la interfaz se hará más sofisticada para cumplir con estos objetivos.
* Se espera contar con una nueva herramienta más amigable con las librerías de javascript encontradas, para poder finalizar el primer módulo del editor y proseguir con las siguientes etapas de desarrollo más fácilmente.

----------