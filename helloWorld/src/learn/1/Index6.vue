<template>
  <canvas ref="hello"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

@Component
export default class Index1 extends Vue {
  private mounted() {
    this.init();
  }

  init() {
    // 创建一个场景
    const scene = new THREE.Scene();
    // 创建一个摄像机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 5;
    // 创建一个渲染器
    interface Obj {
      canvas?: any;
      antialias?: boolean;
    }
    const canvas: Obj = {
      canvas: this.$refs.hello,
      antialias: true
    };
    const renderer = new THREE.WebGLRenderer(canvas);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 创建一个立方体
    const box = new THREE.CircleGeometry(5, 100);
    const material = new THREE.MeshStandardMaterial();
    const cube = new THREE.Mesh(box, material);
    scene.add(cube);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const ani = function() {
      requestAnimationFrame(ani);
      renderer.render(scene, camera);
      controls.update();
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    };
    ani();
  }
}
</script>
