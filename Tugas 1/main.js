var speed = 0.0177;
var dy = 0;

var vertexShaderText = `
    precision mediump float;

    attribute vec2 vertPosition;
    attribute vec3 vertColor;
    varying vec3 fragColor;
    
    uniform mat4 uTranslate;

    void main() {
        fragColor = vertColor;
        gl_Position = uTranslate * vec4(vertPosition, 0.0, 1.0);
    }
`;

var fragmentShaderText = `
    precision mediump float;
    
    varying vec3 fragColor;
    void main() {
        gl_FragColor = vec4(fragColor, 1.0);
    }
`;

function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var triangleVerticesleft = 
    [ // X, Y,      R, G, B
       // buku depan biru
        -0.3, 0.3,   0, 0, 0.5,
        -0.7, 0.25,   0, 0, 0.5,
        -0.7, -0.25,   0, 0, 0.5,

        -0.7, -0.25,   0, 0, 0.5,
        -0.3, -0.3,   0, 0, 0.5,
        -0.3, 0.3,   0, 0, 0.5,

        // buku depan abu
        -0.3, -0.0,   0.35, 0.35, 0.35,
        -0.7, -0.0,  0.35, 0.35, 0.35,
        -0.7, -0.17,  0.35, 0.35, 0.35,

        -0.7, -0.17,  0.35, 0.35, 0.35,
        -0.3, -0.2,  0.35, 0.35, 0.35,
        -0.3, -0.0,   0.35, 0.35, 0.35,
        
        // buku bawah abu
        -0.3, 0.3,   0.55, 0.55, 0.55,
        -0.3, -0.3,   0.55, 0.55, 0.55,
        -0.26, 0.27,   0.55, 0.55, 0.55,

        -0.26, 0.27,   0.55, 0.55, 0.55,
        -0.26, -0.27,   0.55, 0.55, 0.55,
        -0.3, -0.3,   0.55, 0.55, 0.55,

        // tulisan f
        -0.61, 0.199,   0.7, 0, 0,
        -0.59, 0.202,   0.7, 0, 0,
        -0.59, 0.104,   0.7, 0, 0,

        -0.61, 0.199,   0.7, 0, 0,
        -0.61, 0.102,   0.7, 0, 0,
        -0.59, 0.104,   0.7, 0, 0,

        -0.61, 0.199,   0.7, 0, 0,
        -0.55, 0.207,   0.7, 0, 0,
        -0.55, 0.179,   0.7, 0, 0,

        -0.61, 0.199,   0.7, 0, 0,
        -0.61, 0.176,   0.7, 0, 0,
        -0.55, 0.179,   0.7, 0, 0,

        -0.61, 0.159,   0.7, 0, 0,
        -0.55, 0.167,   0.7, 0, 0,
        -0.55, 0.139,   0.7, 0, 0,

        -0.61, 0.159,   0.7, 0, 0,
        -0.61, 0.136,   0.7, 0, 0,
        -0.55, 0.139,   0.7, 0, 0,

        // tulisan i
        -0.49, 0.22,   0.7, 0, 0,
        -0.51, 0.216,   0.7, 0, 0,
        -0.51, 0.109,   0.7, 0, 0,

        -0.49, 0.22,   0.7, 0, 0,
        -0.49, 0.11,   0.7, 0, 0,
        -0.51, 0.109,   0.7, 0, 0,

        // tulisan s
        -0.45, 0.219,   0.7, 0, 0,
        -0.39, 0.227,   0.7, 0, 0,
        -0.39, 0.199,   0.7, 0, 0,

        -0.45, 0.219,   0.7, 0, 0,
        -0.45, 0.192,   0.7, 0, 0,
        -0.39, 0.199,   0.7, 0, 0,

        -0.45, 0.174,   0.7, 0, 0,
        -0.39, 0.182,   0.7, 0, 0,
        -0.39, 0.156,   0.7, 0, 0,

        -0.45, 0.174,   0.7, 0, 0,
        -0.45, 0.149,   0.7, 0, 0,
        -0.39, 0.156,   0.7, 0, 0,

        -0.45, 0.132,   0.7, 0, 0,
        -0.39, 0.138,   0.7, 0, 0,
        -0.39, 0.115,   0.7, 0, 0,

        -0.45, 0.132,   0.7, 0, 0,
        -0.45, 0.11,   0.7, 0, 0,
        -0.39, 0.115,   0.7, 0, 0,

        -0.43, 0.22,   0.7, 0, 0,
        -0.45, 0.219,   0.7, 0, 0,
        -0.45, 0.149,   0.7, 0, 0,

        -0.43, 0.22,   0.7, 0, 0,
        -0.43, 0.15,   0.7, 0, 0,
        -0.45, 0.149,   0.7, 0, 0,

        -0.39, 0.182,   0.7, 0, 0,
        -0.41, 0.181,   0.7, 0, 0,
        -0.41, 0.114,   0.7, 0, 0,

        -0.39, 0.182,   0.7, 0, 0,
        -0.39, 0.115,   0.7, 0, 0,
        -0.41, 0.114,   0.7, 0, 0,
    ];

    var triangleVerticesright = 
    [ // X, Y,      R, G, B
        // buku depan biru
        0.28, 0.3,   0, 0, 0.5,
        0.72, 0.3,   0, 0, 0.5,
        0.75, -0.25,   0, 0, 0.5,

        0.25, -0.25,   0, 0, 0.5,
        0.75, -0.25,   0, 0, 0.5,
        0.28, 0.3,   0, 0, 0.5,

        // buku depan abu
        0.265, 0.02,   0.35, 0.35, 0.35,
        0.735, 0.02,   0.35, 0.35, 0.35,
        0.745, -0.15,   0.35, 0.35, 0.35,

        0.255, -0.15,   0.35, 0.35, 0.35,
        0.745, -0.15,   0.35, 0.35, 0.35,
        0.265, 0.02,   0.35, 0.35, 0.35,
        
        // buku bawah abu
        0.25, -0.25,   0.55, 0.55, 0.55,
        0.75, -0.25,   0.55, 0.55, 0.55,
        0.73, -0.29,   0.55, 0.55, 0.55,

        0.25, -0.25,   0.55, 0.55, 0.55,
        0.27, -0.29,   0.55, 0.55, 0.55,
        0.73, -0.29,   0.55, 0.55, 0.55,

        // tulisan f
        0.39, 0.22,   0.7, 0, 0,
        0.41, 0.22,   0.7, 0, 0,
        0.407, 0.12,   0.7, 0, 0,

        0.39, 0.22,   0.7, 0, 0,
        0.387, 0.12,   0.7, 0, 0,
        0.407, 0.12,   0.7, 0, 0,

        0.39, 0.22,   0.7, 0, 0,
        0.45, 0.22,   0.7, 0, 0,
        0.447, 0.2,   0.7, 0, 0,

        0.39, 0.22,   0.7, 0, 0,
        0.39, 0.2,   0.7, 0, 0,
        0.447, 0.2,   0.7, 0, 0,

        0.39, 0.18,   0.7, 0, 0,
        0.45, 0.18,   0.7, 0, 0,
        0.447, 0.16,   0.7, 0, 0,

        0.39, 0.18,   0.7, 0, 0,
        0.39, 0.16,   0.7, 0, 0,
        0.447, 0.16,   0.7, 0, 0,

        // tulisan i
        0.49, 0.22,   0.7, 0, 0,
        0.51, 0.22,   0.7, 0, 0,
        0.51, 0.12,   0.7, 0, 0,

        0.49, 0.22,   0.7, 0, 0,
        0.49, 0.12,   0.7, 0, 0,
        0.51, 0.12,   0.7, 0, 0,

        // tulisan s
        0.55, 0.22,   0.7, 0, 0,
        0.61, 0.22,   0.7, 0, 0,
        0.61, 0.2,   0.7, 0, 0,

        0.55, 0.22,   0.7, 0, 0,
        0.55, 0.2,   0.7, 0, 0,
        0.61, 0.2,   0.7, 0, 0,

        0.552, 0.18,   0.7, 0, 0,
        0.612, 0.18,   0.7, 0, 0,
        0.612, 0.16,   0.7, 0, 0,

        0.552, 0.18,   0.7, 0, 0,
        0.552, 0.16,   0.7, 0, 0,
        0.612, 0.16,   0.7, 0, 0,

        0.555, 0.14,   0.7, 0, 0,
        0.615, 0.14,   0.7, 0, 0,
        0.615, 0.12,   0.7, 0, 0,

        0.555, 0.14,   0.7, 0, 0,
        0.555, 0.12,   0.7, 0, 0,
        0.615, 0.12,   0.7, 0, 0,

        0.55, 0.22,   0.7, 0, 0,
        0.57, 0.22,   0.7, 0, 0,
        0.572, 0.18,   0.7, 0, 0,

        0.55, 0.22,   0.7, 0, 0,
        0.552, 0.18,   0.7, 0, 0,
        0.572, 0.18,   0.7, 0, 0,

        0.592, 0.18,   0.7, 0, 0,
        0.612, 0.18,   0.7, 0, 0,
        0.615, 0.14,   0.7, 0, 0,

        0.592, 0.18,   0.7, 0, 0,
        0.595, 0.14,   0.7, 0, 0,
        0.615, 0.14,   0.7, 0, 0,
    ];

    var triangleVertices = [...triangleVerticesleft, ...triangleVerticesright];
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT,gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT,  2 * Float32Array.BYTES_PER_ELEMENT );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    const uTranslate = gl.getUniformLocation(program, 'uTranslate');

    function render() {
        if (dy >= 0.7 || dy <= -0.7) {speed = -speed;}
		
        dy += speed;
        
		const left = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		
		const right = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, dy, 0.0, 1.0,
		];

        gl.clearColor(0.8, 0.8, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program);
        gl.uniformMatrix4fv(uTranslate, false, left);
        gl.drawArrays(gl.TRIANGLES, 0, triangleVerticesleft.length/5);

		gl.uniformMatrix4fv(uTranslate, false, right);
        gl.drawArrays(gl.TRIANGLES, triangleVerticesleft.length/5, triangleVerticesright.length/5);
            
        requestAnimationFrame(render);
    }
    render();
}
