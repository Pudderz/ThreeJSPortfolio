
const scene = new THREE.Scene();
scene.background= new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  100
);





const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);


// { alpha: true }
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled= true;
const spotlight = new THREE.SpotLight(0xffa95c, 4);
spotlight.castShadow = true;
spotlight.shadow.bias= -0.0001;
spotlight.shadow.mapSize.width= 1024*4;
spotlight.shadow.mapSize.height= 1024*4;
scene.add(spotlight);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });


camera.position.set(0,2,5)
camera.lookAt(0,0,0);





controls = new THREE.OrbitControls(camera, renderer.domElement);


 scene.add(new THREE.AxesHelper(500))
let model

new THREE.GLTFLoader().load('amongUs/scene.gltf', result=>{
    model= result.scene.children[0];
    model.position.set(0,0,0);
    model.traverse(n =>{
        if(n.isMesh){
            n.castShadow = true;
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 16;
        }
    })
    scene.add(model);
})









const animate = function () {
  requestAnimationFrame(animate);

  const time = Date.now()*0.0005;
spotlight.position.set(
    camera.position.x+10,
    camera.position.y+10,
    camera.position.z+10,
)



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



