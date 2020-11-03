// alert('test')

function vertexShader() {
    return `
    uniform float time;
      varying vec2 vUv; 
      varying vec3 vPosition;
      varying vec2 pixels;
      float PI = 3.141592653589793238; 
      void main() {
        vUv = uv; 
        gl_Position = projectionMatrix * modelViewMatrix* vec4(position,1.0); 
      }
    `
  }
function fragmentShader(){
    return `
    uniform sampler2D texture1;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    float PI = 3.141592653589793238;
    void main(){
        vec4 t = texture2D(texture1, vUv);
        gl_FragColor = t;
    }
        
    `
}

class Sketch{
    constructor(){

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('container').appendChild( this.renderer.domElement );
    
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        this.addMesh();
        this.time= 0;
        this.render()
        this.addResize()
        this.handleImages();
    }


    render(){
        this.time++;
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.camera.lookAt(0,0,0);

        this.camera.position.set(0,0,2)
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this))
    }

    addMesh(){
        this.geometry = new THREE.PlaneBufferGeometry( 0.2, 0.2, 0.2 );
        // this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        this.material = new THREE.ShaderMaterial({
            
            side: THREE.DoubleSide,
            uniforms:{
                colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
                colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
                time:{type: 'f',value:0},
                texture1:{type:'t', value:null},
                resolutionL: {type:'v4',value: new THREE.Vector4()},
                uvRate1:{
                    value: new THREE.Vector2(1,1)
                },
            },
            fragmentShader: fragmentShader(),
            vertexShader: vertexShader(),
        });
        this.mesh = new THREE.Mesh( this.geometry, this.material );
	    this.scene.add( this.mesh );
    }


    
    addResize(){
        window.addEventListener('resize', ()=>{
            console.log('resizing')
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix()
    })}
    handleImages(){
        let images = [...document.querySelectorAll('img')];
      images.forEach((img, i)=>{
        let mat = this.material.clone();
        mat.uniforms.texture1.value = new THREE.Texture(img);
         mat.uniforms.texture1.value.needsUpdate = true;
        // mat.uniforms.texture1.value = new THREE.Texture(img);
        let geo = new THREE.PlaneBufferGeometry(1.5,1,20,20)
        let mesh = new THREE.Mesh(geo,mat)
        this.scene.add(mesh)
        mesh.position.y = i*1.2
      })
      }
      
    

}

new Sketch();



