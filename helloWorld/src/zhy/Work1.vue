<template>
  <canvas ref="hello"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

@Component
export default class Work1 extends Vue {
  private mounted() {
    this.init();
  }

  init() {
    // 创建一个场景
    const scene = new THREE.Scene();
    // 创建一个摄像机
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 50;
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
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshStandardMaterial({ emissive: 0x4a4a4a });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    //创建一个圆环缓冲扭结几何体
    const geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
    const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    //点光源
    // const light = new THREE.PointLight(0xfffff, 1, 0);
    const light = new THREE.PointLight(0x0fff0, 1, 0);
    light.position.set(0, 50, 0);
    scene.add(light);

    //网格
    const size = 20;
    const divisions = 8;
    const gridHelper = new THREE.GridHelper(size, divisions);
    // scene.add(gridHelper);

    //坐标轴
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    //轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const ani = function() {
      requestAnimationFrame(ani);
      renderer.render(scene, camera);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    };
    ani();
  }
}


</script>
