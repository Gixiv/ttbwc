<template>
	<view>
        <view class="list">
            <view class="order" v-for="(item,index) in items" :key="index" >
				<view @click="showPopupClick(item.id)">
					<view class="title">
					    <image v-bind:src="'../../static/'+item.type+'.png'" mode=""></image>
					    <view class="name">{{item.name}}<text>></text></view>
						<view v-if="item.status === 1" class="status">待审核</view>
						<view v-if="item.status === 2" class="status">审核失败</view>
					    <view v-if="item.status === 3" class="status">审核通过</view>
						<view v-if="item.status === 4" class="status">已完成</view>
					</view> 
					<view class="content">
					    <image v-bind:src="item.logo" mode=""></image>
					    <view class="detail">
					        <view class="name">评价编号：{{item.unumber}}</view>
					        <view class="price"><view>需付款<text>{{item.fee}}</text>元</view>下单人：{{item.user_name}}</view>
					        <view class="rule"><text>评鉴规则：</text><p class="vhtml" v-html="item.introduce"></p></view>
					        <view v-if="item.status === 1" class="btn">待审核</view>
							<view v-if="item.status === 2" class="btn">审核失败</view>
							<view v-if="item.status === 3" class="btn">审核通过</view>
							<view v-if="item.status === 4" class="btn">已完成</view>
					    </view>
					</view>
				</view>
                
            </view>
        </view>
        <view v-if="user.user_type===2" class="bottom">
            <view class="orderPrice">
                <view>共<text>{{orderNum}}</text>单</view>
                <view>合计：<text>{{orderPrice}}元</text></view>
            </view>
            <view class="pay"  @click="pay2">付款</view>
        </view>
        <view class="container" v-if="showPopup">
          <view class="box_radius1">
            <view class="title  color_black">
              <image v-bind:src="'../../static/'+detailItem.type+'.png'"></image>
              <view class="name">
                <text class="pr15">{{detailItem.name}}</text> 
                 &gt;</view>
			 <view class="pl10 flex_row_center1" @click="closeDetail">
			   <text class="pr15">X</text> 
			 </view>
            </view>
            <view class="line"></view>
            <view class="container_box">
              <view class="container_box_1 flex_row mt10 mb10">
                <image v-bind:src="detailItem.eva_image"></image>
                <view class="pl10 fz_26">
                  <view class="color_gray mb5 mt10">评鉴编号：{{detailItem.unumber}}</view>
                  <view class="color_gray mb10">报名时间：{{detailItem.created_at}}</view>
                  <view class="color_tips">实付满{{detailItem.reach_amount}}返{{detailItem.rebate_amount}}，未满则不返</view>
                </view>
              </view>
              <view class="line"></view>
              <view class="content_list flex_between1">
                <text class="content_list_title">订单平台</text>
				<view v-if="detailItem.type === 1" class="content_list_input">美团</view>
                <view v-if="detailItem.type === 2" class="content_list_input">饿了吗</view>
				
              </view>
              <view class="content_list flex_between1">
                <text class="content_list_title">上传时间</text>
                <view class="content_list_input">{{detailItem.eva_time}}</view>
              </view>
              <view class="content_list flex_between1">
                <text class="content_list_title">订单编号</text>
                <view class="content_list_input">{{detailItem.unumber}}</view>
              </view>
              <view class="content_list flex_between1">
                <text class="content_list_title">达标金额</text>
                <view class="content_list_input">{{detailItem.reach_amount}}</view>
              </view>
              <view class="content_list flex_between1">
                <text class="content_list_title">订单截图</text>
              </view>
			  <view class="images">
			  <!-- <image  v-for="(image,index) in detailItem.images"  :key="index" v-bind:src="image" :class="{'active':imageIndex.indexOf(index)>-1}" @click="changeImage(index)" mode=""></image> -->
			  <image  v-for="(image,index) in detailItem.images"  :key="index" v-bind:src="image" @click="previewImg(image)" mode=""></image>
			  </view>
<!-- 			  <view class="images" v-for="(image,index) in detailItem.images" :key="index" >
				  <image v-bind:src="image" mode=""></image>
			  </view> -->
			  <view class="content_list flex_between1">
			    <text class="content_list_title">评价截图</text>
			  </view>
			  <view class="images">
			      <!-- <image v-bind:src="detailItem.eva_image" :class="{'active':isChoose}" @click="imgScc()" mode=""></image> -->
				  <image v-bind:src="detailItem.eva_image" :class="{'active':isChoose}" @click="previewImg(detailItem.eva_image)" mode=""></image>
			  </view>
	  
			  
<!--              <view class="images">
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
                  <image src="../../static/logo.png" mode=""></image>
              </view> -->
			  
			  
			  
			  <view v-if="user.user_type===2">
				<view class="text_center fz_24 mt10 mb30">审核通过</view>
			  </view> 
			  
			  <view v-if="user.user_type===3">
				<view class="content_list flex_between1">
				  <text class="content_list_title">审核结果</text>
				  <view class="content_list_input" style="font-size: 28rpx;display: flex;padding-left: 30rpx;">
				      <radio value="1" @click="examine = 1" :checked="examine == 1" /><text style="margin-right: 30rpx;">审核通过</text>
				      <radio value="2" @click="examine = 2" :checked="examine == 2" /><text>审核不通过</text>
				  </view>
				</view>
				<view class="content_list flex_between1">
				  <text class="content_list_title" style="color: #f00;">不通过理由</text>
				  <view class="content_list_input"><input type="text" v-model="reason" /></view>
				</view>  
				<view class="">
				  <button class="l_btn_1">确定</button>
				</view>
			  </view>
			  
            </view>
          </view>
        </view>
    </view>
</template>

<script>
	const jweixin = require('jweixin-module')
	

	
	
	export default {
		data() {
			return {
				code:'',
				user:{},
				trade_no:'20210905090001978451',
				mid:'',
				
				showPopup: false,
                examine: 1,
                reason: '',
				items:[],
				user:{type:2},//2店主全显示，3审核员显示部分
				detailItem:{},
				orderNum: 0,
				orderPrice: 0,
				
				imageIndex:[],
				isChoose:false
			}
		},
		onLoad() {
			
			if(!this.GetQueryString('trade_no')){
				//alert('trade_no不存在');
				this.trade_no = '';
			}else{
				this.trade_no = this.GetQueryString('trade_no');
			}
			// if(!this.GetQueryString('mid')){
			// 	alert('mid不存在');
			// }else{
			// 	this.mid = this.GetQueryString('mid');
			// }
			
			
			
			
			
			var param_code = this.GetQueryString('code');
			if(this.code===''&&param_code==null){
				var current_url = window.location.href;
				//location.href = 'https://ttbwc.aceorc.com/api/v1/wechat/oauth?from='+current_url+'?trade_no='+this.trade_no+'&mid='+this.mid
				location.href = 'https://ttbwc.aceorc.com/api/v1/wechat/oauth?from='+current_url+'?trade_no='+this.trade_no
				
				
				return;
			}else{
				this.code = param_code;
			}
			var _this = this;
			 this.$axios.get('/api/v1/wechat/user?code='+this.code).then((response) => {
				_this.user = response.data;
				 
				 //this.$axios.get('../ttbwc2/static/response.json').then((response) => {
					 
					 
					 
				var url = '';
				 if(this.user.user_type === 3){
					 url = '/api/v1/check/orders?trade_no='+this.trade_no
				 }else{
					 url = '/api/v1/merchant/orders?trade_no='+this.trade_no
				 }
				
					
					 
				 this.$axios.get(url,{
					         headers: {
								Authorization:'Bearer '+this.user.access_token
					         }
				 }).then((response) => {
					_this.items = response.data.orders;
					console.log(_this.items.length)
					this.orderNum = _this.items.length
					_this.items.forEach((item)=>{
						this.orderPrice += parseInt(item.fee)
					})
				}).catch(function (error) {
					alert(JSON.stringify(error));
				});;
			}).catch(function (error) {
				alert(JSON.stringify(error));
			});;
			
			
			
			
			
			
			// this.ajax({
			// 	methods:'GET',
			// 	url:'https://ttbwc.aceorc.com/api/v1/wechat/user',
			// 	data:{},
			// 	success:function(res){
			// 		console.log(res)
			// 	}
			// })
			
			
			// this.$jsonp('https://ttbwc.aceorc.com/api/v1/wechat/user' , {ak: '1'}).then((res)=>{
			// 　console.log(res, 123123131)
			// })
			
			//this.data.items = response.orders;
			//this.$axios.post('https://ttbwc.aceorc.com/api/v1/wechat/user', {})
			
			
			
			
			
			
			
			
			

		},
		methods: {
			
			// pay(){
			// 	jweixin.config({
			// 	  debug: false,
			// 	  appId: 'wxf8b4f85f3a794e77',
			// 	  timestamp: 1630656507,
			// 	  nonceStr: 'LpWeZyqI9dFtfr1u',
			// 	  signature: '4068f41e466d16a75027bc821758240412de2bef',
			// 	  jsApiList: [ 'chooseWXPay']
			//   });
			//    jweixin.chooseWXPay({
			// 	// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			// 	timestamp: data.timeStamp,
			// 	// 支付签名随机串，不长于 32 位
			// 	nonceStr: data.nonceStr,
			// 	// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
			// 	package: data.package,
			// 	// 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			// 	signType: data.signType,
			// 	// 支付签名
			// 	paySign: data.paySign,
			// 	// 支付成功后的回调函数
			// 	success: function (res) {
			// 	  // res.errMsg === 'chooseWXPay:ok'方式判断前端返回,微信团队郑重提示：
			// 	  // res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠， 切记。
			// 	  if (res.errMsg === 'chooseWXPay:ok') {
			// 		that.$router.push({
			// 		  name: 'ReturnPage',
			// 		  query: {
			// 			orderNo: res.data.orderBaseinfo.orderNo
			// 		  }
			// 		})
			// 	  }
			// 	},
			// 	// 支付取消回调函数
			// 	cancel: function (res) {
			// 	  Toast('用户取消支付~')
			// 	},
			// 	// 支付失败回调函数
			// 	fail: function (res) {
			// 	  Toast('支付失败~')
			// 	}
			//   })

			// },
			pay2(){
				
				location.href = '/api/v1/wechat_pay?trade_no='+this.trade_no;
				
				// this.$axios.get('/api/v1/wechat_pay?trade_no='+this.trade_no,{
				// 	         headers: {
				// 				Authorization:'Bearer '+this.user.access_token
				// 	         }
				//  }).then((response) => {
				// 	_this.user = response.data;
				// 	console.log(response);
				// }).catch(function (error) {
				// 	alert("error_lxz"+JSON.stringify(error));
				// });
			},
			showPopupClick(orderId){
				//this.$axios.get('../ttbwc2/static/detail.json').then((response) => {
				this.$axios.get('/api/v1/merchant/orders/'+orderId,{
					         headers: {
								Authorization:'Bearer '+this.user.access_token
					         }
				 }).then((response) => {
					this.detailItem = response.data.data;
					this.showPopup = true;
					console.log(response.data)
				});
			},
			closeDetail(){
				this.showPopup = false;
			},
			getCookie(name){
				var strcookie = document.cookie;
				var arrcookie = strcookie.split("; ");
				for(var i=0;i<arrcookie.length;i++){
					var arr = arrcookie[i].split("=");
					if(arr[0]==name){
						alert(arr[1]);
						return arr[1];
					}
				}
				alert(strcookie);
				return "";
			},
			GetQueryString(name)
			{
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r!=null)return  unescape(r[2]); return null;
			},
			imgScc:function(e){
				e = e || window.event;
				if(!e.currentTarget.getAttribute('class').includes('active')){
					this.styles = 'active';
				}else{
					this.styles
				}
				this.get
				
			},
			changeImage(index){
				let arrIndex = this.imageIndex.indexOf(index);
				if(arrIndex>-1){
					this.imageIndex.splice(arrIndex,1);
				}else{
					this.imageIndex.push(index);
				}
			},
			
			//单张图片预览
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			// 预览图片多张
			previewImg_muti(index) {
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < this.imgUrlList.length; i++) {
					if (this.imgUrlList[i].videoUrl == "") {
						imgsArray.push(this.imgUrlList[i].imgUrl);
					}
				}

				// #ifdef MP
				uni.previewImage({
					current: index - 1,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
				// #endif

				// #ifndef MP
				uni.previewImage({
					current: index - 1,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
				// #endif

			},
		}
	}
</script>

<style>
	
	
	
	
    .images{margin-top: 20rpx;}
    .images>image{width: 128rpx;height: 128rpx;margin-bottom: 20rpx;margin-left: 25rpx;}
    .bottom{height: 128rpx;position: fixed;bottom: 0;left: 0;right: 0;display: flex;background-color: #FFFFFF;border-top: 1px solid rgba(0,0,102,0.1);}
    .orderPrice{height: 128rpx;flex: 1;line-height: 128rpx;display: flex;}
    .orderPrice>view{flex: 1;text-align: center;font-size: 32rpx;}
    .orderPrice>view>text{margin: 0 10rpx;color: #f00;}
    .pay{width: 180rpx;display: flex;align-items: center;justify-content: center;color: #FFFFFF;background-color: #FFD200;}
    .list{padding-bottom: 138rpx;}
    .order{background-color: #777777;margin: 15rpx 15rpx 0;border-radius: 15rpx;padding: 5rpx 30rpx 45rpx;}
    .title{height: 80rpx;display: flex;align-items: center;color: #FFFFFF;border-bottom: 1px solid rgba(255,255,255,0.6);}
    .title .name{flex: 1;line-height: 32rpx;}
    .title .name text{margin-left: 15rpx;font-size: 32rpx;}
    .title image{width: 38rpx;height: 38rpx;margin-right: 20rpx;}
    .content{margin-top: 16rpx;height: 168rpx;display: flex;position: relative;}
    .content>image{width: 168rpx;height: 168rpx;}
    .content .detail{height: 168rpx;flex: 1;overflow: hidden;color: #FFFFFF;font-size: 12rpx;margin-left: 20rpx;}
    .content .detail>view{line-height: 40rpx;}
    .content .detail .price{display: flex;align-items: center;height: 40rpx;font-size: 24rpx;padding-left: 12rpx;}
    .content .detail .price>view{background-color: #FADFD0;color: #000;margin-right: 15rpx;line-height: 32rpx;font-size: 28rpx;}
    .content .detail .price>view>text{color: #f00;margin: 0 5rpx;}
    .content .detail .rule>text{color: rgba(255,255,255,0.6);}
    .content .detail .btn{color: #FFFFFF;background-color: #00F506;position: absolute;bottom: 10rpx;right: 8rpx;padding: 0 10rpx;}
</style>
<style>
    /* pages/order_detail/order_detail.wxss */
    .container{
      height: 100vh;
      overflow-y: scroll;
      padding: 25rpx;
      box-sizing: border-box;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      background-color: #C9C6C6;
    }
    .container .box_radius1{
      margin: 0 auto;
      width: 700rpx;
      min-height: 100%;
      padding: 25rpx;
      box-sizing: border-box;
      background-color: #ffffff;
      /* box-shadow: 0px -1px 2px 2px #eeeeee inset; */
    }
    .container_title{
      font-size: 32rpx;
      font-family: PingFang SC;
    }
    .container_title image{
      width: 57rpx;
      height: 57rpx;
      border-radius: 50%;
    }
    .container_box_1 image{
      width: 143rpx;
    height: 143rpx;
    border-radius: 10rpx;
    }
    .content_list{margin-top: 20rpx;}
    .content_list_title{
      font-weight: 600;
    }
    .content_list_input>input{
        height: 60rpx;
    }
    .content_list_input{
      line-height: 60rpx;
      text-align: center;
      background-color: #eeeeee;
      flex:1;
      margin-left: 30rpx;
      border-radius: 25rpx; 
    }
    .content_list_input_order{
      background-color: #ffffff;
    }
    
    .content_list_input_order label{
      border: 1px solid;
      border-radius: 25rpx;
      height: 68rpx;
      line-height: 68rpx;
    }
    .content_list_images,.upload_imgs {
      width: 500rpx;
      margin-left: 30rpx;
      flex-wrap: wrap;
    }
    
    .content_list_images image{
      width: 100%;
    }
    .content_list_images view:nth-child(odd){
      padding-right: 10rpx;
      box-sizing: border-box;
    }
    .content_list_images view:nth-child(even){
      padding-left: 10rpx;
      box-sizing: border-box;
    }
    .upload_imgs{
      /* margin: 0 auto; */
    }
    .upload_img_1 image {
      width: 99%;
      height: 99%;
      box-sizing: border-box;
      z-index: 2;
    }
    .upload_img_1 .lin-image-picker__item{
      border-color: transparent;
    }
    .upload_img_1 .lin-image-picker__remove{
      right: 0!important;
      top: 0!important;
      z-index: 5;
    }
    .l_btn_1{
      width: 100%;
      height: 93rpx;
      line-height: 93rpx;
      background-color: #00C6FF!important;
      border-radius: 47rpx;
      margin-top: 40rpx;
      margin-bottom: 27rpx;
      color: #000000!important;
      font-size: 30rpx;
    }
    
    .bg_theme{
      background-color: #FFD101;
    }
    .bg_default{
      background-color:#F6F6F6;
    }
    .bg_btn{
    background-color: #FF4935;
    }
    .bg_zfb{
      background-color: #0096FF;
    }
    .bg_wechat{
      background-color: #29C421;
    }
    .color_zfb{
      color:#0096FF;
    }
    .color_wechat{
      color:#29C421;
    }
    .color_theme{
      color:#FED161;
    }
    .color_warning{
      color: #A8231C;
    }
    .color_tips{
      color: #e62e24;
    }
    .color_num{
      color: #FF4935;
    }
    .color_num2{
      color: #FF5C3D;
    }
    .color_black{
      color: #000000;
    }
    .color_white{
      color: #FFFFFF;
    }
    .color_gray{
      color: #808080;
    }
    .color_blue{
      color: #727F97;
    }
    .text_center{
      text-align: center;
    }
    .text_left{
      text-align: left;
    }
    .text_right{
      text-align: right;
    }
    
    .va_middle{
      vertical-align: middle;
    }
    .over_initial{
      overflow: initial;
    }
    .over_hidden{
      white-space: nowrap;
      overflow: hidden!important;
      text-overflow: ellipsis;
    }
    .line_hidden_1{
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .line_hidden_3{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .fw_400{
      font-weight: 400;
    }
    .fw_600{
      font-weight: 600;
    }
    .fz_22{
      font-size: 22rpx;
    }
    .fz_24{
      font-size: 24rpx;
    }
    .fz_26{
      font-size: 26rpx;
    }
    .fz_28{
      font-size: 28rpx;
    }
    .fz_30{
      font-size: 30rpx;
    }
    .fz_32{
      font-size: 32rpx;
    }
    .fz_34{
      font-size: 34rpx;
    }
    .fz_35{
      font-size: 35rpx;
    }
    .fz_36{
      font-size: 36rpx;
    }
    .fz_38{
      font-size: 38rpx;
    }
    .fz_40{
      font-size: 40rpx;
    }
    .fz_42{
      font-size: 42rpx;
    }
    .fz_44{
      font-size: 44rpx;
    }
    .fz_46{
      font-size: 46rpx;
    }
    .dis_none{display: none!important;}
    .flex_1{flex: 1;}
    .flex_row{
      display: flex;
      flex-direction: row;
    }
    .flex_column{
      display: flex;
      flex-direction: column;
    }
    .flex_row_center1{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .flex_row_center2{
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .flex_row_center3{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .flex_row_right{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    .flex_around1{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .flex_between1{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    /*间距*/
    .mt1{margin-top: 1rpx;}
    .mt5{margin-top: 5rpx;}
    .mt8{margin-top: 8rpx;}
    .mt10{margin-top: 10rpx;}
    .mt20{margin-top: 20rpx!important;}
    .mt24{margin-top: 24rpx;}
    .mb5{margin-bottom: 5rpx;}
    .mb10{margin-bottom: 10rpx;}
    .mb15{margin-bottom: 15rpx;}
    .mb20{margin-bottom: 20rpx;}
    .mb30{margin-bottom: 30rpx;}
    
    .mt27{margin-top: 27rpx;}
    .mt30{margin-top: 30rpx;}
    
    .ml7{margin-left: 7rpx;}
    .ml10{margin-left: 10rpx;}
    
    .mr15{margin-right: 15rpx;}
    .mr25{margin-right: 25rpx;}
    
    
    .pl5{padding-left: 5rpx;}
    .pl10{padding-left: 10rpx;}
    
    .pt10{padding-top: 10rpx;}
    .pt15{padding-top: 15rpx;}
    .pt30{padding-top: 30rpx;}
    
    .pb30{padding-bottom: 30rpx;}
    
    .pr5{padding-right: 5rpx;}
    .pr15{padding-right: 15rpx;}
    
    .p_relative{
      position: relative;
    }
    .icon_hui{
      width: 32rpx;
      height: 32rpx;
      vertical-align: middle;
      background: #FF5C3D;
      border-radius: 5rpx;
      font-size: 20rpx;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
    }
    .hui_border{
    height: 34rpx;
    line-height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    padding-left:10rpx;
    padding-right: 10rpx;
    color: #FF5C3D;
    border: 1rpx solid #FF5C3D;
    border-radius: 5rpx;
    overflow: initial;
    }
    .signup_time{
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    opacity: 0.44;
    text-align: right;
    }
    
    .box_radius1{
      border-radius: 25rpx;
      background: #FFFFFF;
      margin-top: 28rpx;
    }
    .line{
      background-color:#E3E3E3;
      height:1rpx;
      width: 100%;
    }
    /* 关闭图标 */
    .close_text{
      width: 35rpx;
      height: 35rpx;
      border: 2rpx solid #cccccc;
      border-radius: 50%;
      color: #cccccc;
    }
    .close_icon{
      font-weight: 800;
    }
    .mask{
      position: fixed;
      top: 0;
      bottom:0;
      left: 0;
      right: 0;
      background-color: #000000;
      opacity: 0.5;
      z-index: 98;
    }
    .mask_popup{
      position: fixed;
      z-index: 99;
      top: 50%;
      transform: translateY(-50%)!important;
      left: 0;
      right: 0;
    }
</style>