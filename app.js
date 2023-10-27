var vertextShaderText =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
'   gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'void main()',
'{',
'   gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');


var InitGeo = function(){

    var canvas = document.getElementById("surface");
    var gl = canvas.getContext('webgl');

    if(!gl){
        console.log("WebGL not supportet, experimental-webgl");
        gl = canvas.getContext('experimental-webgl');
    }

    if(!gl){
        altert("Browser does not support WebGL");
    }

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create Shaders
    var vertextShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertextShader, vertextShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertextShader);
    if (!gl.getShaderParameter(vertextShader, gl.COMPILE_STATUS)) {
        console.error('ERROR comiling vertext shader!', gl.getShaderInfoLog(vertextShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR comiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertextShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validatimg program!', gl.getProgramInfoLog(program));
        return;
    }

    // create buffer
    var lineVertices =
    [
        -1.0, 0.8,
        -1.0, 0.5,
        -0.9, 0.5,
        -0.9, 0.4,
        -0.6, 0.4,
        -0.6, -0.6,
        -0.5, -0.6,
        -0.5, -0.7,
        -0.4, -0.7,
        -0.4, -1.0,
        -0.1, -1.0,
        -0.1, -0.7,
        0.2, -0.7,
        0.2, -1.0,
        0.5, -1.0,
        0.5, -0.7,
        0.6, -0.7,
        0.6, -0.6,
        0.7, -0.6,
        0.7, -0.5,
        0.8, -0.5,
        0.8, -0.4,
        0.9, -0.4,
        0.9, -0.2,
        1.0, -0.2,
        1.0, 0.0,
        0.8, 0.0,
        0.8, -0.1,
        0.7, -0.1,
        0.7, -0.2,
        0.6, -0.2,
        0.6, -0.3,
        0.5, -0.3,
        0.5, -0.1,
        0.3, -0.1,
        0.3, 0.0,
        0.2, 0.0,
        0.2, 0.1,
        -0.1, 0.1,
        -0.1, 0.0,
        -0.2, 0.0,
        -0.2, 0.7,
        -0.3, 0.7,
        -0.3, 0.9,
        -0.4, 0.9,
        -0.4, 1.0,
        -0.7, 1.0,
        -0.7, 0.9,
        -0.9, 0.9,
        -0.9, 0.8
    ];

    var lineVertextBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVertextBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        positionAttribLocation, 
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.enableVertexAttribArray(positionAttribLocation);

    // Main render
    gl.useProgram(program);
    gl.drawArrays(gl.LINE_LOOP, 0, 50);
};