<!DOCTYPE html>
<html>
<head>
<title>WebGL</title>
<meta charset="utf-8" />
</head>
<body>
<canvas id="canvas3D" width="400" height="300">��� ������� �� ������������ ������� canvas</canvas>
<script id="shader-fs" type="x-shader/x-fragment">
varying highp vec4 vColor;
  void main(void) {
    gl_FragColor = vColor;
  }
</script>
<script id="shader-vs" type="x-shader/x-vertex">
attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
varying highp vec4 vColor;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
    vColor = vec4(aVertexColor, 1.0);
}
</script>
<script type="text/javascript">
var gl;
var shaderProgram;
var vertexBuffer; // ����� ������
var colorBuffer; //����� ������
// ��������� ��������
function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
 
    shaderProgram = gl.createProgram();
 
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
 
    gl.linkProgram(shaderProgram);
      
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("�� ������� ���������� �������");
    }
      
    gl.useProgram(shaderProgram);
 
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}
// ������� �������� �������
function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;
 
    var shader = gl.createShader(type);
     
    gl.shaderSource(shader, source);
 
    gl.compileShader(shader);
   
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("������ ���������� �������: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);   
        return null;
    }
    return shader;  
}
 // ��������� ������� ������ � ��������
function initBuffers() {
 
var vertices = [
         0.0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
         0.5, -0.5,  0.0
  ];
  // ��������� ������ ������
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  vertexBuffer.itemSize = 3;
  vertexBuffer.numberOfItems = 3;
  var �olors = [
        1.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(�olors), gl.STATIC_DRAW);
}
 // ���������
function draw() {    
     
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
     
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
 
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
     
    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
  
window.onload=function(){
 
    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}
   
      if (!gl) {
        alert("��� ������� �� ������������ WebGL");
      }
    if(gl){
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
         
        initShaders();
 
        initBuffers();
 
        draw();     
    }
}
</script>
</body>
</html>