import * as THREE from "three"
import Experience from "../Experience"
import GSAP from "gsap"
import GUI from "lil-gui";

export default class Enviroment{
constructor(){
   this.Experience = new Experience(); 
   this.scene = this.Experience.scene;
   this.resources = this.Experience.resources;

   //this.gui = new GUI({ container: document.querySelector(".hero-main")} );
   this.obj = {
     colorObj:{ r:0, g: 0, b: 0},
     intensity: 3,
   };


   this.setSunlight();
  // this.setGUI();
}

setGUI(){
   this.gui.addColor(this.obj, "colorObj").onChange(() =>{
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      console.log(this.obj.colorObj);
   })
   this.gui.add(this.obj, "intensity", 0,10).onChange(()=>{
      this.sunLight.intensity = this.obj.intensity;
      this.sunLight.ambientLight = this.obj.intensity;
   })
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
         r: 0.15294117647058825,
         g: 0.23137254901960785,
         b: 0.6,
      });

      GSAP.to(this.ambientLight.color,{
         r: 0.15294117647058825,
          g: 0.23137254901960785,
           b: 0.6
      });

      GSAP.to(this.sunLight, {
         intensity: 0.17,
      });
      GSAP.to(this.ambientLight, {
         intensity: 0.17,
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

      GSAP.to(this.sunLight, {
         intensity: 1,
      });
      GSAP.to(this.ambientLight, {
         intensity: 1,
      });
   }
}

resize(){

}

update(){


}

}