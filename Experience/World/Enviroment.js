import * as THREE from "three"
import Experience from "../Experience"
import GSAP from "gsap"

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



this.sunLight.position.set(-2.5,7,3)

//const helper = new THREE.DirectionalLightHelper(this.sunLight.shadow.camera);

//this.scene.add(helper);


this.scene.add(this.sunLight);

console.log("sunlight gets added");


this.ambientLight = new THREE.AmbientLight("#ffffff",0.5); 
this.scene.add(this.ambientLight);

}  

switchTheme(theme)
{
   if(theme === "dark"){
      GSAP.to(this.sunLight.color,{
         r: 0 / 255,
         g: 0 / 255,
         b: 0 / 255,
      });

      GSAP.to(this.ambientLight.color,{
         r: 0 / 255,
         g: 0 / 255,
         b: 0 / 255,
      });
   }else{
      GSAP.to(this.sunLight.color,{
         r: 255 / 255,
         g: 255 / 255,
         b: 255 / 255,
      });

      GSAP.to(this.ambientLight.color,{
         r: 255 / 255,
         g: 255 / 255,
         b: 255 / 255,
      });
   }
}

resize(){

}

update(){


}

}