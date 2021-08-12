<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				<view class="ltexts">
					取消
				</view>
			</view>
			<view class="top-bar-center">
				<view class="ctexts">
					创建群聊
				</view>
			</view>
			<view class="top-bar-right">
				<view class="rtexts">
					确定
				</view>
			</view>
		</view>
		<view class="xiugai-main">
			<view class="xiugai-texts">
				群主名称群
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
@import  '../../commons/css/mycss.scss';
.rtexts{
	color: #4AAAFF;;
}
.xiugai-main{
	height: 386rpx;
	width: 686rpx;
	margin: 34rpx 32rpx 0 32rpx;
	border-radius: 10px;
	border-radius: 10px;
	background: #F3F4F6;
	.xiugai-texts{
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #272832;
		letter-spacing: -0.55px;
		padding: 16rpx 22rpx;
	}
}
</style>
