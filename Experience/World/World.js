
import Experience from "../Experience";

import Room from "./Room";
import Enviroment from "./Enviroment";
import Controls from "./Controls";
import Floor from "./Floor";

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;
        this.resources.on("ready",() => {
            this.Enviroment = new Enviroment();
            this.room = new Room();
            this.controls = new Controls();
            this.floor = new Floor();
        });

        this.theme.on("switch", (theme) =>{
            this.switchTheme(theme);
        })
          
    }

    switchTheme(theme){
        if(this.Enviroment){
            this.Enviroment.switchTheme(theme);
        }

    }
   

   rezize(){
    
   }

   update(){
    if(this.room){
        this.room.update();
    }
    if(this.controls){
        this.controls.update();
    }
   }
}