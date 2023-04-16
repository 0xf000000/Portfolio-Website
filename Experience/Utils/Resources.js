import * as THREE from "three"
import EventEmitter from "events";
import {GLTFLoader}  from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Experience from "../Experience"

export default class Resources extends EventEmitter{

    constructor(assets){
        super();
       this.Experience = new Experience();
       this.renderer = this.Experience.Renderer;
       
       this.assets = assets;

      this.items = {};
      this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }


    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoloader = new DRACOLoader();
        this.loaders.dracoloader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoloader);

    }

    startLoading(){
            for(const asset of this.assets){
                if(asset.type === "glbModel"){
                    this.loaders.gltfLoader.load(asset.path, (file)=> {
                        this.singleAssetLoaded(asset, file);
                    });
                }else if(asset.type == "videoTexture"){
                    this.video = {}
                    this.videoTexture = {}
                    this.video[asset.name] = document.createElement("video");
                    

                    this.video[asset.name].src = asset.path;
                     this.video[asset.name].muted = true;
                    this.video[asset.name].playsInline = true;
                    this.video[asset.name].autoplay = true;
                    this.video[asset.name].loop = true;
                    this.video[asset.name].play();

                    this.videoTexture[asset.name] = new THREE.VideoTexture(
                        this.video[asset.name]);

                        this.videoTexture[asset.name].flipY = false;
                        this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                        this.videoTexture[asset.name].mageFilter = THREE.NearestFilter;
                        this.videoTexture[asset.name].generateMipmaps = false;
                         this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;
                    
                    this.singleAssetLoaded(asset,this.videoTexture[asset.name]);
                          
                }
            }
    }

    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;
        
        console.log(file);
        if(this.loaded === this.queue){
            this.emit("ready");
        }

    }
}