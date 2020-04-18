<template>
	<div class="about-page">
		<div class="center">
			<div class="logo"></div>
			<p class="title">货色HOSO—只做原创品牌</p>
			<p class="t1">客户服务及合作联系</p>
			<p class="t2">Email:service@hososhop.com</p>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.about-page {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.center {
			display: flex;
			flex-direction: column;
			align-items: center;
			p {
				font-size: px(36);
				color: #202020;
			}
			.logo {
				width: px(200);
				height: px(200);
				background: url("~assets/images/logo.jpg") center center no-repeat;
				background-size: 100%;
			}
			.title {
				margin-top: px(55);
			}
			.t1 {
				margin-top: px(300);
			}
			.t2 {
				margin-top: px(50);
			}
		}
	}
</style>