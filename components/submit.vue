<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image :src="toc"></image>
				</view>
				<textarea :class="{displaynone:isrecord}" auto-height="true" class="btn chatsend" @input="inputs" @focus='focus' v-model="msg" />
				<view :class="{displaynone:!isrecord}" class="record btn" @touchstart='touchstart' @touchend='touchend' @touchmove='touchmove'>按住说话</view>
				<view class="bt-img" @tap="emoji">
					<image src="../static/images/index/smile.png" mode=""></image>
				</view>
				<view class="bt-img" @tap='more'>
					<image src="../static/images/index/add2.png" mode=""></image>
				</view>
			</view>
			<view class="emoji" :class="{displaynone:!isemoji}">
				<emojiPic @emotion='emotion' :height='260'></emojiPic>
				<view class="emoji-send">
					<view class="emoji-send-det" @tap='emojiDet'>删除</view>
					<view class="emoji-send-bt" @tap='emojiSend'>发送</view>
				</view>
			</view>
			<view class="more" :class="{displaynone:!ismore}">
				<view class="more-list" @tap='sendImg("album")'>
					<image src="../static/images/index/carma.png" mode=""></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list">
					<image src="../static/images/index/carma.png" mode=""></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list" @tap='chooseLocation'>
					<image src="../static/images/index/carma.png" mode=""></image>
					<view class="more-list-title">定位</view>
				</view>
				<view class="more-list">
					<image src="../static/images/index/carma.png" mode=""></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list">
					<image src="../static/images/index/carma.png" mode=""></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list">
					<image src="../static/images/index/carma.png" mode=""></image>
					<view class="more-list-title">图片</view>
				</view>
			</view>
		</view>
		<view class="voice-bg" :class="{displaynone:voiceBg}">
			<view class="voice-bg-len">
				<view class="voice-bg-time" :style="{width:vlength/0.6+'%'}">{{vlength}}</view>
			</view>
			<view class="voice-del">上滑取消录音</view>
		</view>
	</view>
</template>

<script>
	import emojiPic from "./emoji/emoji.vue";
	const recorderManager = uni.getRecorderManager();
	export default {
		data() {
			return {
				isrecord:false,
				isemoji:false,
				ismore:false,
				msg:'',
				toc:"../../static/images/index/vodice.png",
				timer:'',
				vlength:0,
				voiceBg:true,
				pageY:0
			};
		},
		components:{
			emojiPic,
		},
		methods:{
			// 点击切换音频
			records:function(){
				this.isemoji = false;
				this.ismore = false;
				setTimeout(()=>{
					this.getlocal();
				},10);
				if(this.isrecord){
					this.isrecord = false;
					this.toc = "../../static/images/index/vodice.png";
				}else{
					this.isrecord = true;
					this.toc = "../../static/images/index/font.png";
				}
			},
			// 表情图标
			emoji:function(){
				this.isemoji = !this.isemoji;
				this.ismore = false;
				this.isrecord = false;
				this.toc = "../../static/images/index/vodice.png";
				setTimeout(()=>{
					this.getlocal();
				},10)
			},
			more:function(){
				this.ismore = !this.ismore;
				this.isemoji = false;
				this.isrecord = false;
				this.toc = "../../static/images/index/vodice.png";
				setTimeout(()=>{
					this.getlocal();
				},10)
			},
			// 表情接收
 			emotion:function(e){
				this.msg = this.msg+e;
			},
			//表情发送
			emojiSend:function(){
				if(this.msg.length>0){
					this.send(this.msg,0)
				}
			},
			emojiDet:function(){
				if(this.msg.length>0){
					this.msg = this.msg.substring(0,this.msg.length-1);
				}
			},
			//录音处理
			touchstart:function(e){
				this.pageY=e.changedTouches[0].pageY;
				let i = 1;
				this.voiceBg = false;
				this.timer = setTimeout(()=>{
					this.vlength =i; 
					i++
					console.log(i)
					if(i>60){
						clearInterval(this.timer);
						this.touchend();
					}
				},1000)
				recorderManager.start();
			},
			touchend:function(){
				console.log('结束')
				this.voiceBg = true;
				clearInterval(this.timer);
				recorderManager.stop();
				recorderManager.onStop( (res) => {
					let data = {
						voice : res.tempFilePaths,
						time : this.vlength
					}
					if(!this.voiceBg){
						this.send(data,2);
					}
					this.send(data,2);
					this.vlength = 0;
					this.voiceBg = true;
				});
			},
			touchmove:function(e){
				if(this.pageY-e.changedTouches[0].pageY>100){
					//关闭录音控件
					this.voiceBg = true;
				}
			},
			//选择定位
			chooseLocation:function(){
				uni.chooseLocation({
				    success: (res)=> {
						let data = {
							name:res.name,
							address:res.address,
							latitude:res.latitude,
							laongitude:res.longitude
						}
						this.send(data,3)
				    }
				});
			},
			focus:function(){
				this.ismore = false;
				this.isemoji = false;
				setTimeout(()=>{ },10)
			},
			getlocal:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
				  this.$emit('heights',data.height)
				}).exec();
			},
			// 文字发送
			inputs:function(e){
				var cha = e.detail.value;
				var pos = cha.indexOf('\n');
				if(pos!=-1&&cha.length>1){
					this.send(this.msg,0);
				}
			},
			send:function(msg,type){
				let data = {
					message:msg,
					types:type,
				}
				this.$emit('inputs',data);
				setTimeout(()=>{
					this.msg = '';
				},0)
			},
			//图片发送
			sendImg:function(e){
				let count = 9;
				if(e=='album'){
					count =9;
				}else{
					count =1;
				}
				uni.chooseImage({
				    count: count, 
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [e], //从相册选择
				    success:  (res) => {
						const filePaths = res.tempFilePaths;
						for(let i =0;i<filePaths.length;i++){
							this.send(filePaths[i],1)
						}
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.submit{
		background: rgba(244,244,244,0.96);
		border-top: 1px solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: env(safe-area-inset-bottom);
	}
	.displaynone{
		display: none;
	}
	.submit-chat{
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;
		image{
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}
		.btn{
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}
		.chatsend{
			line-height: 44rpx;
		}
		.record{
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
		}
	}
	.emoji{
		width: 100%;
		height: 460rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0 -1rpx 0 0 rgba(0,0,0,0.1);
		.emoji-send{
			width: 300rpx;
			height: 120rpx;
			padding-top: 24rpx;
			background-color: rgba(236,237,238,0.9);
			position: fixed;
			bottom: env(safe-area-inset-bottom);
			right: 0;
			display: flex;
			.emoji-send-bt{
				width: 120rpx;
				margin: 0 32rpx 0 20rpx;
				height: 80rpx;
				background: rgba(255,228,49,1);
				font-size: 24rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 12rpx;
			}
			.emoji-send-det{
				flex: 1;
				// margin-left: 24rpx;
				width: 120rpx;
				height: 76rpx;
				background: #fff;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 12rpx;
				image{
					width: 42rpx;
					height: 32rpx;
				}
			}
		}
	}
	.more{
		width: 100%;
		height: 436rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0 -1rpx 0 0 rgba(0,0,0,0.1);
		bottom: env(safe-area-inset-bottom);
		padding: 20rpx;
		box-sizing: border-box;
		.more-list{
			width: 25%;
			text-align: center;
			float: left;
			margin-top: 20rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: rgba(255,255,255,1);
				border-radius: 24prx;
			}
			.more-list-title{
				font-size: 24rpx;
				color: rgba(39,40,50,0.5);
				line-height: 34rpx;
			}
		}
	}
	.voice-bg{
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1001;
		.voice-bg-len{
			height: 84rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-color: rgba(255,255,255,0.2);
			border-radius: 42rpx;
			text-align: center;
		}
		.voice-bg-time{
			display: inline-block;
			min-width: 120rpx;
			width: 120rpx;
			line-height: 84rpx;
			background-color: $uni-color-primary;
			border-radius: 42rpx;
		}
		.voice-del{
			position: absolute;
			bottom: 148rpx;
			margin-bottom: env(safe-area-inset-bottom);
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: $uni-font-size-base;
		}
	}
</style>
