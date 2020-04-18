<template>
  <div class="container">
    <search-header
      :show-back="true"
      :cart-url="cartUrl"
      :placeholder-text="placeholderText"
    />
    <section class="brand-list">
      <h3>热门男装品牌</h3>
      <div class="list">
        <template v-for="item in maleBrands">
          <a
            class="item"
            :key="item.brand_id"
            :href="`${item.link}`"
          >
            <img v-lazy="item.img"/>
          </a>
        </template>
      </div>
    </section>
    <section class="brand-list">
      <h3>热门女装品牌</h3>
      <div class="list">
        <a
          class="item"
          v-for="item in femaleBrands"
          :key="item.brand_id"
          :href="`${item.link}`"
        >
            <img v-lazy="item.img"/>
        </a>
      </div>
    </section>
    <section class="brand-index" ref="brandIndex">
      <div ref="list" class="list-wrap">
        <div :data-letter="letter" class="brand-index-list" :key="letter" v-for="(brands, letter) in groupBrands">
          <h3>{{letter}}</h3>
          <div class="list">
            <a
              v-for="brand in brands"
              :key="brand.brand_id"
              :to="`${brand.link}`"
            >
            {{brand.title}}
            </a>
          </div>
        </div>
      </div>
      <div class="letter-index">
        <span
          @click="scrollToPosition(word)"
          v-for="word in letters"
          :class="word==current ? 'active' : ''"
          :key="word"
        >{{word}}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchHeader from '~/components/SearchHeader';
import { BRAND_DETAIL_MOCK_DATA } from '@/mock';

export default {

  data() {
    return {
      groupBrands: [],
      letters: [],
      current: '',
      allBrands: [],
      maleBrands: [],
      femaleBrands: [],
    }
  },

  async asyncData({ $axios }) {
    const result = {
      allBrands: [],
      maleBrands: [],
      femaleBrands: [],
    }
    try {
      const res = await $axios.$get('/api/goods/brand');
      if (res.success) {
        result.allBrands = BRAND_DETAIL_MOCK_DATA.data.all;
        result.maleBrands = BRAND_DETAIL_MOCK_DATA.data.male;
        result.femaleBrands = BRAND_DETAIL_MOCK_DATA.data.female;
        // result.allBrands = res.data.all;
        // result.maleBrands = res.data.male;
        // result.femaleBrands = res.data.female;
      }
    } catch(err) {
      console.log(err)
    }
    return result
  },

  async fetch({ store }) {
    return store.dispatch('FETCH_CONFIG_DATA');
  },

  computed: {
    ...mapState({
      cartUrl: state => state.configData.tao_cart_url,
      placeholderText: state => state.configData.brand_search_keyword
    })
  },

  created() {
    const brandsSort = this.brandsSort(this.allBrands);
    const { groups, letters } = this.brandsGroup(brandsSort);
    this.groupBrands = groups;
    this.letters = letters;
    this.current = this.letters[0];
  },

  methods: {
    brandsGroup(brands) {
      const groups = {};
      const letters = [];
      brands.forEach((item) => {
        let letter = item.pinyin.toUpperCase();
        if (!groups[letter]) {
            groups[letter] = [];
            letters.push(letter);
        }
        groups[letter].push(item);
      })

      return { groups, letters }
    },

    brandsSort(brandsArr) {
      return brandsArr.sort(function(a, b) {
        var au = a.pinyin.toUpperCase();
        var bu = b.pinyin.toUpperCase();
        if (au > bu) {
          return 1;
        } else if (au < bu) {
          return -1;
        } else {
          return 0;
        }
      })
    },

    scrollToPosition(letter) {
      this.current = letter;
      let elem = document.querySelector('[data-letter="' + letter + '"]');
      let offsetTop = elem.offsetTop;
      this.$refs.list.scrollTop = offsetTop;
    },
  },

  components: {
    SearchHeader
  }
}
</script>

<style lang="scss" scoped>
.brand-list {
  h3 {
    color: #212121;
    font-size: px(30);
    font-weight: bold;
    margin-top: px(20);
    text-align: center;
  }
  .list {
    overflow: hidden;
    .item {
      float: left;
      display: inline-block;
      width: px(160);
      height: px(160);
      margin-left: px(46.66);
      margin-top: px(20);
      margin-bottom: px(50);
      border: 1px solid #CCCCCC;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.brand-index {
  position: relative;
  .list-wrap {
    height: px(2000);
    overflow: hidden;
  }
  .brand-index-list {
    padding: 0 px(30);
    padding-right: px(80);
    h3 {
      color: #212121;
      text-align: center;
      font-size: px(45);
      border-bottom: 1px dashed #eee;
      padding: px(20) 0;
    }
  }
  .list {
    > a {
      display: block;
      font-size: px(40);
      padding-top: px(15);
      padding-bottom: px(15);
      color: #212121;
      border-bottom: 1px dashed #eee;
    }
  }
  .letter-index {
    position: absolute;
    top: px(20);
    right: 0;
    span {
      display: block;
      width: px(80);
      text-align: center;
      color: #999;
      font-size: px(45);
      &.active {
        font-size: px(55);
        color: #000;
      }
    }
  }
}
</style>