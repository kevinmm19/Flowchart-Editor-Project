///////////////////////////////////////////////////////////////////////////////////////////
//
//	Desarrolladores:
//									Kevin Martinez Montero
//									Cristina Valverde Mora
//	© 2012
//
///////////////////////////////////////////////////////////////////////////////////////////
//
// Funciones de inicializacion
//
///////////////////////////////////////////////////////////////////////////////////////////

window.onload = function(){getPaper();}

function getPaper() {return Joint.paper(document.getElementById("view"));}

///////////////////////////////////////////////////////////////////////////////////////////
//
// Funciones de menu y manejo de archivos
//
///////////////////////////////////////////////////////////////////////////////////////////

function getCaret(el) { 
  if (el.selectionStart) { 
    return el.selectionStart; 
  } else if (document.selection) { 
    el.focus(); 
    var r = document.selection.createRange(); 
    if (r == null) return 0; 
    var re = el.createTextRange(), 
        rc = re.duplicate(); 
    re.moveToBookmark(r.getBookmark()); 
    rc.setEndPoint('EndToStart', re); 
    var add_newlines = 0;
    for (var i=0; i<rc.text.length; i++)
      if (rc.text.substr(i, 2) == '\r\n') {
        add_newlines += 2;
        i++;
      }
    return rc.text.length - add_newlines; 
  }
  return 0; 
};

function heading() {
  var heading_text = document.getElementById('heading-text');
  var heading_size = document.getElementById('heading-size');
  var textarea = document.getElementById('textarea');
  var cursor = getCaret(textarea);
  var text = textarea.value;
  var text = text.substring(0,cursor)+'<H'+heading_size.value+'>'+
             heading_text.value+'</H'+heading_size.value+'>'+
             text.substring(cursor,text.length);
  textarea.value = text;
};

function addList() {
  var list_text = document.getElementById('list-text');
  var list_type = document.getElementById('list-type');
  var textarea = document.getElementById('textarea');
  var cursor = getCaret(textarea);
  var text = textarea.value;
	var items = list_text.value;
	var items = new Array();
	items = list_text.value.split(',');
  var text = text.substring(0,cursor)+'<'+list_type.value+'>';
  for (var i=0;i<items.length;i++)
	{ 
		text += "<li>"+items[i]+"</li>";
	}						
	text += "</"+list_type.value+'>';
	text.substring(cursor,text.length);
  textarea.value = text;
};

function replaceOne() {
  var search_text = document.getElementById('search-text');
	var replace_text = document.getElementById('replace-text');
	var textarea = document.getElementById('textarea');
	var text = textarea.value;
	var textFinal = text.replace(search_text.value,replace_text.value);
	textarea.value = textFinal;
};

function replaceAll() {
  var search_text = document.getElementById('search-text');
	if (search_text.value == "")
		alert("Error: Verifique que el campo de busqueda no este vacio!");
  else {
		var replace_text = document.getElementById('replace-text');
		var textarea = document.getElementById('textarea');
		var text = textarea.value;
		while (text.indexOf(search_text.value) != -1)
				text = text.toString().replace(search_text.value,replace_text.value);
		textarea.value = text;
	}
};

function newfile() {
  //air.trace("Ejecutando newfile..");
  document.getElementById("textarea").value = '';
};

function openfile() {
  //air.trace("Ejecutando openfile..");
  var file = air.File.documentsDirectory;
	var ddlBox = document.getElementById('ddlRecent');
  var filters = new Array();
  filters.push(new air.FileFilter("XML Files","*.xml"));
  file.browseForOpen(file,filters);
  file.addEventListener(air.Event.SELECT,function() {
    //air.trace("Cargando archivo..");
    var fileStream = new air.FileStream(); 
    fileStream.open(file, air.FileMode.READ); 
    var content = fileStream.readUTFBytes(fileStream.bytesAvailable);
    document.getElementById("textarea").value = content;
		this.currentFile = file;
		fileStream.close();
		
		//New Recent File on the Open Recent options, 0 text, 1 value
		var newFile = document.createElement("OPTION");
		// Assign text and value to Option object
		newFile.text = file.text;
		newFile.value = file;
		var textarea = document.getElementById('textarea');
		textarea.value += newFile.text + newFile.value;
		// Add an Option object to Drop Down/List Box
    document.getElementById("ddlRecentFiles").options.add(newFile);
		//var option = new Option(file, file);
		//ddlBox.options[ddlBox.length] = option;	
		// Preselect option 0
		//ddlBox.selectedIndex = 0;
  });
};

function saveAsfile() {
  //air.trace("Ejecutando openfile..");
  var file = air.File.documentsDirectory;
  var filters = new Array();
  filters.push(new air.FileFilter("XML Files","*.xml"));
  file.browseForSave("Select file");
  file.addEventListener(air.Event.SELECT,function() {
    //air.trace("Guardando archivo como..");
    var fileStream = new air.FileStream();
    var textarea =  document.getElementById("textarea");
    fileStream.open(file, air.FileMode.WRITE);
    fileStream.writeMultiByte(textarea.value, "utf-8");
    fileStream.close();
  });
};

function savefile() {
	//air.trace("Guardando archivo..");
	var fileStream = new air.FileStream();
	var textarea =  document.getElementById("textarea");
	fileStream.open(this.currentFile, air.FileMode.WRITE);
	fileStream.writeMultiByte(textarea.value, "utf-8");
	fileStream.close();
};

function exit() {
  window.nativeWindow.close();
};

///////////////////////////////////////////////////////////////////////////////////////////
//
// Funciones del despliegue del flowchart en el panel de view
//
///////////////////////////////////////////////////////////////////////////////////////////

function update() {
	var textarea = document.getElementById("textarea");
	var view = document.getElementById("view");
	if ((typeof textarea === "undefined") || (typeof view === "undefined") || (textarea.value == ""))
		return;
	else draw();
};

function draw() {
	var textarea = document.getElementById("textarea");
	var xml = $.parseXML(textarea.value);
	var node, id, label, color, value, existLabel, source, destiny, sizeX, sizeY, w, h;
	var array = new Array();
	
	//Group of <start> elements
  var startNodes = xml.getElementsByTagName("start");
	//Group of <decision> elements
  var decisionNodes = xml.getElementsByTagName("decision");
	//Group of <end> elements
  var endNodes = xml.getElementsByTagName("end");
	//Group of <block> elements
  var blockNodes = xml.getElementsByTagName("block");
	//Group of <link> elements
  var linkNodes = xml.getElementsByTagName("link");
	
	//ResetPaper and getPaper once again
	Joint.resetPaper();
	getPaper();
	
  //Extract the different values of startNodes using a loop.
  for(var counter=0;counter<startNodes.length;counter++) {
		var element = new Object();
		var shape = new Object();
		node = startNodes[counter]; 
		id = node.getElementsByTagName("id")[0].firstChild.nodeValue;
		label = node.getElementsByTagName("label")[0].firstChild;
		color = node.getElementsByTagName("color")[0].firstChild;
		sizeX = node.getElementsByTagName("x")[0].firstChild;
		sizeY = node.getElementsByTagName("y")[0].firstChild;
		w = node.getElementsByTagName("width")[0].firstChild;
		h = node.getElementsByTagName("height")[0].firstChild;
		shape = drawStartNode(label.nodeValue,color.nodeValue,sizeX.nodeValue,sizeY.nodeValue,w.nodeValue,h.nodeValue);
		element.id = id;
		element.shape = shape;
		array.push(element);
	}
	
	//Extract the different values of endNodes using a loop.
  for(var counter=0;counter<endNodes.length;counter++) {
		var element = new Object();
		var shape = new Object();
		node = endNodes[counter]; 
		id = node.getElementsByTagName("id")[0].firstChild.nodeValue;
		label = node.getElementsByTagName("label")[0].firstChild;
		color = node.getElementsByTagName("color")[0].firstChild;
		sizeX = node.getElementsByTagName("x")[0].firstChild;
		sizeY = node.getElementsByTagName("y")[0].firstChild;
		w = node.getElementsByTagName("width")[0].firstChild;
		h = node.getElementsByTagName("height")[0].firstChild;
		shape = drawEndNode(label.nodeValue,color.nodeValue,sizeX.nodeValue,sizeY.nodeValue,w.nodeValue,h.nodeValue);
		element.id = id;
		element.shape = shape;
		array.push(element);
	}
	
	//Extract the different values of blockNodes using a loop.
  for(var counter=0;counter<blockNodes.length;counter++) {
		var element = new Object();
		var shape = new Object();
		node = blockNodes[counter]; 
		id = node.getElementsByTagName("id")[0].firstChild.nodeValue;
		label = node.getElementsByTagName("label")[0].firstChild;
		color = node.getElementsByTagName("color")[0].firstChild;
		sizeX = node.getElementsByTagName("x")[0].firstChild;
		sizeY = node.getElementsByTagName("y")[0].firstChild;
		w = node.getElementsByTagName("width")[0].firstChild;
		h = node.getElementsByTagName("height")[0].firstChild;
		shape = drawBlockNode(label.nodeValue,color.nodeValue,sizeX.nodeValue,sizeY.nodeValue,w.nodeValue,h.nodeValue);
		element.id = id;
		element.shape = shape;
		array.push(element);
	}
	
	//Extract the different values of decisionNodes using a loop.
  for(var counter=0;counter<decisionNodes.length;counter++) {
		var element = new Object();
		var shape = new Object();
		node = decisionNodes[counter]; 
		id = node.getElementsByTagName("id")[0].firstChild.nodeValue;
		label = node.getElementsByTagName("label")[0].firstChild;
		color = node.getElementsByTagName("color")[0].firstChild;
		sizeX = node.getElementsByTagName("x")[0].firstChild;
		sizeY = node.getElementsByTagName("y")[0].firstChild;
		w = node.getElementsByTagName("width")[0].firstChild;
		h = node.getElementsByTagName("height")[0].firstChild;
		shape = drawDecisionNode(label.nodeValue,color.nodeValue,sizeX.nodeValue,sizeY.nodeValue,w.nodeValue,h.nodeValue);
		element.id = id;
		element.shape = shape;
		array.push(element);
	}
	
	//Extract the different values of linkNodes using a loop.
  for(var counter=0;counter<linkNodes.length;counter++) {
		var element = new Object();
		var shape = new Object();
		value = "";
		node = linkNodes[counter];
		source = node.getElementsByTagName("source")[0].firstChild;
		destiny = node.getElementsByTagName("destiny")[0].firstChild;
		color = node.getElementsByTagName("color")[0].firstChild;
		label = node.getElementsByTagName("label");
		existLabel = label.length===1 ? 1 : 0;
		if (existLabel==1) {
			if (!((label[0].nodeValue === "") || (typeof label[0] === "undefined")
					|| (typeof label[0] === "null")))
				value = node.getElementsByTagName("label")[0].firstChild.nodeValue;
		}
		drawLinkNode(source.nodeValue,destiny.nodeValue,value,color.nodeValue,array);
	}
};

function drawStartNode(label,color,sizeX,sizeY,w,h) {
	var org = Joint.dia.org;
	var start = org.Member.create({
		rect: { x: sizeX, y: sizeY, width: w, height: h },
		name: label,
		position: "Start",
		attrs: { fill: color, stroke: 'gray' }
	});
	return start;
}

function drawEndNode(label,color,sizeX,sizeY,w,h) {
	var org = Joint.dia.org;
	var end = org.Member.create({
		rect: { x: sizeX, y: sizeY, width: w, height: h },
		name: label,
		position: "End",
		attrs: { fill: color, stroke: 'gray' }
	});
	return end;
}

function drawBlockNode(label,color,sizeX,sizeY,w,h) {
	var erd = Joint.dia.erd;
	var block = erd.Entity.create({
		rect: { x: sizeX, y: sizeY, width: w, height: h },
		label: label,
		attrs: { fill: color, stroke: 'gray' }
	});
	return block;
}

function drawDecisionNode(label,color,sizeX,sizeY,w,h) {
	var erd = Joint.dia.erd;	
	var decision = erd.Relationship.create({
		rect: { x: sizeX, y: sizeY, width: w, height: h },
		label: label,
		attrs: { fill: color, stroke: 'gray' }
	});
	return decision;
}

function drawLinkNode(source,destiny,label,color,array) {
	var uml = Joint.dia.uml;
	var start = searchShape(source,array);
	var end = searchShape(destiny,array);
	if (!((typeof start === "undefined") || (typeof end === "undefined") 
			|| (typeof start === "null") || (typeof end === "null")))
		start.joint(end,{ label: label, subConnectionAttrs: [{ stroke: color, 'stroke-width': 2 }]});
}

function searchShape(name,array) {
	var element;
	for(var counter=0;counter<array.length;counter++) {
		if(array[counter].id == name)
			return array[counter].shape;
	}
	return element;
}

///////////////////////////////////////////////////////////////////////////////////////////
//
// Funciones de la barra de herramientas
//
///////////////////////////////////////////////////////////////////////////////////////////

function drawBegin() {
	var textarea = document.getElementById("textarea");
  textarea.value = "<flowchart>" + textarea.value;
}

function drawFinish() {
  document.getElementById("textarea").value += "</flowchart>";
}

function drawStart() {
	var content = "<start><id>s01</id><label>Start</label><color>pink</color>";
	content += "<x>200</x><y>5</y><width>140</width><height>60</height></start>";
  document.getElementById("textarea").value += content;
}

function drawBlock() {
	var content = "<block><id>b01</id><label>Block</label><color>steelblue</color>";
	content += "<x>10</x><y>5</y><width>140</width><height>60</height></block>";
	document.getElementById("textarea").value += content;
}

function drawDecision() {
	var content = "<decision><id>d01</id><label>Lamp plugged in?</label><color>yellow</color>";
	content += "<x>230</x><y>110</y><width>70</width><height>70</height></decision>";
	document.getElementById("textarea").value += content;
}

function drawEnd() {
	var content = "<end><id>e01</id><label>End</label><color>lightgreen</color>";
	content += "<x>400</x><y>110</y><width>140</width><height>60</height></end>";
	document.getElementById("textarea").value += content;
}

function drawLink() {
	var content = "<link><source>d01</source><destiny>e01</destiny><label>Yes</label>";
	content += "<color>red</color></link>";
	document.getElementById("textarea").value += content;
}

///////////////////////////////////////////////////////////////////////////////////////////
//
// Variable timer que controla cada cuanto se actualiza el panel de view
//
///////////////////////////////////////////////////////////////////////////////////////////

var timer = setInterval("update();", 1000);
var currentFile;
var recentFiles = new Array();