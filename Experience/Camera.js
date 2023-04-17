import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three"
import Experience from "./Experience";
import Room from "./World/Room";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

       this.createPerspectiveCamera();
       this.createOrthographicCamera();
       this.setOrbitControls();
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.PerspectiveCamera, this.canvas);
        this.controls.enableDamping =true;
        this.controls.enableZoom = true;
    }

    createPerspectiveCamera(){
        this.PerspectiveCamera = new THREE.PerspectiveCamera(35,
             this.sizes.aspect,
             0.1,
             1000);

        this.scene.add(this.PerspectiveCamera)
        this.PerspectiveCamera.position.z = -29;
        this.PerspectiveCamera.position.x = -14;
        this.PerspectiveCamera.position.y = 14; 
    }

    createOrthographicCamera(){
       
        this.OrthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2, 
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            50
        );

        this.OrthographicCamera.position.y = 3;
        this.OrthographicCamera.position.z = 4;
    
        this.OrthographicCamera.rotation.x = -Math.PI / 5.5;

     this.OrthographicCamera.zoom = 2;

            this.OrthographicCamera.updateProjectionMatrix();
        this.scene.add(this.OrthographicCamera);

      // this.helper = new THREE.CameraHelper(this.OrthographicCamera);
       // this.scene.add(this.helper);

        this.scene.add(this.PerspectiveCamera)

        //const size = 20;
        //const divisions = 20;

       // const gridHelper = new THREE.GridHelper(size,divisions);
        //this.scene.add(gridHelper);

     //  const axesHelper = new THREE.AxesHelper(10);
       // this.scene.add(axesHelper);
    }

    resize(){
        // Updating perspective Camera on Resize
        this.PerspectiveCamera.aspect = this.sizes.aspect
        this.PerspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera
        this.OrthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2
        this.OrthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2
        this.OrthographicCamera.top = this.sizes.frustrum/2
        this.OrthographicCamera.bottom =   -this.sizes.frustrum/2
        this.OrthographicCamera.updateProjectionMatrix();
    }

    update(){
            this.controls.update();
        /*
         this.helper.matrixWorldNeedsUpdate = true;
         this.helper.update();


          this.helper.position.copy(this.OrthographicCamera.position);
           this.helper.rotation.copy(this.OrthographicCamera.rotation);
      */      

    }
}