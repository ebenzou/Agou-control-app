import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// import basics from './pages/basics/home.vue'
// Vue.component('basics',basics)

// import components from './pages/component/home.vue'
// Vue.component('components',components)

// import plugin from './pages/plugin/home.vue'
// Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.prototype.API_URL = 'http://119.3.12.149/api/';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()