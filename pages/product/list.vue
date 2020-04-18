<template>
  <div class="container">
    <HeaderTitle backUrl="/" :title="title" />
    <div class="tags-list" v-if="tagsList.length">
			<nuxt-link
        :to="`/product/list?cid=${tag.id}&pid=${pid}`"
        :class="tag.id==cid ? 'active': ''"
        :key="tag.id"
        v-for="tag in tagsList"
      >
        {{tag.title}}
      </nuxt-link>
		</div>
    <div class="sort-wrap">
			<span class="item" @click="productHits">人气</span>
			<span class="item" @click="productSales">销量</span>
			<div class="item" ref="popElem" @click="popVisible = !popVisible">价格
				<ul class="price-popup" v-show="popVisible">
					<li @click="priceSort(0)">价格低到高</li>
					<li @click="priceSort(1)">价格高到低</li>
				</ul>
			</div>
		</div>
    <div class="empty-result" v-if="!productList.length && !hasNext">没有数据</div>
		<div class="product-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy">
			<a :href="`${item.link}`" :key="item.id" class="item" v-for="item in productList">
				<div class="pic">
					<img v-lazy="item.img"/>
				</div>
				<div class="title">{{item.title}}</div>
				<div class="info">
					<div class="price-wrap">
						<template v-if="item.discount_price == item.sale_price">
							<span class="price">￥{{item.sale_price}}</span>
						</template>
						<template v-else>
							<span class="price">￥{{item.discount_price}}</span>
							<span class="ori-price">￥{{item.sale_price}}</span>
						</template>
					</div>
					<div class="coupon" v-if="item.coupon_price*1 > 0">{{item.coupon_price}}元</div>
				</div>
				<div class="volume" v-if="item.volume*1 > 100">销量：{{item.volume}}</div>
			</a>
		</div>
  </div>
</template>

<script>
import Vue from 'vue';
import HeaderTitle from '@/components/HeaderTitle'

export default {
  watchQuery: ['cid', 'pid', 'keyword'],
  data() {
    return {
      keyword: '',
      pid: '',
      cid: '',
      productList: [],
      busy: false,
      hasNext: true,
      curPage: 0,
      tagsTitle: '',
      tagsList: [],
      orderby: '',
      popVisible: false,
      title: '货色HOSO — 只做原创品牌',
    }
  },

  async asyncData({ $axios, query: { cid, pid, keyword } }) {
    const result = {};
    const params = {};
    if (cid !== '') {
      params.cid = cid;
    }
    if (pid !== '') {
      params.pid = pid;
    }
    if (keyword !== '') {
      params.keyword = keyword;
    }
    
    try {
      const res = await $axios.$get('/api/goods/list', { params });
      if (res.success) {
        result.hasNext = res.data.hasnext;
        result.curPage = res.data.curpage;
        result.productList = res.data.list;
        result.tagsTitle = res.data.cate_title;
        result.tagsList = res.data.cates;
      }
    } catch(err) {
      console.log(err)
    }
    return { ...result, ...params };
  },

  mounted() {
    document.addEventListener('click', this.documentListener, false)
  },

  destroyed() {
    document.removeEventListener('click', this.documentListener)
  },

  methods: {
    documentListener(evt) {
      if (!this.$refs.popElem.contains(evt.target)) {
        this.popVisible = false;
      }
    },
    loadMore() {
      if (this.busy === true) {
        return;
      }
      if (this.hasNext) {
        this.$toast.show({
          text: '努力加载中...',
          persist: true,
        });
        this.busy = true;

        let params = {};
        if (this.keyword !== '') {
          params.keyword = this.keyword;
        }
        if (this.pid !== '') {
          params.pid = this.pid;
        }
        if (this.cid !== '') {
          params.cid = this.cid;
        }
        if (this.orderby) {
          params.orderby = this.orderby;
        }
        params.page = this.curPage * 1 + 1;

        this.loadProductList(params).finally(() => {
          this.busy = false;
          this.$toast.hide();
        })
      } else {
        this.$toast.show({
          text: '没有更多了',
          persist: false,
        });
      }
    },
      
    loadProductList(params = {}) {
      return this.$axios.$get('/api/goods/list', { params }).then(result => {
        if (result.success) {
          let data = result.data;
          this.hasNext = data.hasnext;
          this.curPage = data.curpage;
          this.productList = this.productList.concat(data.list);
          this.tagsTitle = data.cate_title;
          this.tagsList = data.cates;
        }
      })
    },
    reloadProduct() {
      this.curPage = 0;
      this.hasNext = true;
      this.productList = [];
      this.loadMore();
    },

    productHits() {
      this.orderby = 'hits';
      this.reloadProduct();
    },

    productSales() {
      this.orderby = 'sale';
      this.reloadProduct();
    },

    priceSort(sort) {
      this.orderby = sort === 0 ? 'priceasc' : 'pricedesc';
      this.reloadProduct();
    },
  },

  components: {
    HeaderTitle
  }
}
</script>
<style lang="scss" scoped>
.tags-list {
  display: flex;
  flex-wrap: wrap;
  padding: px(10);
  justify-content: center;
  background-color: #FFCC00;
  > a {
    font-size: px(48);
    border: 1px solid #212121;
    margin: px(10);
    padding: 0 px(10);
    &.active {
      border: 2px solid #212121;
    }
  }
}

.sort-wrap {
  display: flex;
  padding: px(30) px(50);
  justify-content: center;
  .item {
    position: relative;
    font-size: px(48);
    color: #212121;
    padding: 0 px(40);
  }
  .price-popup {
    position: absolute;
    top: 100%;
    left: 0;
    padding: px(10) 0;
    background: #fff;
    li {
      color: #212121;
      font-size: px(36);
      padding: px(20);
      white-space: nowrap;
      &:active {
        background: #ccc;
      }
    }
  }
}

.empty-result {
  height: px(1000);
  line-height: px(1000);
  text-align: center;
  color: #777;
}

.product-list {
  overflow: hidden;
  padding-top: px(20);
  background: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    float: left;
    width: px(532);
    height: px(875);
    margin-bottom: px(20);
    background: #fff;
    &:nth-of-type(2n) {
      margin-left: px(16);
    }
    .pic {
      width: px(532);
      height: px(532);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-top: px(20);
      font-size: px(40);
      color: #333;
      display:-webkit-box; 
      overflow: hidden; 
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:2; 
      padding: 0 px(20);
    }
    .info {
      overflow: hidden;
      padding: 0 px(20);
      color: #666;
      margin-top: px(20);
      margin-bottom: px(20);
    }
    .price-wrap {
      float: left;
      .price {
        font-size: px(48);
      }
      .ori-price {
        text-decoration: line-through;
        font-size: px(36);
        margin-left: px(5);
      }
    }
    .coupon {
      float: right;
      font-size: px(36);
      line-height: 2;
    }
    .volume {
      padding: 0 px(20);
      margin-bottom: px(20);
      font-size: px(36);
      color: #787878;
    }
  }
}
</style>