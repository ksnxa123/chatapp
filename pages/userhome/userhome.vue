<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/index/left.png" class="pic2"></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/more.png" class="pic2" mode=""></image>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai"></view>
			<image class="bgpic" src="../../static/images/img/face.jpg" mode="aspectFill"></image>	
		</view>
		<view class="main-userhome">
			<image class="pictitle" src="../../static/images/img/face.jpg" mode=""></image>
			<image class="woman" src="../../static/images/index/woman.png" mode=""></image>
			<text class="title">{{user.name}}</text>
			<view class="nick">{{user.nick}}</view>
			<view class="content">{{user.intr}}</view>
		</view>
		<view class="bottom-btn">
			<button type="default" class="bottomBtn">加为好友</button>
		</view>
		<view class="add-faqi">
			<view class="name">
				{{user.name}}
			</view>
			<textarea :value="myname+'请求加为好友~'" maxlength="120" class="add-main" placeholder="" />
		</view>
		<view class="add-bt">
			<view class="close">
				取消
			</view>
			<view class="send">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:{
					name:"秋风",
					nick:'风之谷',
					intr:'夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。'
				}
			}
		}
	}
</script>

<style lang="scss">
	@import  '../../commons/css/mycss.scss';
	.container{
		display: flex;
		justify-content: center;
	}
	.bg{
		display: fixed;
		.bgpic{
			height: 110%;
			width: 110%;
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			opacity: 0.4;
			filter: blur(16rpx);
			z-index: -10;
		}
	}
	.top-bar{
		justify-content: space-between;
		.top-bar-right{
			.pic2{
				width: 52rpx;
				height: 12rpx;
			}
		}
	}
	.main-userhome{
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		top: 148rpx;
		.pictitle{
			margin: 0 auto;
			width: 400rpx;
			height: 400rpx;
			border: 3rpx solid #FFFFFF;
			border-radius: 24rpx;
		}
		.woman{
			height: 64rpx;
			width: 64rpx;
			background: #FF5D5B;
			border-radius: 28rpx;
			position: absolute;
			left: 396rpx;
			top: 320rpx;
		}
		.title{
			padding-top: 48rpx;
			font-family: PingFangSC-Regular;
			font-size: 52rpx;
			line-height: 74rpx;
			color: #272832;
			font-weight: 500;
			margin: 0 auto;
		}
		.nick{
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			line-height: 40rpx;
			color: #272832;
			margin: 0 auto;
		}
		.content{
			padding-top: 20rpx;
			width: 552rpx;
			height: 170rpx;
			font-family: PingFangSC-Light;
			font-size: 28rpx;
			line-height: 48rpx;
			color: #272832;
		}
	}
	.bottom-btn{
		position: fixed;
		display: flex;
		align-items: center;
		bottom: 0;
		width: 100%;
		height: 104rpx;
		background-color: #eee;
		.bottomBtn{
			margin: 0 auto;
			width: 684rpx;
			height: 80rpx;
			background:$uni-color-primary ;
			border-radius: 5rpx;
			font-size: 32rpx;
			line-height: 80rpx;
			text-align: center;
			color: #272832;
		}
	}
	.add-faqi{
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 56rpx;
		height: 1252rpx;
		background: rgba(255,255,255,1);
		border-radius: 40rpx 40rpx 0 0;
		.name{
			padding: 168rpx 0 40rpx;
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
		}
		.add-main{
			padding: 18rpx 22rpx;
			box-sizing: border-box;
			width: 100%;
			height: 420rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 44rpx;
		}
	}
</style>
