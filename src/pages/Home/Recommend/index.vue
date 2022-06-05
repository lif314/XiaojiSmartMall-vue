<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="./images/clock.png" />
            <h3>今日秒杀商品</h3>
          </div>
        </li>
<!--        <li class="banner" v-for="item in kill" :key="item.skuId" @click="">-->
<!--          <img :src="item.skuInfoTo.skuDefaultImg" alt=""/>-->
<!--        </li>-->
        <!-- 商品列表 -->
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="goods in kill" :key="goods.skuId">
              <div class="list-wrap">
                <div class="p-img">
                  <!-- 跳转到商品详情页 -->
                  <!-- 图片懒加载 -->
                  <router-link :to="`/detail/${goods.skuId}`">
                    <img v-lazy="goods.skuInfoTo.skuDefaultImg"
                    /></router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>秒杀价¥ </em>
                    <i>{{ goods.seckillPrice }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <router-link :to="`/detail/${goods.skuId}`"><span v-html="goods.skuTitle"></span></router-link>
                </div>
<!--                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      @click="addToCart(goods.skuId)"
                  >加入购物车</a
                  >
                  <a href="javascript:void(0);" class="sui-btn btn-bordered"
                  >收藏</a
                  >
                </div>-->
              </div>
            </li>
          </ul>
        </div>

<!--        <li class="banner">-->
<!--          <img src="./images/today01.png" />-->
<!--        </li>-->
<!--        <li class="banner">-->
<!--          <img src="./images/today02.png" />-->
<!--        </li>-->
<!--        <li class="banner">-->
<!--          <img src="./images/today03.png" />-->
<!--        </li>-->
<!--        <li class="banner">-->
<!--          <img src="./images/today04.png" />-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import {reqSeckill} from "@/api";

export default {
    name:'Recommend',
  data(){
      return{
        kill:[]
      }
  },
  mounted() {
    this.getSec()

  },
  methods:{
      async getSec() {
        let res=await reqSeckill()
        if(res.code===0){
          this.kill = res.data
        }

      }
  }
};
</script>

<style scoped lang='less'>
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;
    //z-index: 1000;

    .recommend {
      height: 165px;
      //background-color: #eaeaea;
      margin: 40px 0;
      display: flex;

      .clock {
        width: 16.67%;
        background-color: #5c5251;
        color: #fff;
        font-size: 18px;
        text-align: center;

        .time {
          padding: 30px 0;
        }

        h3 {
          margin: 9px 0;
          font-weight: 700;
          font-size: 18px;
          line-height: 30.06px;
        }
      }

      .banner {
        width: 15.83%;
        margin-right: 5%;
        margin-left: 5%;

        img {
          width: 100%;
          height: 100%;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      .goods-list {
        //margin: 20px 0;
        margin-top: -20px;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 33%;
            //margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 218px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}


</style>
