<template>
	<view class="scroll-choose-all" :style="{background:bg}">
		<view class="middleLine"></view>
		<scroll-view class="scroll-choose" scroll-x="true" upper-threshold="5" lower-threshold="5" 
		:scroll-left="scrollLeftInit" show-scrollbar="false" @scroll="scroll" @scrolltoupper="upper" 
		@scrolltolower="lower" scroll-with-animation="true">
			<view class="scroll-con" :style="{width: scrollWid}">
				<view class="topLine">
					<view class="allLine" :style="{'marginRight': maginL + 'px'}" :class="item.type" v-for="(item,index) in scrollList" :key="index"></view>
				</view>
				<view class="bottomNum" :style="{'paddingLeft': allNumLeft}">
					<text class="allNum" :style="{width: (maginL + 2) * 10 + 'px',left: -((maginL + 2) * 5) + 'px',color:gearcolor}" v-for="(item,index) in scrollNumList" :key="index">
						{{item}}
					</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'ScrollChoose',
		props: {
			//起始值和终止值差距不要过大，否则会影响页面性能
			/**
			 * 初始值（注意：初始值应在起始值和终止值之间）
			 */
			scrollLeft: {
				type: Number,
				default: 0
			},
			/**
			 * 滚动区域起始值（注意：起始值不能大于终止值）
			 */
			scrollStart: {
				type: Number,
				default: 0
			},
			/**
			 * 滚动区域终止值
			 */
			scrollEnd: {
				type: Number,
				default: 100
			},
			/**
			 * 线间距
			 */
			maginL: {
				type: Number,
				default: 5
			},
			/**
			 * 背景区域
			 */
			bg: {
				type: String,
				default: '#393939'
			},
			/**
			 * 卡尺数字颜色
			 */
			gearcolor:{
				type: String,
				default: '#FFFFFF'
			},
			/**
			 * 卡尺刻度整数颜色
			 */
			gearscale:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				scrollList:[],
				scrollNumList:[],
				scrollWid: '100vw',
				scrollLeftInit: 0,
				allNumLeft: ''
			}
		},
		mounted() {
			this.init();
		},
		computed:{
			
		},
		methods: {
			init(){
				for(let i = this.scrollStart; i < (this.scrollEnd + 1); i++){
					let _line = {};
					if(i%5 == 0){
						if(i%10 == 0){
							this.scrollNumList.push(i);
							_line.type = this.gearscale ? 'LLine' : 'hLine'
						}else{
							_line.type = 'MLine'
						}
					}else{
						_line.type = 'SLine'
					}
					this.scrollList.push(_line);
				}
				this.scrollWid = uni.upx2px(750) + (this.scrollEnd - this.scrollStart) * (this.maginL + 2)  + 'px';
				if(this.scrollStart % 10 != 0){
					if(this.scrollStart > 0){
						this.allNumLeft = (10 - this.scrollStart % 10) * (this.maginL + 2) + uni.upx2px(372) + 'px';
					}else{
						this.allNumLeft = Math.abs(this.scrollStart % 10) * (this.maginL + 2) + uni.upx2px(372) + 'px';
					}
				}
				setTimeout(()=>{
					this.setNowLeft();
				},100)
			},
			setNowLeft(){
				this.scrollLeftInit = (this.scrollLeft - this.scrollStart) * (this.maginL + 2);
			},
			upper: function(e) {
				setTimeout(()=>{
					this.$emit('scroll',this.scrollStart);
				},50)
			},
			lower: function(e) {
				setTimeout(()=>{
					this.$emit('scroll',this.scrollEnd);
				},50)
			},
			scroll: function(e) {
				this.$emit('scroll',Math.round(e.detail.scrollLeft/(this.maginL + 2)) + this.scrollStart);
			}
		}
	}
</script>

<style lang="scss">
@charset "UTF-8";
.scroll-choose-all{
	width: 750rpx;
	height: 220rpx;
	margin: 10px 0;
	// border-bottom: 1px solid #ccc;
	// border-top: 1px solid #ccc;
	position: relative;
}
.middleLine{
	position: absolute;
	width: 4rpx;
	height: 95rpx;
	background: #FF6565;
	left: 375rpx;
	margin-left: -2px;
	z-index: 1;
}
.scroll-choose{
	width: 750rpx;
	height: 200rpx;
	.scroll-con{
		height: 200rpx;
		overflow: hidden;
		.topLine{
			height: 30px;
			padding: 0 372rpx;
		}
		.bottomNum{
			margin-top: 60rpx;
			height: 30px;
			padding: 0 0 0 372rpx;
			width: 100%;
			// display: flex;
			// flex-wrap: nowrap;
			.allNum{
				display: inline-block;
				position: relative;
				// width: 70px;
				// left: -35px;
				text-align: center;
				font-size: 44rpx;
				font-weight: 800;
				
				
			}
		} 
		.allLine{
			display: inline-block;
			// margin-right: 5px;
			width: 4rpx;
			background: #999999;
			height: 68rpx;
			position: relative;
		}
		.allLine:last-child{
			margin-right: 0px !important;
		}
		.LLine{
			height: 94rpx;
			background: #ffffff;
		}
		.hLine {
			height: 94rpx;
			background: #2A2A2A;;
		}
		.MLine{
			height: 68rpx;
			top: -15px;
			background: #999999;
		}
		.SLine{
			height: 68rpx;
			top: -15px;
		}
	}
}
</style>