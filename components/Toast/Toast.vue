<template>
	<div class="global-toast-tip-class" v-show="show">
		<span>{{text}}</span>
	</div>
</template>
<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			text: {
				type: String,
				default: '',
			},
			time: {
				type: Number,
				default: 1500
			},
			persist: {
				type: Boolean,
				default: false,
			}
		}
	};
</script>
<style lang="scss" scoped>
	
	.global-toast-tip-class {
		position: fixed; 
		left: 0; 
		bottom: 10px; 
		width: 100%; 
		min-height: px(100); 
		z-index: 10000; 
		text-align: center;
		span {
			display: inline-block; 
			line-height: 1.5; 
			padding: 3px 10px; 
			background: rgba(0, 0, 0, .5); 
			color: #fff; 
			font-size: px(40);
		}
	}
</style>