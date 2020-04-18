<template>
	<header class="search-bar">
		<a v-if="showBack" class="back" href="javascript:history.back()"></a>
		<span v-if="showLogo" class="logo"></span>
		<div class="suggest-input" ref="suggestWrap">
			<div class="input-wrap">
				<input @keyup.enter="keywordSearch" type="text" maxlength="16" :placeholder="placeholderText" v-model="searchValue" />
				<div @click="keywordSearch" class="search-icon"></div>
			</div>
			<div class="suggest-list" v-show="showSuggest && suggestList.length">
				<span @click="clickSug(item[0])" :key="item[1]" v-for="item in suggestList">{{item[0]}}</span>
				<span @click="showSuggest=false" class="clear">清除</span>
			</div>
		</div>
		<div class="cart-wrap">
			<a v-show="showCart" class="cart" :href="cartUrl"></a>
		</div>
	</header>
</template>
<script>
	import Vue from 'vue';
	import VueJsonp from 'vue-jsonp';
	import { getAbsPath } from '@/commons/utils/tools';

	Vue.use(VueJsonp);

	export default {
		props: {
			showBack: {
				type: Boolean,
				default: false,
			},
			showLogo: {
				type: Boolean,
				default: false,
			},
			showCart: {
				type: Boolean,
				default: false,
			},
			cartUrl: {
				type: String,
				default: '',
			},
			placeholderText: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				searchValue: '',
				showSuggest: false,
				suggestList: [],
			}
		},

		watch: {
			searchValue(val) {
				this.sugguestChange(val)
			}
		},

		mounted() {
			const suggestWrap = this.$refs.suggestWrap;
			document.addEventListener('click', (evt) => {
				if (suggestWrap.contains(evt.target)) {
					this.showSuggest = true;
				} else {
					this.showSuggest = false;
				}
			}, false)
		},

		methods: {

			sugguestChange(keyword) {
				this.$jsonp('https://suggest.taobao.com/sug?code=utf-8&q=' + keyword).then(data => {
					this.showSuggest = true;
					this.suggestList = data.result;
				})
			},

			clickSug(keyword) {
				this.searchValue = keyword;
				this.showSuggest = false;
				location.href = getAbsPath('/product/list?keyword=' + keyword);
			},
			keywordSearch() {
				let searchValue = this.searchValue.trim();
				if (searchValue != '') {
					this.showSuggest = false;
					location.href = getAbsPath('/product/list?keyword=' + searchValue);
				}
			}
		}
	};

</script>
<style lang="scss" scoped>

  .search-bar {
		display: flex;
		height: px(160);
		background-color: #212121;
		align-items: center;
		.back {
			display: inline-block;
			width: px(120);
			height: px(160);
			background: url("~assets/images/arrow-left.png") center center no-repeat;
			background-size: px(25) px(42);
		}
		.logo {
			display: inline-block;
			width: px(180);
			height: px(160);
			background: url("~assets/images/search-bar-logo.jpg") center center no-repeat;
			background-size: px(116) px(90);
		}
		.suggest-input {
			position: relative;
			flex: 1;
			height: px(90);
			.suggest-list {
				position: absolute;
				left: 0;
				right: 0;
				top: px(95);
				width: 100%;
				background: #fff;
				border: 1px solid #eee;
				span {
					display: block;
					padding: px(10) px(20);
					font-size: px(40);
					color: #212121;
					&:active {
						background: #aaa;
					}
				}
				.clear {
					color: #aaa;
					text-align: center;
				}
			}
		}
		.input-wrap {
			display: flex;
			height: px(90);
			input {
				flex: 1;
				border: none;
				outline: none;
				padding: 0 px(15);
				border-radius: 0;
			}
			.search-icon {
				display: inline-block;
				width: px(70);
				height: px(90);
				background: #fff url("~assets/images/icon-search.png") center center no-repeat;
				background-size: px(46);
			}
		}
		.cart-wrap {
			width: px(150);		
			.cart {
				display: inline-block;
				width: px(150);
				height: px(160);
				background: url("~assets/images/shopping-cart.png") center center no-repeat;
				background-size: px(66) px(56);
			}
		}
	}
</style>