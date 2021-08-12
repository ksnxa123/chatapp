<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image class="pic2" src="../../static/images/index/left.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="ctexts">
					开心就好
				</view>
			</view>
			<view class="top-bar-right">
				<image class="pic" src="../../static/images/img/face.jpg" mode=""></image>
			</view>
		</view>
		<scroll-view class="chat" :scroll-into-view='scrollToView'	 scroll-y="true" scroll-with-animation="swan" @scrolltoupper='nextPage'>
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="loading" :class="{displaynone:isloading}">
					<image src="../../static/images/index/loading.gif" class="loading-img" :animation="animationData"></image>
				</view>
				<view class="chat-list" v-for="(item,index) in msgs" :key="index" :id="'msg'+item.tip">
					<view class="chat-time" v-if="item.time!=''">{{changeTime(item.time)}}</view>
					<view class="msg-m msg-l" v-if="item.id!='b'">
						<image class="user-img" :src="item.imgurl" mode=""></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="lookpic(item.message)"></image>
						</view>
						<view class="message" v-if="item.types==2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}" @tap="playVoice(item.message.voice)">
								{{item.message.time}}"
								<image src="../../static/images/index/more.png" class="voice-img" mode=""></image>
							</view>
						</view>
						<!-- 位置调用 -->
						<view class="message" v-if="item.types==3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<map class="map" :latitude="item.message.latitude" :longitude="item.message.longitude" :markers="covers(item.message)"></map>
							</view>
						</view>
					</view>
					<view class="msg-m msg-r" v-if="item.id =='b'">
						<image class="user-img" :src="item.imgurl" mode=""></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="lookpic(item.message)"></image>
						</view>
						<view class="message" v-if="item.types==2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}"  @tap="playVoice(item.message.voice)">
								{{item.message.time}}"
								<image src="../../static/images/index/more.png" class="voice-img" mode=""></image>
							</view>
						</view>
						<view class="message" v-if="item.types==3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<map class="map" :latitude="item.message.latitude" :longitude="item.message.longitude" :markers="covers(item.message)"></map>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @inputs='inputs' @heights='heights'></submit>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import myfunc from '../../commons/js/myfunc.js';
	import submit from '../../components/submit.vue';
	
	const innerAudioContext = uni.createInnerAudioContext();
	export default{
		data(){
			return{
				msgs:[],
				imgMsg:[],
				oldTime:new Date(),
				inputh:'60',
				scrollToView:'',
				animationData: {}, 
				nowpage:0,
				loading:'',
				isloading:true,
				swan:true,
				bloading:true
			}
		},
		onLoad:function(){
			this.getMsg(this.nowpage);
			this.nextPage();
		},
		components:{
			submit
		},
		methods:{
			backOne:function(){
				uni.navigateBack({
					delta:1
				})
			},
			changeTime:function(date){
				return myfunc.dateTime1(date);
			},
		    nextPage: function(){
				
				if(this.nowpage>0&&this.bloading){
				this.isloading = false;
				 //禁止重复加载
				 this.bloading = false;
			     var animation = uni.createAnimation({
			       duration: 1000,
			         timingFunction: 'step-start',
			     })
			     		   
			     this.animation = animation
			     let i = 1;
			     let aaa= setInterval(function() {
			       animation.rotate(i+30).step()
			       this.animationData = animation.export()
				 i++;
				 if(i>20){
					 this.getMsg(this.nowpage);
				 }
			     }.bind(this), 100)
				}
		     },
			//播放音频
			playVoice:function(e){
				innerAudioContext.src = e;
				innerAudioContext.play();
			},
			// 接收输入内容
			inputs:function(e){
				this.swan =true;
				let len = this.msgs.length;
				let nowTime = new Date();
				let t = myfunc.spaceTime(this.oldTime,nowTime);
				if(t){
					this.oldTime = t;
				}
				nowTime = t;
				let data = {
					id:'a',
					imgurl:'../../static/images/img/face.jpg',
					message:e.message,
					types:e.types,
					time:nowTime,
					tip:len,
				}
				this.msgs.push(data);
				this.$nextTick(function(){
					this.scrollToView = 'msg'+len;
				})
				if(e.types==1){
					this.imgMsg.push(e.message);
				}
			},
			heights:function(e){
				this.inputh = e;
				this.goBottom();
			},
			// 滚动到底部
			goBottom:function(){
				this.swan = true;
				this.scrollToView = '';
				this.$nextTick(function(){
					let len = this.msgs.length-1;
					this.scrollToView = 'msg'+this.msgs[len].tip;
				})
			},
			// 获取聊天数据
			getMsg:function(page){
				let msg = datas.message();
				let maxpages = msg.length;
				if(msg.length>(page+1)*10){
					maxpages = (page+1)*10;
					this.nowpage++;
				}else{
					this.nowpage = -1;
				}
				for(var i = page*10;i<maxpages;i++){
					msg[i].imgurl = '../../static/images/img/'+msg[i].imgurl;
					//间隔时间
					if(i<msg.length-1){
						let t = myfunc.spaceTime(this.oldTime,msg[i].time);
						if(t){
							this.oldTime = t;
						}
						msg[i].time = t;
					}
                    //补充图片地址
					if(msg[i].types == 1){	
						msg[i].message='../../static/images/img/'+msg[i].message;
						this.imgMsg.unshift(msg[i].message)
					}
					this.msgs.unshift(msg[i]);
				}
				this.nowpage++;
				this.$nextTick(function(){
					this.swan =false;
					this.scrollToView = 'msg'+this.msgs[maxpages-page*10-1].tip;
				})
				clearInterval(this.loading);
				this.isloading = true;
				
				this.bloading = true;
			},
			//地图定位
			covers:function(e){
				let map =[{
					latitude:e.latitude,
					longitude:e.longitude,
					iconPath:'../../static/images/img/face.jpg'
				}]
				return (map);
			},
			//导航
			openLocation:function(e){
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name:e.name,
					address:e.address,
					success: function () {
						console.log('success');
					}
				});
			},
			lookpic:function(e){
				 // 预览图片
				 let index = 0;
				 for(let i = 0;i<this.imgMsg.length;i++){
					 if(this.imgMsg[i]==e){
						 index=i;
					 }
				 }
				uni.previewImage({
					urls: this.imgMsg,
					current:index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import  '../../commons/css/mycss.scss';
	page{
		height: 100%;
	}
	.container{
		height: 100%;
		background: rgba(244,244,244,1);
	}
	.top-bar{
		background: rgba(244,244,244,0.96);
		border-bottom: 1px solid $uni-border-color;	
		position: fixed;
	}
	.displaynone{
		display: none;
	}
	.chat{
		height: 100%;
		.chat-main{
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 50rpx;
			display: flex;
			flex-direction: column;
		}
		.loading{
			text-align: center;
			.loading-img{
				width: 60rpx;
				height: 60rpx;
			}
		}
		.chat-list{
			.chat-time{
				font-size: $uni-font-size-base;
				color: rgba(39,40,50,0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-m{
				display: flex;
				padding: 20rpx 0;
				.user-img{
					flex: none;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}
				.message{
					flex: none;
					max-width: 480rpx;
				}
				.msg-text{
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					line-height: 44rpx;
					padding: 16rpx 24rpx;
				}
				.msg-img{
					max-width: 400rpx;
					border-radius: $uni-border-radius-base;
				}
				.msg-map{
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;
					.map-name{
						font-size: $uni-font-size-lg;
						color: $uni-text-color;
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.map-address{
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
						padding: 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.map{
						width: 464rpx;
						height: 180rpx;
					}
				}
				.voice{
					min-width: 80rpx;
					max-width: 400rpx;
				}
				.voice-img{
					width: 28rpx;
					height: 36rpx;
				}
				
			}
			.msg-l{
				flex-direction: row;
				.msg-text{
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0 20rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-left: 16rpx;
				}
				.msg-map{
					margin-left: 16rpx;
					border-radius: 0 20rpx 20rpx 20rpx;
				}
				.voice{
					text-align: right;
				}
				.voice-img{
					float: left;
					transform: rotate(180edg);
					width: 28rpx;
					height: 36rpx;
					padding-bottom: 4rpx;
				}
			}
			.msg-r{
				flex-direction: row-reverse;
				.msg-text{
					margin-right: 16rpx;
					background-color: #fff260;
					border-radius: 20rpx 0 20rpx 20rpx;
				}
				.msg-img{
					margin-right: 16rpx;
				}
				.msg-map{
					margin-right: 16rpx;
					border-radius: 20rpx 0 20rpx 20rpx;
				}
				.voice{
					text-align: left;
				}
				.voice-img{
					float: right;
					width: 28rpx;
					height: 36rpx;
					padding-top: 4rpx;
				}
			}
		}
	}
</style>
