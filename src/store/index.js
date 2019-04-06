import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products
  },

  state: { // = data
    products: []

  },

  getters: { // = computed properties
    productsCount () {
      //return lenght of products array
    }
  },

  actions: { //same as methods
    fetchProducts(){
      //make the call
    }
  },

  mutations: { //responsible for setting and updating the state
    setProducts(){
      //update products
    }

  }


})









