// alert('test')

function vertexShader() {
    return `
        uniform float time;
        uniform float distanceFromCenter;
      varying vec2 vUv; 
      varying vec3 vPosition;
      varying vec2 pixels;
      float PI = 3.141592653589793238; 
      void main() {
        vUv = (uv-vec2(0.5))*(0.8-0.2*distanceFromCenter*(2. - distanceFromCenter))+ vec2(0.5); 
        vec3 pos = position;
        pos.y+= sin(PI*uv.x)*0.01;
        pos.y += sin(time*0.3)*0.02;
        vUv.y += sin(time*0.3)*0.02;
        gl_Position = projectionMatrix * modelViewMatrix* vec4(pos,1.0); 
      }
    `
  }
function fragmentShader(){
    return `
    uniform float time;
    uniform float distanceFromCenter;
    uniform sampler2D texture1;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    float PI = 3.141592653589793238;
    void main(){
        vec4 t = texture2D(texture1, vUv);
        float bw = (t.r + t.b + t.g )/3.;
        vec4 another = vec4(bw,bw,bw,1);
        gl_FragColor = mix(another,t,distanceFromCenter);
        gl_FragColor.a = clamp(distanceFromCenter, 0.6, 1.);
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
        this.materials=[];
        this.meshes=[];
        this.groups=[];
        this.render()
        this.addResize()
        this.handleImages();
    }


    render(){
        this.time+=0.05;
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.camera.lookAt(0,0,0);
        if(this.materials){
            this.materials.forEach((mat)=>{
            mat.uniforms.time.value = this.time;
        })
        }
        
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
                distanceFromCenter:{type:'f', value:0},
                time:{type: 'f',value: 0},
                texture1:{type:'t', value:null},
                resolution: {type:'v4',value: new THREE.Vector4()},
                uvRate1:{
                    value: new THREE.Vector2(1,1)
                },
            },
            transparent:true,
            fragmentShader: fragmentShader(),
            vertexShader: vertexShader(),
        });
        this.mesh = new THREE.Mesh( this.geometry, this.material );
	    // this.scene.add( this.mesh );
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
        const group = new THREE.Group();
        let mat = this.material.clone();
        mat.uniforms.texture1.value = new THREE.Texture(img);
         mat.uniforms.texture1.value.needsUpdate = true;
        this.materials.push(mat);
        // mat.wireframe= true;
        let geo = new THREE.PlaneBufferGeometry(1.5,1,20,20)
        let mesh = new THREE.Mesh(geo,mat)
        
        console.log(mesh);
         group.add(mesh);
         this.groups.push(group);
         this.scene.add(group); 
        
         
        this.meshes.push(mesh);
        mesh.position.y = i*1.2;
        group.rotation.y= -0.3;
        group.rotation.x= -0.3;
        group.rotation.z= -0.1;
      })
      }
      
    

}





