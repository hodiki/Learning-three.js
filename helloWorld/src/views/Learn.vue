<template>
  <div class="learn-wrapper">
    <div @mouseenter="showMenu = true" @mouseleave="showMenu = false">
      <i class="el-icon-s-unfold menu-icon"></i>
      <el-menu
        default-active="1"
        class="learn-menu-style"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        v-show="showMenu"
      >
        <el-submenu index="1">
          <template slot="title">
            第一课-初识threejs
          </template>
          <el-menu-item index="1-1">
            <router-link to="/learn/1">第一个3D场景</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/learn/2">旋转动画</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link to="/learn/3">鼠标操作场景</router-link>
          </el-menu-item>
          <el-menu-item index="1-4">
            <router-link to="/learn/4">场景中插入几何体</router-link>
          </el-menu-item>
          <el-menu-item index="1-5">
            <router-link to="/learn/5">设置材质效果</router-link>
          </el-menu-item>
          <el-menu-item index="1-6">
            <router-link to="/learn/6">设置灯光效果</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Learn extends Vue {
  showMenu = false;
}
</script>

<style lang="scss" scoped>
.menu-icon {
  font-size: 40px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.learn-menu-style {
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 100%;
  z-index: 999;
}
</style>
