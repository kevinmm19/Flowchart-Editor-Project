<center>
Editor de Diagramas de Flujo
============================
----------
</center>
<center>
### Documentación de Aplicación II Etapa
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

La presente documentación se refiere a la segunda etapa del proyecto, la cual incluye la funcionalidad completa del editor de diagramas de flujo asignado .
 
La implementación del editor se hizo de forma dinámica para esta segunda etapa del proyecto, por lo que se muestra  las funcionalidades principales del editor, incorporando interacciones. Las funcionalidades principales del editor consisten en la carga, despliegue, edición y guardado de diagramas de flujo en disco así como la creación de diagramas flujo desde la misma aplicación.
 
Para la implementación del editor y visualizador de diagramas de flujo, se  hace uso de un híbrido entre Adobe Air y Bootstrap, como ambiente gráfico y herramienta de desarrollo. Además se utiliza la librería Jointjs para dibujar los distintos componentes de los diagramas de flujo, también  se describen las decisiones de implementación tomadas, las estructuras de datos utilizadas y se hace un análisis de las características del editor utilizado.
 
Para probar la funcionalidad alcanzada en este proyecto se muestran las pruebas realizadas  al editor para verificar que las funcionalidades funcionen bien,  esto se hizo utilizando un conjunto de datos de prueba específicos. 

Se explica a profundidad el editor desarrollado, el cual es de diagramas de flujo,  junto con las interacciones y características avanzadas que se incorporaron a la aplicación en esta etapa del proyecto.
 
Finalmente, se presentarán las conclusiones de la segunda etapa del proyecto las cuales estarán basadas en las limitaciones observadas y posibles mejoras (lista TO DO) de la aplicación.

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
Paso de decisión 	-> Rombo
--------------------------------------------------

----------

##Definición de estructuras de datos (formato) utilizadas

Funciones de inicializacion

function getPaper(): esta función lo que hace es crear una instancia Joint.paper en el panel de visualización , lugar en el que se desplegarán los elementos del diagrama que se esta construyendo.

Funciones de menu y manejo de archivos

function getCaret(el):
function heading():
function addList()

function replaceOne(): reemplaza la primera aparición que se encuentre en el textarea  según los parámetros dados en el modal de replace.

function replace(search,replace): reemplaza la primera aparicion de search en textarea con el valor de replace.

function replaceAll(): reemplaza todas las apariciones que se encuentre en el textarea  según los parámetros dados en el modal de replace.

function newfile(): crea un nuevo archivo en el editor

function openfile():  abre un archivo para desplegar en el visualizador

function saveAsfile(): guarda el archivo con el nombre especificado por el usuario.

function savefile(): guarda  las modificaciones hechas en el archivo actual.

function exit(): finaliza y cierra la aplicación.

Funciones del despliegue del flowchart en el panel de view

function update(): actualiza el visualizador de la aplicación.

function draw(): dibuja en el visualizador basado en lo que hay en el editor.

function drawStartNode(label,color,sizeX,sizeY,w,h): dibuja un nodo Start con los valores de label,color,sizeX,sizeY,w y h.

function drawEndNode(label,color,sizeX,sizeY,w,h):dibuja un nodo End con los valores de label,color,sizeX,sizeY,w y h.

function drawBlockNode(label,color,sizeX,sizeY,w,h):dibuja un nodo Block con los valores de label,color,sizeX,sizeY,w y h.

function drawDecisionNode(label,color,sizeX,sizeY,w,h): dibuja un nodo Decision con los valores de label,color,sizeX,sizeY,w y h.

function drawLinkNode(source,destiny,label,color,array):dibuja un nodo Link con los valores de source,destiny,label,color,array. Con esto se enlaza a dos nodos de cualquier otro tipo.

function searchShape(name,array): ubica una figura en el array formado por todas las figuras del visualizador para aplicarle operaciones.

Funciones de la barra de herramientas

function drawBegin():  agrega el tag <flowchart> al editor .

function drawFinish():agrega la secuencia de tags que representan un nodo Finish.

function drawStart(): agrega la secuencia de tags que representan un nodo Start.

function drawBlock(): agrega la secuencia de tags que representan un nodo Block. 

function drawDecision(): agrega la secuencia de tags que representan un nodo Decision.

function drawEnd(): agrega la secuencia de tags que representan un nodo End.

function drawLink(source,destiny): agrega la secuencia de tags que representan un nodo Link.

function edit(editId,editLabel,editColor,editX,editY,eleini,elefin): función que se encarga de editar nodos del tipo Start, End, Block y Decision.

function deletee(editId,eleini,elefin):función que se encarga de eliminar nodos del tipo Start, End, Block y Decision.

function deleteeLink(editId,eleini,elefin): función que se encarga de eliminar nodos del tipo Link.

function editLink(editId,editLabel,editSource,editDestiny,editColor,eleini,elefin):función que se encarga de editar nodos del tipo Link.

function add(addLabel,addColor,addX,addY,type): función que se encarga de agregar nodos del tipo Start, End, Block y Decision.

function addLink(addLabel,addSource,addDestiny,addColor): función que se encarga de agregar nodos del tipo Link

function editSelect(editId,editLabel,editColor,editX,editY): funcion que filtra que tipo de nodo va a ser editado de acuerdo con el id.

function addSelect(addLabel,addColor,addX,addY):funcion que filtra que tipo de nodo va a ser agregado de acuerdo con el tipo seleccionado por el usuario.

function deleteSelect(deleteId):funcion que filtra que tipo de nodo va a ser eliminado de acuerdo con el id.

----------

##Forma de compilación, ejecución y utilización de la aplicación

Para hacer uso del editor de diagramas de flujo es necesario tener instalada la aplicación Adobe Air y tener descargadas las librerias del Framework Bootstrap de Twitter, Jointjs y JQuery que se demostrarán en la jerarquía de archivos. Antes de compilar el programa es conveniente crear los archivos y directorios que utiliza la aplicación para poder ejecutarla correctamente.

Primero se crea la jerarquía de archivos, a partir de los archivos que han sido proporcionados en el repositorio de github, de la siguiente manera:

    Flowchart Editor
      + source
         + bootstrap
             + cerulean
             + css
             + img
             + js
         + icons
             * Arrow.png
             * begin.png
             * block.png
             * end.png
             * finish.png
             * rombo.png
             * start.png
         + js
             * AIRAliases.js
             * FlowchartFunctions.js
             * joint.all.min.js
             * jquery-1.8.2.js
         * application.xml
         * Flowchart.html

Para la compilación del programa es necesario tomar el archivo de extensión .coffee donde se tiene escrita la lógica de la aplicación. Para generar el archivo en extensión .js es necesario llamar al compilador de coffeescript desde la línea de comandos. Se debe abrir la terminal de comandos de Windows y tener disponible el compilador de coffeescript llamado coffee.exe en el directorio donde se escribirá la siguiente línea: 


Para la ejecución del programa se debe abrir la terminal de comandos de Windows y escribir la siguiente línea (se asume que el proyecto reside en el disco C y que el application.xml está ubicado en el directorio actual):

<pre><code>
C:\AdobeAirSDK\bin\adl application.xml
</code></pre>

La compilación y empaque de la aplicación se puede realizar de la siguiente manera (desde un directorio Flowchart Editor):

<pre><code>
C:\AdobeAirSDK\bin\adt –certificate -cn SelfSigned 1024-RSA certificado.pfx MiClaveSecreta
</code></pre>

Y finalmente se debe agregar lo siguiente en una sola línea incluyendo el punto final:

<pre><code>
C:\AdobeAirSDK\bin\adt -package -storetype pkcs12 
    -keystore ..\certificado.pfx ..\TinyHMLEditor.air application.xml .
</code></pre>

De esta forma el editor está listo para utilizarse. Las opciones disponibles a utilizar son las del menú, situado en la parte superior de la aplicación, desde la opción File donde se encuentran todas las opciones a utilizar Open, Open Recent, Save As, Save, New y Exit. Save y Save As guardan el contenido del panel izquierdo en un archivo XML. La opción de Exit sirve para cerrar la aplicación en caso de que ya no se desee trabajar en el editor. La opción de Open se encarga de abrir una nueva ventana donde el usuario pueda recorrer los directorios que desee y seleccionar un diagrama de flujo en formato XML, el cual el editor leerá y a partir de esto lo desplegará en la ventana de trabajo situada en la parte derecha del editor.

El menú también incluye las funciones de edición del diagrama de flujo actual. Tales opciones son: Edit (Edit Node y Edit Link), Add (Add Node y Add Link), Delete (Delete Node y Delete Link) y Replace. Asi mismo, se presenta una barra de herramientas debajo del menú con siete distinos botones los cuales facilitarán el diseño de los diagramas de flujo del usuario. tales botones agregan nuevos elementos al diagrama y estos son: Begin, Start, Block, End, Decision, Link y Finish.

----------

##Ejemplos de datos a utilizar como pruebas

Los ejemplos de datos a utilizar como pruebas son diagramas de flujo en archivos con formato XML. Este formato nos permite crear un diagrama de flujo y guardarlo correctamente para su carga en nuevas ediciones. Es un formato útil para definir las características que contendrá cada diagrama de flujo de modo que el programa pueda definir un estilo capaz de leer correctamente cada diagrama de flujo tomado como archivo de entrada.

Para la carga de archivos se manejará un formato específico el cual se mostrará a continuación a modo de ejemplo. El primer ejemplo de un archivo en formato XML que representa un diagrama de flujo es el siguiente:

```
<code>
<flowchart>
<start>
			<id>s01</id>
			<label>Lamp doesn't work</label>
			<color>pink</color>
			<x>200</x>
			<y>5</y>
			<width>140</width>
			<height>60</height>
</start>
<decision>
			<id>d01</id>
			<label>Lamp plugged in?</label>
			<color>yellow</color>			
			<x>230</x>
			<y>110</y>
			<width>70</width>
			<height>70</height>
</decision>
		<end>
			<id>e01</id>
			<label>Plug in lamp</label>
			<color>lightgreen</color>			
			<x>400</x>
			<y>110</y>
			<width>140</width>
			<height>60</height>
                        </end>
		<decision>
			<id>d02</id>
			<label>Bulb burned out?</label>
			<color>yellow</color>			
			<x>230</x>
			<y>255</y>
			<width>70</width>
			<height>70</height>
                        </decision>
		<end>
			<id>e02</id>
			<label>Replace bulb</label>
			<color>lightgreen</color>			
			<x>400</x>
			<y>255</y>
			<width>140</width>
			<height>60</height>
                        </end>
<end>
			<id>e03</id>
			<label>Repair lamp</label>
			<color>lightgreen</color>			
			<x>200</x>
			<y>390</y>
			<width>140</width>
			<height>60</height>
</end>
		<link>
			<id>l1</id>
			<source>s01</source>
			<destiny>d01</destiny>
			<color>magenta</color>
		</link>
		<link>
			<id>l2</id>
			<source>d01</source>
			<destiny>d02</destiny>
			<label>Yes</label>
			<color>red</color>
		</link>
		<link>
			<id>l3</id>
			<source>d01</source>
			<destiny>e01</destiny>
			<label>No</label>
			<color>steelblue</color>
		</link>
		<link>
			<id>l4</id>
			<source>d02</source>
			<destiny>e02</destiny>
			<label>Yes</label>
			<color>gold</color>
		</link>
		<link>
			<id>l5</id>
			<source>d02</source>
			<destiny>e03</destiny>
			<label>No</label>
			<color>darkcyan</color>
		</link>				
</flowchart>
</code>
```

El diagrama de flujo que se desea crear es el siguiente:

![Alt text](http://upload.wikimedia.org/wikipedia/commons/thumb/9/91/LampFlowchart.svg/220px-LampFlowchart.svg.png)

Un segundo ejemplo que puede realizarse perfectamente en la aplicación es el siguiente:

![Alt text](http://3.bp.blogspot.com/_JmIzs1RspX0/TDFbgDZnRnI/AAAAAAAAAFs/pB57qilCSdg/s1600/DIAGRAMA+DE+FLUJO2.jpg)

Un tercer ejemplo de un algoritmo que desea saber si un numero entero es par o impar puede describirse con el siguiente archivo XML de prueba:

```
<code>
<flowchart>
<start>
			<id>s01</id>
			<label>int x = number</label>
			<color>lightgreen</color>
			<x>200</x>
			<y>5</y>
			<width>140</width>
			<height>60</height>
</start>
<block>
			<id>b01</id>
			<label>int y = x%2</label>
			<color>pink</color>
			<x>200</x>
			<y>110</y>
			<width>140</width>
			<height>60</height>
</block>
<decision>
			<id>d01</id>
			<label>if(y==0)</label>
			<color>white</color>			
			<x>230</x>
			<y>230</y>
			<width>70</width>
			<height>70</height>
</decision>
		<end>
			<id>e01</id>
			<label>return "Even"</label>
			<color>lightblue</color>			
			<x>400</x>
			<y>230</y>
			<width>140</width>
			<height>60</height>
		</end>
		<end>
			<id>e02</id>
			<label>return "Odd"</label>
			<color>lightblue</color>			
			<x>200</x>
			<y>390</y>
			<width>140</width>
			<height>60</height>
		</end>
		<link>
			<id>l1</id>
			<source>s01</source>
			<destiny>b01</destiny>
			<color>red</color>
		</link>
		<link>
			<id>l2</id>
			<source>b01</source>
			<destiny>d01</destiny>
			<color>red</color>
		</link>
		<link>
			<id>l3</id>
			<source>d01</source>
			<destiny>e01</destiny>
			<label>true</label>
			<color>red</color>
		</link>
		<link>
			<id>l4</id>
			<source>d01</source>
			<destiny>e02</destiny>
			<label>false</label>
			<color>red</color>
		</link>
</flowchart>
</code>
```

El resultado sería algo similar al siguiente diagrama:

![Alt text](http://physics.nyu.edu/pine/pymanual/_images/flow_if_else.jpg)

----------

##Limitaciones observadas y posibles mejoras (lista TO DO)

Las limitaciones encontradas para esta segunda etapa del proyecto fueron pocas con respecto a la primer etapa, pues el ambiente híbrido de Bootstrap, Adobe Air y Javascript no resultó muy díficil pero si se tuvieron ciertos problemas al tratar de implementar el empaquetamiento o la ejecución de la aplicación en Adobe Air. A continuación se presentan las limitaciones observadas y posibles mejoras:

* Adobe Air no permite utilizar la librería Jointjs pues al tratar de dibujar las figuras en el ambiente, este tira errores de tipo los cuales vienen indicados explícitamente en la libreria de joint.all.min.js, por lo que su implementación en Adobe Air no fue exitosa.
* El uso de Adobe Air para la carga y manejo de archivos fue exitoso pues todos los archivos pueden cargarse y guardarse correctamente.
* A partir de constantes pruebas se determina que los diagramas de flujo pueden realizarse sin problemas, pues la implementación de los diagramas a partir de los archivos XML de prueba fue exitosa, pero esto es solo factible en HTML pues en Adobe Air se generan errores al utilzar la librería de Jointjs.
* La funcionalidad de cargar archivos recientes no pudo realizarse, puesto que no se pudieron crear items dinamicos que representaran archivos para la opción de dropdown “File/Open Recent” de la aplicación, esto porque el manejo de los dropdowns por Bootstrap es distinto al HTML puro, por lo que esta funcionalidad no fue exitosa.
* Para la última etapa del editor, se agregarán funcionalidades y características relacionadas con el estilo y manejo de temas de la aplicación, con el fin de proporcionar un ambiente sofisticado al usuario.
* Se esperan resolver los problemas de librerías con Adobe Air pues la librería clave para la realización del proyecto es Jointjs.

----------
