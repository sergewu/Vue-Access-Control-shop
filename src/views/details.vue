<template>
  <el-container style="height:100%">
    <el-header style="background: #fff;">
        <el-row>
          <el-col :span="6">
            <div class="top_logo">
              <img src="../assets/images/logo4.png" /> 
              <span>万 鼎 科 技</span>
            </div>
          </el-col>
        </el-row>
    </el-header>
    <el-main>
      <div class="details_main">
        <h1>新增资金账单下载API接口通知</h1>
        <span>尊敬的微信支付商户：</span>
        <p>补充一点，作为一个sbeamer，我一直是一个愿意自己享受游戏而不强求身边的人一起玩耍的人。每个人所处环境都不一样，有的朋友确实身边都是一起在steam上玩耍的人，显然我没有这样的交际环境，所以当听到别人无脑蔑视自己花钱买游戏的行为的时候自然是非常不爽的。你选择盗版我选择正版，孰对孰错先不说，在我面前用这种仿佛蔑视**一样的语气，你有什么资格。</p>
        <h2>西安万鼎科技<br>2018年3月21日</h2>
      </div>
    </el-main>
  </el-container>
</template>
<style scoped lang="scss">
.top_logo{
  width: 180px;
  float: left;
}
.top_logo img{
  width: 30%;
  margin-top: 17px;
  float: left;
}
.top_logo span{
  font-size: 18px;
  font-weight: bolder;
  color: #284890;
  line-height: 60px;
}
.details_main{
  border: 1px solid #DCDFE6;
  background: #fff;
  margin: 0 10%;
  h1{
    text-align: center;
    font-weight: inherit;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  h2{
    text-align: center;
    font-weight: inherit;
    font-size: 16px;
    text-align: right;
    line-height: 2;
    padding: 15px 35px;
  }
  p{
    font-size: 16px;
    padding: 15px 35px;
    line-height: 2;
    text-indent:50px;
  }
  span{
    font-size: 16px;
    padding: 15px 35px;
  }
}
</style>
