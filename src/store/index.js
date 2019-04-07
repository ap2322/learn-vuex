import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'


Vue.use(Vuex)

export default new Vuex.Store({

  state: { // = data
    products: [],
    //{id, quantity}
    cart: []
  },

  getters: { // = computed properties
    availableProducts(state, getters){
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts (state){
      return state.cart.map(cartItem =>{
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal (state, getters){
      //FOREACH way to do this next 5 lines
      let total = 0
      getters.cartProducts.forEach (product => {
         total += product.price * product.quantity
       })
      return total
      //reduce method (doesn't seem to work)
      // return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

    }
  },

  actions: { //same as methods
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        // make the call
        // call setProducts mutation
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },

    addProductToCart (context, product) {
      if (product.inventory > 0){
        const cartItem = context.state.cart.find(item => item.id === product.id)
        //find cartItem
        if (!cartItem){
          //push item to cart
          context.commit('pushProductToCart', product.id)
        }
        else{
          //increase quantity
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory',product)
      }
    }
  },

  mutations: { //responsible for setting and updating the state
    setProducts(state, products){
      //update products
      state.products = products
    },
    
    pushProductToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem){
      cartItem.quantity ++
    },

    decrementProductInventory(state, product){
      product.inventory--
    }

  }


})









