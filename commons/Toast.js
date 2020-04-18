import ToastComponent from '@/components/Toast';

const Toast = {};

Toast.install = function(Vue) {
	if (document.getElementsByClassName('global-toast-tip-class').length) {
		return;
	}
	let toastConstructor = Vue.extend(ToastComponent);
	let $vm = new toastConstructor();
	$vm.$mount(document.createElement('div'));
	document.body.appendChild($vm.$el);

	Vue.prototype.$toast = {
		show(options) {
			if (typeof options === 'string') {
				$vm.text = options
			} else if (typeof options === 'object'){
				Object.assign($vm, options)
			}
			$vm.show = true;
			if ($vm.persist) {
				return
			}
			Vue.nextTick(() => {
				$vm.timer = setTimeout(() => {
					$vm.show = false
				}, $vm.time)
			})
		},
		hide() {
			setTimeout(() => {
				$vm.show = false
			}, 500)
		}
	}
}

export default Toast