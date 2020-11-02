
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500
);




const cubeMaterials=[
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/elite.png'), side: THREE.FrontSide}),// Right side
    new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.DoubleSide}),// Left side
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/elite.png'), side: THREE.DoubleSide}),// Top side
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/elite.png'), side: THREE.DoubleSide}),// Bottom side
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/elite.png'), side: THREE.DoubleSide}),// Front side
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/elite.png'), side: THREE.DoubleSide}),// Back side
]



// { alpha: true }
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshFaceMaterial(cubeMaterials)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

const cube = new THREE.Mesh(geometry, material);
camera.position.set(0,0,8)
camera.lookAt(0,0,0);
   scene.add(cube);


const materialLine= new THREE.LineBasicMaterial({color: 0x0000ff})
const points = [];
points.push( new THREE.Vector3( -1, 0, 0 ) );
 points.push( new THREE.Vector3( 0, 5, 0 ) );
 points.push( new THREE.Vector3( 1, 0, 0 ) );

const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( lineGeometry, materialLine );
scene.add(line);

controls = new THREE.OrbitControls(camera, renderer.domElement);


//Ambient lighting
// const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5)
// scene.add(ambientLight);

// Point Light
const pointLight1 = new THREE.PointLight(0xFF0040, 3, 50);
scene.add(pointLight1)
const pointLight2 = new THREE.PointLight(0x00FF00, 5, 50);
 scene.add(pointLight2)
const pointLight3 = new THREE.PointLight(0x0000FF, 5, 50);
scene.add(pointLight3)
const pointLight4 = new THREE.PointLight(0x00FF00, 2, 50);
scene.add(pointLight4)

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5)
// directionalLight.position.set(0,50,50);
// scene.add(directionalLight)


// const spotlight = new THREE.Spotlight(0xFF45F6, 25)
// spotlight.position.set(0,50,50);
// scene.add(spotlight)
const animate = function () {
  requestAnimationFrame(animate);
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  const time = Date.now()*0.0005;
//    directionalLight.position.x = Math.sin(time* 0.7)*30;
//    directionalLight.position.y = Math.sin(time* 0.5)*30;
//    directionalLight.position.z = Math.sin(time* 0.3)*30;
  pointLight1.position.x = Math.sin(time* 0.7)*30;
  pointLight1.position.y = Math.sin(time* 0.5)*30;
  pointLight1.position.z = Math.sin(time* 0.3)*30;
  pointLight2.position.x = Math.sin(time* 0.7)*-30;
  pointLight2.position.y = Math.sin(time* 0.5)*-30;
  pointLight2.position.z = Math.sin(time* 0.3)*-30;
  pointLight3.position.x = Math.sin(time* 0.7)*20;
  pointLight3.position.y = Math.sin(time* 0.5)*20;
  pointLight3.position.z = Math.sin(time* 0.3)*20;
   cube.rotation.x = Math.sin(time*0.02)*30;
   cube.rotation.y = Math.sin(time*0,02)*30;
   cube.rotation.z = Math.sin(time*0.02)*30;


  renderer.render(scene, camera);
};

animate();


//changes size of canvas when browser window is resized

window.addEventListener('resize', ()=>{
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height)
    camera.aspect = width/height;
    camera.updateProjectionMatrix()
})