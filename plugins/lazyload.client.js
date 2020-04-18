import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

const loadingPic = require('~/assets/images/pic.png');

Vue.use(VueLazyload, {
	preLoad: 1.3,
	loading: loadingPic,
	attempt: 1,
	listenEvents: [ 'scroll' ]
});