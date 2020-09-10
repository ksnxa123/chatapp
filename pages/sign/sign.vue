<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left" @click="tologinBtn">
				<image src="../../static/images/index/left.png" class="pic2"></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/close.png" class="pic2"></image>
			</view>
		</view>
		<view class="login-logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="login-main">
			<view class="login-main-top">
				<view class="texts">
					注册
				</view>
			</view>			
			<view class="login-main-inputs">
				<view class="input-div">
					<input type="text" placeholder="请输入用户名" @blur="getUsers"  placeholder-style="color:#aaa;font-weight:400;"/>
					<view class="useremploy" v-if="useremploy">已占用</view>
					<image src="../../static/images/index/yes.png" class="yes" v-if="isusers"></image>
				</view>
				<view class="input-div">
				    <input type="text" placeholder="请输入邮箱" placeholder-style="color:#aaa;font-weight:400;" @blur="isEmail"/>					
					<view class="employ" v-if="employ">已占用</view>
					<view class="invalid" v-if="invalid">邮箱无效</view>
					<image src="../../static/images/index/yes.png" class="yes" v-if="isemail"></image>
				</view>
				<view class="input-div">
					<input :type="psw" placeholder="密码" class="psw" @blur="getPsw" placeholder-style="color:#aaa;font-weight:400;"/>
					<view class="employ" v-if="employ">密码错误</view>
					<image :src="urllooks" class="look" @click="looks"></image>
				</view>
			</view>
		</view>
		<button type="default" :class="[{submit:isok},{submit1:!isok}]" @click="testFun">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				psw:"text",
				isemail:true,
				isusers:true,
				look:false,
				invalid:false,
				employ:false,
				useremploy:false,
				email:"",
				isok:false,
				users:'',
				passwords:'',
				urllooks:'../../static/images/index/closeeye.png'
			}
		},
		methods: {
			looks:function(){
				if(this.look){
					this.psw = "password";
					this.look=!this.look;
					this.urllooks = "../../static/images/index/eye.png"
				}else{
					this.psw = 'text';
					this.look = !this.look;
					this.urllooks = "../../static/images/index/closeeye.png"
				}
			},
			isEmail:function(e){
				let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
				this.email = e.detail.value;
				if(this.email.length>0){
					if(reg.test(this.email)){
						console.log('正确');
						this.invalid = false;
					}else{
						console.log("错误");
						this.invalid = true;
					}
				}
				this.isOk();
			},
			tologinBtn:function(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			getUsers:function(e){
				this.users = e.detail.value;
				this.isOk();
				console.log(this.users)
			},
			getPsw:function(e){
				this.passwords = e.detail.value;
				this.isOk();
				console.log(this.passwords)
			},
			isOk:function(){
				if(this.isusers && this.isemail && this.passwords.length>5){
					this.isok = true;
				}else{
					this.isok = false;
				}
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

	.login-main-inputs{
		padding-top: 48rpx;
		.input-div{
			position: relative;
			input{
				height: 88rpx;
				font-family: AvenirNext-Medium;
				font-size: $uni-font-size-lg;
				color: #272832;
				line-height: 88rpx;
				font-weight: 500;
				border-bottom: 1px solid $uni-border-color;
			}
			.employ, .useremploy , .invalid{
				position: absolute;
				top: 0;
				right: 0;
				font-size: $uni-font-size-base;
				font-weight: 500;
				color: $uni-color-warning;
				line-height: 88rpx;
			}
			.yes, .look{
				position: absolute;
				top: 30rpx;
				right: 0;
				height: 32rpx;
				width: 42rpx;
			}
		}
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
.submit1{
	width: 520rpx;
	height: 96rpx;
	margin-top: 120rpx;
	background: $uni-bg-color-hover;
	box-shadow: 0 50rpx 32rpx -136rpx rgba(255,228,49,0.40);
	border-radius: 48rpx;
	font-family: PingFangSC-Medium;
	font-size: $uni-font-size-lg;
	font-weight: 500;
	color: $uni-bg-color;
	line-height: 96rpx;
}
</style>
