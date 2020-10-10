<template>
  <div class="hello-world-wrapper">
    <canvas ref="hello"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@Component 
export default class HelloWorld extends Vue {
  private scene: any;
  private clock: any;
  private mixer: any;
  private camera: any;
  private renderer: any;
  private publicPath: string = process.env.BASE_URL;
  private modelPath: any = `${this.publicPath}model/walking.gltf`;
  // 行走动画
  private walkAni: any;
  // 是否播放行走动画
  private beginWalkAni: boolean = false;

  mounted() {
    this.init();
    this.setRender();
    this.setLight();
    this.loadModel();
    this.setOrbitControls();
    this.axesHelp();
    this.gridHelp();
    this.walkAniController();
  }
  // 初始化--时钟，场景，相机，渲染器
  private init() {
    interface Obj {
      canvas?: any;
      antialias?: boolean;
    }
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const canvas: Obj = {
      canvas: this.$refs.hello,
      antialias: true
    };
    this.camera.position.z = 10;
    this.renderer = new THREE.WebGLRenderer(canvas);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.physicallyCorrectLights = true;
  }
  // 设置灯光
  private setLight() {
    const light = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }
  // 加载模型
  private loadModel() {
    const loader = new GLTFLoader();
    loader.load(this.modelPath, gltf => {
      gltf.scene.rotation.y = Math.PI / 2;
      this.scene.add(gltf.scene);
      this.mixer = new THREE.AnimationMixer(gltf.scene);
      this.walkAni = this.mixer.clipAction(gltf.animations[0]);
    });
  }
  // 鼠标控制器
  private setOrbitControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.update();
  }
  // 坐标轴辅助
  private axesHelp() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }
  // 坐标格辅助
  private gridHelp() {
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
  }
  // 渲染器
  private setRender() {
    if (this.beginWalkAni) {
      this.walkAni.play();
      this.scene.getChildByName("Scene").position.x += 0.03;
    }
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
    requestAnimationFrame(this.setRender);
    this.renderer.render(this.scene, this.camera);
  }
  // 行走动画的控制器
  private walkAniController() {
    document.onkeypress = e => {
      const keyNum = window.event ? e.keyCode : e.which;
      if (keyNum == 119) {
        this.beginWalkAni = true;
      }
    };
    document.onkeyup = () => {
      if (this.mixer) {
        this.beginWalkAni = false;
        this.walkAni.stop();
        this.walkAni.reset();
      }
    };
  }
}
</script>

<style scoped lang="scss">
.btn {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: red;
  width: 100px;
  height: 100px;
}
</style>
