
const scene = new THREE.Scene();
// scene.background= new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  100
);





const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);


// { alpha: true }
const renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled= true;

// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
camera.lookAt(0,0,0);

camera.position.set(3,0,10)


var loader = new THREE.TextureLoader();

// Load an image file into a custom material
var material = new THREE.MeshLambertMaterial({
  map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry = new THREE.PlaneGeometry(10, 10*.75);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(5,0,0)

// add the image to the scene
scene.add(mesh);

const mesh2= new THREE.Mesh(geometry, material)
mesh2.position.set(5, -10,0)
scene.add(mesh2)
const mesh3= new THREE.Mesh(geometry, material)
mesh3.position.set(5, -20,0)
scene.add(mesh3)
const mesh4= new THREE.Mesh(geometry, material)
mesh4.position.set(5, 10,0)
scene.add(mesh4)
/**
* Lights
**/

// Add a point light with #fff color, .7 intensity, and 0 distance
var light = new THREE.PointLight( 0xffffff, 1, 10 );

// Specify the light's position
light.position.set(1, 1, 100 );

// Add the light to the scene
scene.add(light)
//  controls = new THREE.OrbitControls(camera, renderer.domElement);


 scene.add(new THREE.AxesHelper(500))


  var tilt = Math.PI / 30;
  camera.rotation.order = 'YXZ';
const animate = function () {
  requestAnimationFrame(animate);

  const time = Date.now()*0.0005;
  // controls.update();
    camera.rotation.z = 0.02;
  renderer.render(scene, camera);
  
};

animate();

gsap.from("canvas",{opacity:0, duration:1})
//changes size of canvas when browser window is resized



camera.updateProjectionMatrix()
window.addEventListener('resize', ()=>{
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height)
    camera.aspect = width/height;
    camera.updateProjectionMatrix()
    // mesh.scale.x -= 0.001; // SCALE
    // mesh.scale.y -= 0.001; // SCALE
    // mesh.scale.z -= 0.001;
})

let scrollBefore = window.scrollY
let cameraPos = camera.position.y

window.addEventListener('mousewheel',function(event){
    console.log(event.originalEvent)
    if (event.deltaY >= 0) {
        console.log('Scroll up');
        // camera.position.y += 2.5;
        if(cameraPos<10){
            cameraPos+=5;
        }
        const goingUp= gsap.to(camera.position,{ duration:0.5,y:cameraPos,onUpdate:function(){
            camera.updateProjectionMatrix();
            console.log("play");
          },onComplete:function(){
              cameraPos = camera.position.y;
            console.log("complete");
          },ease:"ease"
          });
        camera.updateProjectionMatrix()
    }
    else {
        console.log('Scroll down');
        // camera.position.y -= 2.5;
        if(cameraPos>-20){
            cameraPos-=5;
        }
        gsap.to(camera.position,{ duration:0.5,y:cameraPos,onUpdate:function(){
            camera.updateProjectionMatrix();
            console.log("play");
          },onComplete:function(){
            cameraPos = camera.position.y;
            console.log("complete");
          },ease:"ease"
          });
    }
    });
// ToDo Make this smooth
//     window.addEventListener('click', ()=>{
//          camera.position.set(5,camera.position.y,10)
//          camera.lookAt(5,camera.position.y,0)
       
//          camera.updateProjectionMatrix();
//     })
//     window.addEventListener('keydown', ()=>{
//         camera.position.set(3,camera.position.y,10)
//         camera.lookAt(0,camera.position.y,0)
      
//         camera.updateProjectionMatrix();
//    })