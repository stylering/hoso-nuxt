import { uniqBy } from 'lodash';
import { BRAND_MALE_MOCK_DATA, BRAND_FEMALE_MOCK_DATA } from '@/mock';

export const states = () => {
  return {
    sexId: '2',
    configData: {},
    brandList: [],
    goodsList: [],
  }
}

export const mutations = {
  SET_SEX_ID(state, sexId = '2') {
    state.sexId = sexId
  },
  SET_CONFIG(state, data = {}) {
    state.configData = { ...data }
  },
  SET_BRAND_LIST(state, list = []) {
    state.brandList = [...list]
  },
  SET_GOODS_LIST(state, list = []) {
    state.goodsList = [...list]
  }
}

export const actions = {

  FETCH_CONFIG_DATA({ commit }) {
    return this.$axios.$get('/api/index/config').then(res => {
      commit('SET_CONFIG', { ...res.data })
      return Promise.resolve(res.data)
    })
  },

  INIT_INDEX_DATA({ commit }, { sex_id }) {

    return Promise.all([
      this.$axios.$get('/api/index/brand', { sex_id }),
      this.$axios.$get('/api/index/goods', { sex_id })
    ]).then((res) => {
      const [brandRes, goodsRes] = res;

      let brandList = [];
      if (brandRes) {
        brandList = sex_id === '1' ? uniqBy(BRAND_MALE_MOCK_DATA.data, 'brand_id') : uniqBy(BRAND_FEMALE_MOCK_DATA.data, 'brand_id');
      }
      // const brandList = brandRes.success ? uniqBy(brandRes.data, 'brand_id') : [];
      const goodsList = goodsRes.success ? goodsRes.data : [];
      goodsList.forEach(item => {
        item.goods = uniqBy(item.goods, 'id')
      })

      commit('SET_BRAND_LIST', brandList)
      commit('SET_GOODS_LIST', goodsList)

      return Promise.resolve({ brandList, goodsList })
    })
  }
}