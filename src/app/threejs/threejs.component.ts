import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.css']
})
export class ThreejsComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry();
  private material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  })
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private render !: THREE.WebGLRenderer;
  protected scene!: THREE.Scene;
  private controls!: OrbitControls;

  constructor() {
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  ngOnInit(): void {

  }

  private onWindowResize() {
    this.camera.aspect = this.getAspectRatio()
    this.camera.updateProjectionMatrix()
    this.render.setSize(window.innerWidth, window.innerHeight)
    // this.renderScene()
  }

  protected animate() {
    requestAnimationFrame(this.animate.bind(this))

    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.render.render(this.scene, this.camera)
  }

  public InitThreeJS(){
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 0.1, 1000)
    this.camera.position.z = 2
    this.render = new THREE.WebGLRenderer({canvas: this.canvas})
    this.render.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.controls = new OrbitControls(this.camera, this.render.domElement)
  }

  ngAfterViewInit(): void {
    this.InitThreeJS()
    this.scene.add(this.cube)
    this.animate()
  }
}
