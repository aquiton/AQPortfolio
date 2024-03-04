var gl;

var points;

var colors = [
  vec3(1.0, 0.0, 0.0),
  vec3(0.0, 1.0, 0.0),
  vec3(1.0, 0.0, 1.0),

  vec3(1.0, 0.5, 0.0),
  vec3(0.0, 1.0, 0.5),
  vec3(0.0, 0.5, 1.0),

  vec3(1.0, 0.5, 0.5),
  vec3(0.5, 1.0, 0.5),
];

//var colors = [vec3(1.0, 0.0, 0.5), vec3(0.0, 1.0, 0.5), vec3(0.0, 0.0, 0.5)];

window.onload = function init() {
  //init the canvas
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);

  // Error checking
  if (!gl) {
    alert("WebGL unavailable");
  }

  //vertices
  var vertices = [
    vec2(0, 0),
    vec2(-0.25, 0.25),
    vec2(0.25, 0.25),
    vec2(0.5, 0),
    vec2(0.25, -0.25),
    vec2(-0.25, -0.25),
    vec2(-0.5, 0),
    vec2(-0.25, 0.25),
  ];
  //var vertices = [vec2(-1, -1), vec2(0, 0.5), vec2(1, -1)];
  // configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set its position and render it
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  // new - color
  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
}
