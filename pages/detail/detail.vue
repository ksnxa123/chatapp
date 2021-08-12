<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<image class="pic2" src="../../static/images/index/left.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="ctexts">
					详细
				</view>
			</view>
			<view class="top-bar-right">
				
			</view>
		</view>
		<view class="detail-main">
			<view class="list-title">
				<view class="list-title-l">
					头像
				</view>
				<view class="list-title-c">
					<image-cropper  :src="tempFilePath" @confirm="confirm" @cancel="cancel" ></image-cropper>
					    <image :src="cropFilePath" @tap="upload"  class="meslist_img" ></image>
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list" @click="modify('签名',dataarr.sign)">
				<view class="list-title-l">
					签名
				</view>
				<view class="list-title-c" >
					{{dataarr.sign}}
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list" >
				<view class="list-title-l">
					注册
				</view>
				<view class="list-title-c">
					{{changeDate(dataarr.time)}}
				</view>
				<view class="list-title-r">

				</view>
			</view>
			<view class="list" @tap="modify('昵称',dataarr.name)">
				<view class="list-title-l">
					昵称
				</view>
				<view class="list-title-c">
					{{dataarr.name}}
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="list-title-l">
					性别
				</view>
				<view class="list-title-c">
	                <picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="list-title-l">
					生日
				</view>
				<view class="list-title-c">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list" @tap="modify('电话',dataarr.tell)">
				<view class="list-title-l">
					电话
				</view>
				<view class="list-title-c">
					{{dataarr.tell}}
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="list-title-l">
					邮箱
				</view>
				<view class="list-title-c">
					2252505073@
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="list-title-l">
					密码
				</view>
				<view class="list-title-c">
					35353535353
				</view>
				<view class="list-title-r">
					<image src="../../static/images/index/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<button type="default" class="btn1">退出应用</button>
		</view>
		<view class="modify" :style="{bottom:-+widHeight+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @click="backOne">取消</view>
				<view class="title">{{modifyTitle}}</view>
				<view class="define" @tap="modifySubmit">确定</view>
			</view>
			<view class="modify-main">
				<textarea v-model="modifyData"  class="modify-content" />
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from '@/components/ling-imgcropper/ling-imgcropper.vue'
	import myfun from "@/commons/js/myfunc.js";
	export default{
		data(){
			const currentDate = this.getDate({
			            format: true
			})
			return{
				dataarr:{
					name:'昂少',
					sign:'加油',
					time:new Date(),
					sex:'男',
					birth:'1998-3-9',
					tell:'12345678900',
					mail:'111232@qq.com'
				},
				cropFilePath:"../../static/images/img/face.jpg",
				date:currentDate,
				array:['男','女'],
				index:0,
				tempFilePath:'',
				headimg:'',
				isModify:false,
				animationData:{},
				animationData1:{},
				widHeight:"",
				modifyTitle:'',
				modifyData:''
			}
		},
		components:{ImageCropper},
		computed:{
			startDate() {
			    return this.getDate('start');
			},
			endDate() {
			    return this.getDate('end');
			}
		},
		onReady:function(){
			this.getlocal();
		},
		methods:{
			bindDateChange: function(e) {
		       this.date = e.target.value
			},
	        bindPickerChange: function(e) {
		        console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			getDate(type) {
			    const date = new Date();
				let year = date.getFullYear();
			    let month = date.getMonth() + 1;
				let day = date.getDate();
			    if (type === 'start') {
					year = year - 60;
			        } else if (type === 'end') {
			            year = year + 2;
			        }
			    month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//头像裁剪
			 upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册，相机选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = '';
				this.cropFilePath = e.detail.tempFilePath;
				this.headimg=e.detail.tempFilePath;

				uni.uploadFile({url:'后端地址上传图片接口地址',
				  filePath: this.headimg,
							name: 'file',
							fileType:'image',
								//formData:{},传递参数
							 success: (uploadFileRes) => { 
								 var backstr= uploadFileRes.data;
			//自定义操作
							 },
							 complete() {
								//console.log("this is headimg"+this.headimg)   
							 },
							 fail(e) {
								console.log("this is errormes "+e.message)  
							 }

							 });

			},
			cancel() {
				console.log('canceled');
				this.tempFilePath="";
			},
			getlocal:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
				  this.widHeight = data.height;
				  console.log(this.widHeight)
				}).exec();
			},
			modify:function(type,data){
				this.modifyTitle = type;
				this.modifyData = data;
				this.isModify = !this.isModify;
				var animation = uni.createAnimation({
					duration:300,
					timingFunction:'ease'
				})
				var animation1 = uni.createAnimation({
					duration:300,
					timingFunction:'ease'
				})
				if(this.isModify){
					animation.bottom(0).step();
					animation1.bottom(-this.widHeight).step();
				}else{
					animation.bottom(-this.widHeight).step();
					animation1.bottom(0).step();
				}
				this.animationData =animation.export()
				this.animationData1 =animation1.export()
			},
			backOne:function(){
				uni.navigateBack({
					delta:1
				})
				this.modify();
			},
			changeDate:function(date){
				return myfun.dateTime(date)
			},
			modifySubmit:function(){
				this.modify()
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss";
	.detail-main{
		padding-top: 64rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.list-title , .list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 124rpx;
			width: 100%;
			.list-title-l{
				padding-left: 32rpx;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #272832;
				line-height: 44rpx;
			}
			.list-title-c{
				padding-left: 32rpx;
				flex: 1;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: rgba(39,40,50,0.60);
				line-height: 44rpx;
				image{
					height: 104rpx;
					width: 104rpx;
				}
			}
			.list-title-r{
				padding-right: 26rpx;
				image{
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
	}
	.btn1{
		background: #FFFFFF;
		color: #FF5D5B;
	}
	.modify{
		position: fixed;
		z-index: 1002;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;
		.modify-header{
			display: flex;
			align-items: center;
			padding-top: var(--status-bar-height);
			width: 100%;
			height: 88rpx;
			background: $uni-bg-color;
			border-bottom: 1px solid $uni-border-color;
			.close{
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left: $uni-spacing-row-base;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #272832;
			}
			.title{
				flex: 1;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 40rpx;
				line-height: 56rpx;
				color: #272832;
			}
			.define{
				align-items: center;
				padding-right: $uni-spacing-row-base;
				display: flex;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #4AAAFF;
			}
		}
		.modify-main{
			margin-top: 34rpx;
			display: flex;
			justify-content: center;
			.modify-content{
				width: 654rpx;
				height: 386rpx;
				padding: 16rpx 22rpx;
				font-size: 44rpx;
				line-height: 44rpx;
				background: #F3F4F6;
				border-radius: 10px;
				border-radius: 10px;
			}
		}
	}
</style>
