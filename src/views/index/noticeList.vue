<template>
  <el-container style="height:100%">
    <el-header style="background: #fff;">
      <el-row>
        <el-col :span="6">
          <div class="top_logo">
            <img src="../../assets/images/logo4.png" />
            <span>万 鼎 科 技</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="detailsList_main">
        <div class="detailsList_main_top">平台公告</div>
        <div v-for="o in 4" :key="o" class="detailsList_main_list">
          <router-link :to="{ path: '/noticeDetails', query: { plan: o }}" target="_blank">
            <el-row>
              <el-col :span="20">
                <p>{{'列表内容 ' + o }}</p>
              </el-col>
              <el-col :span="4">
                <p class="detailsList_main_list_date">2018-8-19</p>
              </el-col>
            </el-row>
          </router-link>
        </div>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="20" class="detailsList_pager" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      page: 1,
      total:0
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    getUsers(){
      console.log(this.page);
      
    }
  }
}
</script>

<style scoped lang="scss">
  .top_logo {
    width: 180px;
    float: left;
  }

  .top_logo img {
    width: 30%;
    margin-top: 17px;
    float: left;
  }

  .top_logo span {
    font-size: 18px;
    font-weight: bolder;
    color: #284890;
    line-height: 60px;
  }

  .detailsList_main {
    border: 1px solid #DCDFE6;
    background: #fff;
    margin: 0 10%;
    .detailsList_main_top{
      height: 60px;
      background: #EBEEF5;
      line-height: 60px;
      padding-left: 15px;
      margin-bottom: 25px;
      font-size: 16px;
    }
    .detailsList_main_list{
      font-size: 16px;
      padding: 0 15px;
      border-bottom: 1px solid #DCDFE6;
      margin: 0 15px;
      a {
        color: #333;
      }
      .detailsList_main_list_date{
        color: #C0C4CC;
      }
    }
    .detailsList_pager{
      margin: 25px 0;
      text-align: center;
    }
  }

</style>
