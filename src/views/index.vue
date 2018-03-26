<style scoped lang="scss">
  .navmenu {
    background-color: #DCDFE6
  }

  .navmenu_vertical {
    height: 100%;
    background-color: #DCDFE6;
    float: left;
  }

  .el_menu_vertical {
    margin-top: -36px;
  }

  .el_menu_vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    margin-top: -36px;
  }

  .route_icon {
    color: #fff;
  }

  .el_menu_horizontal {
    border: none;
    float: right;
  }

</style>
<template>
  <div>
    <el-container style="height:100%">
      <el-header style="background: #fff;">
        <EleHeader></EleHeader>
      </el-header>
      <TagsView v-bind:style="{ marginLeft: isCollapseSty }"></TagsView>
      <el-container style="border: 1px solid #eee;">
        <el-menu :default-active="activeMenu" class="el_menu_vertical" unique-opened :collapse="isCollapse" router background-color="#414F61"
          text-color="#fff" active-text-color="#409EFF">
          <template v-for="(route, index) in menus">
            <template v-if="route.children">
              <el-submenu :key="index" :index="route.name">
                <template slot="title">
                  <i class="iconfont route_icon" v-bind:class="[route.meta.icon]"></i>
                  <span slot="title">{{route.meta.name || route.name}}</span>
                </template>
                <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute" v-if="!cRoute.meta.hidden">
                  {{cRoute.meta.name || cRoute.name}}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :key="index" :route="route" :index="route.name">
                <i class="iconfont route_icon" v-bind:class="[route.meta.icon]"></i>
                <span slot="title">{{route.meta.name || route.name}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
        <el-main>
          <template>
            <transition name="fade" mode="out-in">
              <keep-alive :include="cachedViews">
                <ErrorPage v-if="accessPerMission"></ErrorPage>
                <router-view v-else id="main"></router-view>
              </keep-alive>
            </transition>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {
    TagsView,
    EleHeader,
    ErrorPage
  } from '../components'
  import instance from "../api";
  import CryptoJS from "crypto-js";
  import {
    modifyPassword,
    batchRemoveUser
  } from '../api/shop';

  export default {
    components: {
      TagsView,
      EleHeader,
      ErrorPage
    },
    data() {
      return {
        user: {},
        menus: [],
        isCollapse: false,
        accessPerMission: false,
        isCollapseSty: '200px'
      };
    },
    computed: {
      activeMenu: function () {
        return this.$route.name
      },
      breadcrumbs: function () {
        return (this.$route && this.$route.matched) || []
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      // accessPerMission() {
      //   return this.$store.state.perMission.accessPerMission
      // }
    },
    watch: {
      $route() {
        this.isTab()
      },
      isCollapse(curVal, oldVal) {
        if (curVal) {
          this.isCollapseSty = '65px'
        } else {
          this.isCollapseSty = '200px'
        }

      }
    },
    methods: {
      isTab() {
        instance.post(`/pay/syscore/checkPermission`, {
          code: this.$route.meta.code
        }).then((res) => {
          if (res.data.status === 200) {
            this.accessPerMission = false
          } else {
            this.accessPerMission = true
          }
        })
      },
    },
    created: function () {
      let menus = this.$parent.menuData;
      if (menus) {
        this.menus = menus;
      }
    },
    mounted() {
      this.isTab()
    }
  };

</script>
