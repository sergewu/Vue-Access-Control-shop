<style scoped lang="scss">
  .navmenu {
    background-color: #DCDFE6
  }

  .navmenu_vertical {
    height: 100%;
    background-color: #DCDFE6;
    float: left;
  }
  .container_elMenu{
    background-color: rgb(65, 79, 97);
  }
  .el_menu_vertical {
    margin-top: -36px;
    border: none;
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

  .top_logo {
    width: 150px;
    float: left;
  }

  .top_logo img {
    width: 30%;
    margin-top: 19px;
    float: left;
  }

  .top_logo span {
    font-size: 18px;
    font-weight: bolder;
    color: #284890;
    line-height: 60px;
  }

  .menu_icon {
    margin-top: 10px;
  }

  .menu_icon span i {
    font-size: 18px;
  }

</style>
<template>
  <div>
    <el-container style="height:100%">
      <el-header style="background: #fff;height:auto">
        <EleHeader @login="login" @logout="logout">
          <el-button type="text" @click="isCollapse=!isCollapse" class="menu_icon">
            <i class="iconfont icon-weibiaoti12" v-if="!isCollapse"></i>
            <i class="iconfont icon-weibiaoti12-copy" v-else></i>
          </el-button>
        </EleHeader>
      </el-header>
      <TagsView v-bind:style="{ paddingLeft: isCollapseSty }"></TagsView>
      <el-container>
        <div class="container_elMenu">
          <el-menu :default-active="activeMenu" class="el_menu_vertical" unique-opened :collapse="isCollapse" router background-color="#414F61" text-color="#fff" active-text-color="#409EFF">
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
        </div>
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
  import CryptoJS from "crypto-js";
  import {
    modifyPassword,
    batchRemoveUser,
    checkPermission
  } from '../api/shop';
  export default {
    components: {
      TagsView,
      EleHeader,
      ErrorPage
    },
    data() {
      return {
        isCollapse: false,
        accessPerMission: false,
        isCollapseSty: '200px'
      };
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
    computed: {
      activeMenu: function () {
        return this.$route.name
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      menus() {
        return this.$store.state.perMission.sideMenus
      }
    },
    methods: {
      isTab() {
        let para = {
          code: this.$route.meta.code
        }
        checkPermission(para).then(res=>{
          if (res.status === 200) {
            this.accessPerMission = false
          } else {
            this.accessPerMission = true
          }
        })
      },
      //退出登录
      logout: function () {
        this.$emit("logout");
      },
      //重新获取路由
      login: function (newPath) {
        this.$emit("login", newPath);
      }
    },
    created() {
      this.isTab()
    }
  };

</script>
