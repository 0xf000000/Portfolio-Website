import * as THREE from "three"
import Experience from "../Experience"

export default class Enviroment{
constructor(){
   this.Experience = new Experience(); 
   this.scene = this.Experience.scene;

   this.resources = this.Experience.resources;

   this.setSunlight();
}

setSunlight(){
this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
this.sunLight.castShadow = true;
this.sunLight.shadow.camera.far = 20; 
this.sunLight.shadow.mapSize.set(2048,2048);
this.sunLight.shadow.normalBias = 0.05;



this.sunLight.position.set(2.5,7,-3)

//const helper = new THREE.DirectionalLightHelper(this.sunLight.shadow.camera);

//this.scene.add(helper);


this.scene.add(this.sunLight);

console.log("sunlight gets added");


this.ambientLight = new THREE.AmbientLight("#ffffff",0.5); 
this.scene.add(this.ambientLight);

}  


resize(){

}

update(){


}

}