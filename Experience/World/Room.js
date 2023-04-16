import * as THREE from "three"
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room{
    constructor(){
        this.experience = new Experience();
       this.scene = this.experience.scene;
       
       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.actualRoom = this.room.scene;
       this.time = this.experience.time; 

       
       this.lerp ={
        current: 0,
        target: 0, 
        ease: 0.1
       };

       this.setAnimation();
       this.setModel();
       this.onMouseMove();

      
       
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = -((e.clientX - window.innerWidth / 2) * 2 ) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
            console.log(this.rotation);
        });
    }

    setAnimation(){

        this.mixer = new THREE.AnimationMixer(this.actualRoom);
       
        this.swim = this.mixer.clipAction(this.room.animations[163]);

        this.swim.play();

    console.log( this.room.animations);
    }

    setModel(){
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
           
            if(child instanceof THREE.Group){
            
            child.children.forEach((groupchild) =>{
                groupchild.castShadow = true;
                groupchild.receiveShadow = true;

            })
            }

            if(child.name === "Cube.119"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0; 
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.transmission = 1; 
                child.materail.opacity = 1;
            }

            if(child.name  == "Screen"){
                console.log("screen gets mapped")

                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                })

                
            }

        } );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
        
    }
   

   rezize(){
    
   }

   update(){
    this.lerp.current = GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
    this.mixer.update(this.time.delta * 0.0009);
   }
}