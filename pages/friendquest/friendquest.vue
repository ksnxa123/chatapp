<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<image class="pic2" src="../../static/images/index/left.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="ctexts">
					好友请求
				</view>
			</view>
			<view class="top-bar-right">
				
			</view>
		</view>
		<view class="friendquest-main">
			<view class="request" v-for="(item,index) in requester" :key="index">
				<view class="request-top">
					<view class="reject btn">拒绝</view>
					<view class="header-img">
						<image  :src="item.imgurl" mode=""></image>
					</view>
					<view class="agree btn">同意</view>
				</view>
				<view class="request-center">
					<view class="title">{{item.name}}</view>
					<view class="time">{{changeTime(item.time)}}</view>
				</view>
				<view class="notice">
					<text>留言：</text>
					你好，想请求加为好友。谢谢你的通过。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myfunc from '../../commons/js/myfunc.js'
	export default{
		data(){
			return{
				requester:[],
			}
		},
		onLoad(){
			this.getRequest();
		},
		methods:{
			backOne:function(){
				uni.navigateBack({
					delta:1
				})
			},
			changeTime:function(date){
				return myfunc.dateTime(date)
			},
			getRequest:function(){
				this.requester = datas.friends();
				console.log(this.requester)
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss";
	.top-bar{
		background: rgba(255,255,255,0.96);
		border-bottom: 1px solid $uni-border-color;
	}
	.friendquest-main{
		padding: 88rpx $uni-spacing-col-base;
		.request{
			padding: $uni-spacing-col-base;
			margin-bottom: 100rpx;
			background: rgba(255,255,255,1);
			box-shadow: 0 24rpx 64rpx -8rpx rgba(0,0,0,0.1);
			border-radius: $uni-border-radius-base;
		}
		.request-top{
			display: flex;
			flex-direction: row;
			.btn{
				flex: none;
				text-align: center;
				width: 160rpx;
				height: 64rpx;
				background: rgba(255,93,93,0.1);
				border-radius: 40rpx;
				font-size: $uni-font-size-lg;
				line-height: 64rpx;
				background-color: $uni-color-primary;
			}
			.header-img{
				margin-top: -104rpx;
				flex: auto;
				text-align: center;
				image{
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;
					background-color: $uni-color-warning;
				}
			}
		}
		.request-center{
			text-align: center;
			.title{
				font-size: 36rpx;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 50rpx;
			}
			.time{
				font-size: $uni-font-size-sm;
				color: $uni-text-color-disable;
				line-height: 34rpx;
			}
		}
		.notice{
			padding: $uni-spacing-col-sm $uni-spacing-col-base;
			background-color: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			line-height: 40rpx;
		}
		
	}
</style>
