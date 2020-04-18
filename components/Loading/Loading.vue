
<template>
		<div v-show="pageLoading" class="loading"></div>
</template>
<script>
	export default {
		props: {
			pageLoading: {
				type: Boolean,
				default: false,
			}
		}
	};
</script>
<style lang="scss" scoped>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10000;
		background: #fff url("~assets/images/ajax-loader.gif") center center no-repeat;
		background-size: 32px 32px;
		opacity: 0.5;
	}
</style>