<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<input type="search" placeholder="搜索群/用户" placeholder-style="" class="search" @input="search" />
				<image src="../../static/images/index/search.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="texts" @click="backindex">
					取消
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-user">
				<view class="main-title">
					用户
				</view>
				<view class="main-show" v-for="(item,index) in userarr" :key="index">
					<navigator url="../userhome/userhome?id=aaa" hover-class="none" class="main-show-l">
						<image :src="item.imgurl" mode=""></image>
					</navigator>
					<view class="main-show-c" v-html="item.name">

					</view>
					<view class="main-show-r news" v-if="item.tip==1">
						发信息
					</view>
					<view class="main-show-r add" v-if="item.tip==0">
						加好友
					</view>
				</view>
				<view class="main-show">
					<view class="main-show-l">
						<image src="../../static/images/img/face.jpg" mode=""></image>
					</view>
					<view class="main-show-c">
						谢少
					</view>
					<view class="main-show-r add">
						加好友
					</view>
				</view>
			</view>
			<view class="main-user main-qun">
					<view class="main-title">
						群主
					</view>
					<view class="main-show">
						<view class="main-show-l">
							<image src="../../static/images/img/face.jpg" mode=""></image>
						</view>
						<view class="main-show-c">
							昂少
						</view>
						<view class="main-show-r news">
							发信息
						</view>
					</view>
					<view class="main-show">
						<view class="main-show-l">
							<image src="../../static/images/img/face.jpg" mode=""></image>
						</view>
						<view class="main-show-c">
							谢少
						</view>
						<view class="main-show-r add">
							加好友
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	export default{
		data(){
			return{
				userarr:[]
			}
		},
		methods:{
			search:function(e){
				this.userarr = [];
				let searchval = e.detail.value;
				if(searchval.length>0){
					this.searchUser(searchval);
				}
			},
			searchUser:function(e){
				let arr = datas.friends();
				let exp = eval('/'+e+"/g");
				for(let i = 0;i<arr.length;i++){
					if(arr[i].name.search(e) !=-1){
						this.isFriend(arr[i]);
						arr[i].name=arr[i].name.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>")
						this.userarr.push(arr[i]);
					}
				}
				console.log(this.userarr)
			},
			isFriend:function(e){
				let tip =0;
				let arr = datas.isFriend();
				for(let i = 0;i<arr.length;i++){
					if(arr[i].friend==e.id){
						tip =1;
					}
				}
				e.tip = tip;
				console.log(e.tip)
			},
			backindex:function(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
@import "../../commons/css/mycss.scss";
.top-bar{
	justify-content: space-between;
	.top-bar-left{
		padding: 0 10rpx 0 22rpx;
		width: 600rpx;
		position: relative;
		.search{
			padding: 0 60rpx 0 10rpx;
			height: 60rpx;
			width: 100%;
			background: #F3F4F6;
			font-weight:400;
			border-radius: 10rpx;
		}
		image{
			position: absolute;
			right: 0;
			margin-right: 20rpx;
			height: 40rpx;
			width: 40rpx;
		}
	}
}
.main{
	padding-top: 34rpx;
	padding-left: 32rpx;
	padding-right: 32rpx;
	.main-title{
		font-family: PingFangSC-Semibold;
		font-size: 22px;
		color: #272832;
		letter-spacing: -0.75px;
	}
	.main-show{
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		.main-show-l{
			image{
				height: 80rpx;
				width: 80rpx;
			}
		}
		.main-show-c{
			flex: 1;
			padding-left: 32rpx;
			font-family: PingFangSC-Regular;
			font-size: 36rpx;
			color: #272832;
			letter-spacing: -0.62px;
			line-height: 36rpx;
		}
		.main-show-r{
			height: 48rpx;
			width: 120rpx;
			border-radius: 24rpx;
			border-radius: 24rpx;
			font-family: PingFangSC-Regular;
			font-size: $uni-font-size-sm;
			color: #272832;
			letter-spacing: -0.41px;
			line-height: 48rpx;
			text-align: center;
		}
	}
}
.main-qun{
	padding-top: 40rpx;
}
.add{
	background: rgba(74,170,255,0.10);
}
.news{
	background: $uni-color-primary;
}
</style>