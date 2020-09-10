<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/img/face.jpg" class="pic"></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/images/index/logo.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="search" @click="goSearch">
					<image src="../../static/images/index/search.png" mode=""></image>
				</view>
				<view class="add">
					<image src="../../static/images/index/add.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="friends" v-for="(item,index) in friends" :key='index'>
				<view class="friend-list-l">
					<text class="tip" v-if="item.tip>0">{{item.tip}}</text>
					<image src="../../static/images/img/face.jpg"></image>
				</view>
				<view class="friend-list-r">
					<view class="top">
						<view class="name">{{item.name}}</view>
						<view class="time">{{changeTime(item.time)}}</view>			
					</view>
					<view class="content">{{item.news}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myfunc from '../../commons/js/myfunc.js'
	export default {
		data() {
			return{
				friends:[]
			}
		},
		onLoad(){
			this.getFriends()
		},
		methods: {
			changeTime:function(date){
				return myfunc.dateTime(date)
			},
			getFriends:function(){
				this.friends = datas.friends();
				console.log(this.friends)
			},
			goSearch:function(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
@import  '../../commons/css/mycss.scss';
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.top-bar{
	position: fixed;
}
.main{
	width: 100%;
	box-sizing: border-box;
	padding-top: 88rpx;
	.friends{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 96rpx;
		padding: 16rpx $uni-spacing-row-base;
		&:active{
			background-color: $uni-bg-color-hover;
		}
		.friend-list-l{
			position: relative;
			display: flex;
			align-items: center;
			.tip{
				position: absolute;
				left: 68rpx;
				top: -6rpx;
				z-index: 10;
				height: 36rpx;
				min-width: 36rpx;
				background-color: $uni-color-warning;
				border-radius: 18rpx;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
				font-size: $uni-font-size-sm;
			}
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
			}
		}
		.friend-list-r{
			display: flex;
			flex: 1;
			flex-direction: column;
			margin-left: 32rpx;
			.top{
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.name{
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
				}
				.time{
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
				}
			}
			.content{
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
}
</style>
