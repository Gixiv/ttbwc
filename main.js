import Vue from 'vue'
import App from './App'

import { VueJsonp } from 'vue-jsonp'
import axios from 'axios';
Vue.prototype.$axios=axios;

Vue.use(VueJsonp)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
