<template>
	<view class="box">

		<view class="hd">
			<view class="left">
				<image :src="ip + '/' + detaobj.goods_img" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="title">{{ detaobj.goods_name || '' }}</view>
				<view class="pices">
					<view class="pices-hd">
						<text class="bind">￥</text>{{ detaobj.price1 || '' }}
					</view>
					<view class="pices-sun">
						x {{ sum }}
					</view>
				</view>
			</view>
		</view>
		<view class="remarks">
			<view class="remarks-bd" @click="open">
				<view class="remarks-left">
					订单备注
				</view>
				<view class="remarks-right itemsd" v-if="value !== ''">
					{{ value }}
				</view>
				<view class="remarks-right " v-else>
					{{ values }}
				</view>
			</view>
		</view>
		<view class="gopay">
			<view class="gopaybox">
				<view class="gopaysize">
					￥{{ detaobj.price * sum }}
				</view>
				<view class="gopaybtn" @click="chase"> <!-- //gopay -->
					去支付
				</view>
			</view>
		</view>
		<uni-popup ref="popup">
			<view class="popup">
				<view class="inputs">
					<textarea class="text1" v-model="value" maxlength=50 placeholder='请输入...' @input="sumfontnum"
						auto-focus="true"></textarea>

				</view>
				<view class="gopaybtn" @click="gook">
					确定
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { GET_PAY, TOKEN, GET_CART, GER_XQAPI, GET_IP, GET_GOODS_DETAIL } from '@/api/index.js'
export default {
	data () {
		return {
			ip: GET_IP,
			value: '',
			values: '请输入您的备注内容',
			fontNum: 0,
			orderInfo: {

			},
			openid: "",
			session_key: "",
			sn: "",
			time: 0,
			id: 0,
			detaobj: {},
			sum: 1,
			diss: 0,
			token: 0
		};
	},

	onLoad (e) {
		this.token = uni.getStorageSync('storage_token')
		// let token = uni.getStorageSync('storage_token')
		// if(!token){
		// 	uni.showToast({
		// 		title: '请登录',
		// 		icon: 'none',
		// 		duration: 3000
		// 	})  
		// }
		console.log(e);
		this.id = e.goods_id
		this.sn = e.sn
		this.sum = e.sum
		this.diss = e.ids
		// this.getdetailed(e.ids)
		this.getdetailed(e.goods_id)

	},
	onBackPress (e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		// uni.switchTab({
		// 	url: '/pages/tabBar/mine/mine'
		// });
		console.log(21321);
		// return true 表示禁止默认返回
		return true
	},

	methods: {
		async getdetailed (id) {
			const res = await uni.$http.get(`${GER_XQAPI}?goods_id=${id}`)
			console.log(res);
			this.detaobj = res.data.data
		},


		async chase () {

			let data = {
				goods_id: this.id,
				num: this.sum,
				type: 2,
				token: uni.getStorageSync('storage_token')
			}
			const { data: res } = await uni.$http.post(GET_CART, data)
			console.log(res.code === 2);
			console.log(res);
			this.xdobj = res.data
			if (res.code === 0) {
				this.gopay(res.data.zong_order_sn)
			} else if (res.code === 2) {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 9000,
					success () {
						uni.switchTab({
							url: '/pages/goods/my/my'
						})
					}
				})
			}


		},
		gopays (res) {

			let that = this

			uni.requestPayment({
				provider: 'wxpay', // 服务提提供商
				timeStamp: res.timestamp, // 时间戳
				nonceStr: res.nonceStr, // 随机字符串
				package: res.package,
				signType: res.signType, // 签名算法
				paySign: res.paySign, // 签名
				appid: res.appId,
				prepayid: res.package,

				// 1638892568
				success: function (res) {
					console.log('success:' + JSON.stringify(res));

					// clearInterval(that.time)
					uni.showToast({
						title: '支付成功',
					})

					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/goods/paid/paid?order_detail=" + that.xdobj.order_id
						})
					}, 1000)
				},
				fail: function (err) {
					console.log('fail:' + JSON.stringify(err));
					if (err) {
						uni.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 3000,
							success () {
								uni.reLaunch({
									url: '/pages/goods/wait/wait?sn=' + that.xdobj.zong_order_sn + '&goods_id=' + that.xdobj.order_id
								})
							}
						})
					}
				}
			});

		},
		gook () {
			this.$refs.popup.close()
		},
		// 限制文本框字数
		sumfontnum (e) {

		},
		open () {
			this.$refs.popup.open('bottom')
		},
		async gopay (sn) {

			let data = {
				token: uni.getStorageSync('storage_token'),
				sn: sn,
				remark: this.value === "请输入您的备注内容" ? '' : this.value
			}
			const { data: { data: res } } = await uni.$http.post(GET_PAY, data)
			console.log(res.info, 111);

			this.orderInfo = res.info
			if (res) {
				// this.time = setInterval(()=>{
				//   this.gopays(res.info)
				//   console.log('gopays');
				//  },2000)
				this.gopays(res.info)
			}
		}

	}
}
</script>

<style lang="less">
.box-nav {
	margin-top: 105rpx;
	display: flex;
	justify-items: center;
	width: 100%;
	height: 71rpx;
	background-color: #ffffff;

	.left {
		width: 41.96rpx;
		height: 32.56rpx;
		margin-left: 15rpx;
		margin-top: 8rpx;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.right {
		font-size: 34rpx;
		color: #26292C;
		text-align: center;
		margin-left: 265rpx;
	}
}

.popup {
	width: 100%;
	height: 1000rpx;
	background: #ffffff;
	padding-top: 34rpx;
	padding-left: 35rpx;
	padding-right: 35rpx;
	box-sizing: border-box;

	.gopaybtn {
		width: 670rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		background: linear-gradient(101deg, #547CB8 8%, #284C82 99%);
		margin-top: 450rpx;
	}

	.inputs {
		height: 300rpx;
		background-color: #f9f9f9;
		border-radius: 10rpx;

		textarea {
			padding: 20rpx;

		}

	}

	.text1 {
		width: 100%;
		color: #000000;
		height: 250rpx;
		font-size: 28rpx;

	}

	.text2 {
		height: 40rpx;
		line-height: 40rpx;
		color: #000000;
		font-size: 28rpx;
		float: right;
		margin-top: -39rpx;
		margin-right: 26rpx;
	}
}

.box {
	background: #f9f9f9;

	.hd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;
		width: 100%;
		height: 236rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #ffffff;

		.left {
			width: 176rpx;
			height: 176rpx;
			border-radius: 10rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.right {
			flex: 1;
			margin-left: 20rpx;
			position: relative;

			.title {
				position: absolute;
				top: -85rpx;
				left: 0;
				font-size: 28rpx;
				color: #3D3D3D;
			}

			.bind {
				font-size: 20rpx;
				color: #284C82;
			}

			.pices {
				position: absolute;
				top: 52rpx;
				left: 0;

				.pices-hd {
					color: #284C82;
					font-size: 28rpx;
					font-weight: bold;
					float: left;

				}

				.pices-sun {
					color: #C4C4C4;
					font-size: 28rpx;
					margin-left: 335rpx;
					float: right;

				}

			}
		}
	}
}

.remarks {
	margin-top: 24rpx;
	width: 100%;
	height: 108rpx;
	line-height: 92rpx;
	background-color: #ffffff;

	.remarks-bd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;

		.remarks-left {
			color: #3D3D3D;
			font-size: 28rpx;
		}

		.itemsd {
			width: 408rpx !important;
		}

		.remarks-right {
			position: relative;
			font-size: 28rpx;
			color: #888888;
			width: 266rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-right: 47rpx;

			&::after {
				display: inline-block;
				content: '';
				position: absolute;
				top: 50%;
				margin-top: -30rpx;
				right: -54rpx;
				width: 60rpx;
				height: 60rpx;
				background-image: url('../../../asset/icon/arrow.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
	}
}

.gopay {
	margin-top: 24rpx;
	width: 100%;
	height: 128rpx;
	background-color: #ffffff;

	.gopaybox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;

		.gopaysize {
			font-size: 36rpx;
			color: #284C82;
			font-weight: bold;
		}

		.gopaybtn {
			width: 360rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			background: linear-gradient(101deg, #547CB8 8%, #284C82 99%);
		}
	}
}
</style>
