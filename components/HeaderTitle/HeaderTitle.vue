<template>
  <header class="title-header">
		<a :href="backUrl" class="back"></a>
		<h3>{{title}}</h3>
	</header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    backUrl: {
      type: String,
      default: `javascript:history.back()`
    }
  }
}
</script>
<style lang="scss" scoped>
.title-header {
  display: flex;
  height: px(150);
  background: #212121;
  align-items: center;
  padding: 0 px(30);
  .back {
    display: block;
    width: px(100);
    height: px(150);
    background: url("~assets/images/arrow-left.png") center center no-repeat;
    background-size: px(25) px(42);
  }
  > h3 {
    flex: 1;
    color: #ffcc00;
    font-size: px(45);
    padding-left: px(30);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
  }
}
</style>