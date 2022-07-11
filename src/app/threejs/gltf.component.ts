import {Component, Input} from '@angular/core';
import * as THREE from 'three'
import {ThreejsComponent} from "./threejs.component";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {DataTexture} from "three/src/textures/DataTexture";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


@Component({
  selector: 'app-threejs-gltf',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.css']
})
export class GltfComponent extends ThreejsComponent {
  @Input() skybox!:string;
  @Input() gltf!:string;

  public loadGLTF() {
    new RGBELoader().load(this.skybox, this.onTextureLoad.bind(this));

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(this.gltf, this.onGLTFLoad.bind(this));
  }

  public onGLTFLoad(gltf:GLTF){
    this.scene.add(gltf.scene);

  }
  public onTextureLoad(texture:DataTexture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.background = texture;
    this.scene.environment = texture;
  }

  override ngAfterViewInit() {
    this.InitThreeJS()
    this.loadGLTF()
    this.animate()
  }
}
