let scene, camera, renderer, lights, box, cone, cylinder, torus, dodecahedron, torusknot, lathe;

// set up the environment - 
// initiallize scene, camera, objects and renderer
function main() {
    // 1. create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 2. create an locate the camera + light    
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 15;
    camera.position.z = 10;

    // light
    lights = [
        ambientLight = new THREE.AmbientLight(0xffffff, 2),
        directionalLight = new THREE.DirectionalLight(0xffffff, 2),
        hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x00FF00, 2),
        pointLight = new THREE.PointLight(0xffffff, 2, 100, 2),
        spotLight = new THREE.SpotLight(0xffffff, 2, 100, 1, 1, 1)
    ];
    lights.forEach((light) => {
        light.position.set(0, 15, 50);
        scene.add(light);
        light.visible = false;
    });
    lights[document.querySelector('input[name="Light"]:checked').value].visible = true;

    document.getElementById('lightChange').addEventListener('change', function () {
        lights.forEach((light) => {
            light.visible = false;
        });
        lights[document.querySelector('input[name="Light"]:checked').value].visible = true;
    });

    // 3. create an locate the object on the scene  
    // box
    box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 'rgb(161,40,48)'
        })
    );
    scene.add(box);
    box.position.x = -3.5;
    box.position.y = 1.5;

    // cone
    cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 6),
        new THREE.MeshLambertMaterial({
            color: 'rgb(161,40,48)',
            emissive: 'rgb(0,100,0)',
            emissiveIntensity: 0.3,
            wireframe: true
        })
    );
    scene.add(cone);
    cone.position.y = 1.5;

    // cylinder
    cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1, 20),
        new THREE.MeshStandardMaterial({
            color: 'rgb(161,40,48)',
            metalness: 0.5,
            roughness: 0.5
        })
    );
    scene.add(cylinder);
    cylinder.position.x = 3.5;
    cylinder.position.y = 1.5;

    // torus
    torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.2, 20, 20),
        new THREE.MeshPhysicalMaterial({
            color: 'rgb(161,40,48)',
            metalness: 0.5,
            roughness: 0.5,
            clearcoat: 0.8
        })
    );
    scene.add(torus);
    torus.position.x = -3.5;
    torus.position.y = -0.5;

    // dodecahedron
    dodecahedron = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5),
        new THREE.MeshPhongMaterial({
            color: 'rgb(161,40,48)',
            shininess: 100,
            wireframe: true
        })
    );
    scene.add(dodecahedron);
    dodecahedron.position.y = -0.5;

    // torusknot
    torusknot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.4, 0.2, 20, 20, 2, 3),
        new THREE.MeshNormalMaterial()
    );
    scene.add(torusknot);
    torusknot.position.x = 3.5;
    torusknot.position.y = -0.5;

    // lathe
    const points = [];
    for (let i = 0; i < 10; ++i)
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 0.3 + 0.3, (i - 5) * 0.08));
    lathe = new THREE.Mesh(
        new THREE.LatheGeometry(points),
        new THREE.MeshDepthMaterial()
    );
    scene.add(lathe);
    lathe.position.y = -2;

    // 4. create the renderer     
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 100, window.innerHeight - 200);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.render(scene, camera, controls);

    //call main animation loop
    mainLoop();
}

// main animation loop - calls 50-60 in a second.
function mainLoop() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;

    torusknot.rotation.x += 0.01;
    torusknot.rotation.y += 0.01;

    lathe.rotation.x += 0.01;
    lathe.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};