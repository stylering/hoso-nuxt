<template>
  <div class="container">
    <search-header
      :placeholder-text="`原创设计T恤`"
      :show-logo="true"
      :show-cart="true"
      :cart-url="tao_cart_url"
    />
    <section class="role-type">
      <nuxt-link to="/?sex_id=1" :class="{active: sexRole == 'male'}">男&nbsp;&nbsp;Men</nuxt-link>
      <nuxt-link to="/?sex_id=2" :class="{active: sexRole == 'female'}">女&nbsp;&nbsp;Women</nuxt-link>
		</section>
    <section class="original-brand">
			<h3>原创品牌</h3>
			<div class="brand-list">
				<a
          class="item"
          v-for="item in brandList"
          :key="item.brand_id"
          :href="`${item.link}`"
        >
					<img v-lazy="item.img" />
				</a>
				<nuxt-link to="/brand" class="item more" />
			</div>
			<div class="line"></div>
		</section>
    <section class="content">
			<div class="product-list-wrap" :key="cates.id" v-for="cates in goodsList">
				<h3>{{cates.name}}</h3>
				<div class="tags-list">
					<nuxt-link
            :class="{active: tag.current}"
            :to="`/product/list?cid=${tag.id}&pid=${tag.parent_id}`"
            :key="tag.id"
            v-for="tag in cates.childs"
          >
            {{tag.name}}
          </nuxt-link>
				</div>
				<div class="product-list">
          <a :href="`${goods.click_url}`" :key="`${cates.id}_${goods.id}`" class="item" v-for="goods in cates.goods">
						<div class="pic">
							<img v-lazy="goods.img"/>
						</div>
						<div class="title">{{goods.title}}</div>
						<div class="price">
							<template v-if="goods.sale_price == goods.discount_price">
								<span class="ori">￥{{goods.sale_price}}</span>
							</template>
							<template v-else>
								<span class="dis">￥{{goods.discount_price}}</span>
								<span class="ori-line">￥{{goods.sale_price}}</span>
							</template>
						</div>
					</a>
				</div>
			</div>
		</section>
    <div class="to-top" @click="scrollTop" v-show="topVisible"></div>
		<footer class="about">
      <nuxt-link to="/brand">品牌汇总</nuxt-link>
			<span class="line">|</span>
      <nuxt-link to="/about">关于我们</nuxt-link>
		</footer>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import SearchHeader from '@/components/SearchHeader';
import { storage } from '@/commons/utils/tools';

export default {

  watchQuery: ['sex_id'],

  async fetch({ store, query: { sex_id } }) {
    const { default_sex_id } = await store.dispatch('FETCH_CONFIG_DATA', { sex_id });
    const curSexId = sex_id === '1' || sex_id === '2' ? sex_id : default_sex_id;
    store.commit('SET_SEX_ID', curSexId)
    return store.dispatch('INIT_INDEX_DATA', { sex_id: curSexId })
  },

  data() {
    return {
      topVisible: false,
    }
  },

  computed: {
    ...mapState({
      placeholderText: state => {
        const { default_sex_id, male_search_keyword, female_search_keyword } = state.configData;
        return default_sex_id === '1' ? male_search_keyword : female_search_keyword
      },
      tao_cart_url: state => {
        const { tao_cart_url = '' } = state.configData
        return tao_cart_url
      },
      sexId: state => state.sexId,
      sexRole: state => state.sexId === '1' ? 'male' : 'female',
      brandList: state => state.brandList,
      goodsList: state => state.goodsList,
    }),
  },

  mounted() {
    window.addEventListener('scroll', this.scrollListener, false)
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrollListener)
  },

  methods: {
    scrollListener() {
      if (window.scrollY > 1000) {
        this.topVisible = true;
      } else {
        this.topVisible = false;
      }
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },

  components: {
    SearchHeader
  },
}
</script>

<style lang="scss" scoped>

  .role-type {
		display: flex;
		background-color: #FFCC00;
		justify-content: center;
		align-items: center;
		padding: px(20) 0;
		> a {
			font-size: px(42);
			color: #212121;
			border: 1px solid #212121;
			padding: 0 px(5);
			font-weight: bold;
			cursor: pointer;
			&.active {
				border: 2px solid #212121;
			}
			&:nth-of-type(2) {
				margin-left: px(105);
			}
		}
  }
  
  .original-brand {
		h3 {
			color: #212121;
			font-size: px(30);
			font-weight: bold;
			margin-top: px(20);
			text-align: center;
		}
		.brand-list {
			overflow: hidden;
			.item {
				float: left;
				width: px(160);
				height: px(160);
				margin-left: px(46.66);
				margin-top: px(20);
				margin-bottom: px(20);
				border: 1px solid #CCCCCC;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.more {
			background: url('~assets/images/more.jpg') center center no-repeat;
			background-size: px(160);
		}
		.line {
			width: px(1040);
			height: 1px;
			border: 1px dashed #CCC;
			margin: 0 auto;
		}
  }
  
  .product-list-wrap {
		h3 {
			color: #212121;
			font-size: px(30);
			font-weight: bold;
			margin: px(20) 0;
			text-align: center;
		}
		.tags-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding: 0 px(5);
			> a {
				font-size: px(42);
				border: 1px solid #999;
				padding: 0 px(5);
				margin: px(10);
				&.active {
					border: 2px solid #999;
				}
			}
		}
		.line {
			width: px(1050);
			height: 1px;
			border: 1px dashed #CCCCCC;
		}
  }
  
  .product-list {
		overflow: hidden;
		margin-top: px(30);
		.item {
			float: left;
			width: px(346.66);
			height: px(540);
			margin-left: px(10);
			.pic {
				width: px(346.66);
				height: px(346.66);
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.title {
			font-size: px(36);
			margin-top: px(10);
			color: #333333;
			display: -webkit-box; 
			overflow: hidden; 
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2; 
			transform: scale(0.9);
		}
		.price {
			font-size: px(36);
			.ori {
				color: #666666;
			}
			.dis {
				color: #333333;
				margin-left: px(30);
			}
			.ori-line {
				color: #666666;
				text-decoration: line-through;
			}
		}
	}

  .about {
		height: px(100);
		display: flex;
		justify-content: center;
		align-items: center;
		a {
			font-size: px(40);
			color: #212121;
			font-weight: bold;
		}
		span {
			color: #212121;
			margin: 0 px(30);
		}
	}
	
	.to-top {
		position: fixed;
		bottom: px(110);
		right: px(20);
		width: px(100);
		height: px(100);
		background: url("~assets/images/top.png") center center no-repeat;
		background-size: 100%;
	}
  
</style>
