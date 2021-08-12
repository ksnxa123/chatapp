<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/index/close.png" class="pic2"></image>
			</view>
			<view class="top-bar-right">
				<view class="texts" @click="tosignBtn">
					注册
				</view>
			</view>
		</view>
		<view class="login-logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="login-main">
			<view class="login-main-top">
				<view class="texts">
					登录
				</view>
			</view>
			<view class="login-main-welcome">
				<view class="texts">
					您好，欢迎来到XA！
				</view>
			</view>
			<view class="login-main-inputs">
				<input type="text" placeholder="用户名" @blur="getUsers" placeholder-style="color:#aaa;font-weight:400;"/>
				<input type="password" placeholder="密码"  @blur="getPsw" placeholder-style="color:#aaa;font-weight:400;"/>
			</view>
			<view v-if="getTips()" class="tips">
				{{message}}
			</view>
			<view v-else='getTips2()' class="tips">
				{{message}}
			</view>
		</view>
		<button type="default" class="submit" @click="testFun">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usersname:'',
				psw:'',
				token:'',
				message:''
			}
		},
		methods: {
			testFun:function(){
				uni.request({
					url:'http://localhost:5050/login/login',
					success(data) {
						console.log(data.data)
					},
					data:{
						account:this.usersname,
						pwd:this.psw
					},
					method:"POST",
					fail(data){
						// uni.redirectTo({
						//     url: 'pages/sign/sign'
						// });
						console.log(data)
						this.message = data.msg;
					}
				})
			},
			tosignBtn:function(){
				uni.navigateTo({
					url:"../sign/sign"
				})
			},
			getUsers:function(e){
				this.usersname = e.detail.value;
			},
			getPsw:function(e){
				this.psw = e.detail.value;
			},
			getTips:function(){
				if(this.usersname===''&&this.psw===''){
					return true
				}else{
					return false
				}
			},
			getTips2:function(){
				
			}
		}
	}
</script>

<style lang="scss">
@import  '../../commons/css/mycss.scss';
.top-bar{
	justify-content: space-between;
}
.login-logo{
	width: 100%;
	height: 257rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	image{
		width: 192rpx;
		height: 92rpx;
	}
}
.login-main{
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 $uni-spacing-row-lg;
	.login-main-top{
		height: 80rpx;
		.texts{
			font-family: PingFangSC-Medium;
			font-size: 56rpx;
			font-weight: 500;
			color: #272832;
			letter-spacing: 0;
		}
	}
	.login-main-welcome{
		height: 56rpx;
		margin-top: 14rpx;
		.texts{
			font-family: PingFangSC-Regular;
			font-size: $uni-font-size-title;
			font-weight: 500;
			line-height: 56rpx;
			color: $uni-text-color-disable;
			letter-spacing: 0;
		}
	}
	.login-main-inputs{
		padding-top: 48rpx;
		input{
			height: 88rpx;
			font-family: AvenirNext-Medium;
			font-size: $uni-font-size-lg;
			color: #272832;
			line-height: 88rpx;
			font-weight: 500;
			border-bottom: 1px solid $uni-border-color;
		}
	}
	.tips{
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
		line-height: 56rpx;
	}
}
.submit{
	width: 520rpx;
	height: 96rpx;
	margin-top: 120rpx;
	background: $uni-color-primary;
	box-shadow: 0 50rpx 32rpx -136rpx rgba(255,228,49,0.40);
	border-radius: 48rpx;
	font-family: PingFangSC-Medium;
	font-size: $uni-font-size-lg;
	font-weight: 500;
	color: $uni-text-color;
	line-height: 96rpx;
}
</style>
