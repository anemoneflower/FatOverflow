import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        user: {
            loggedIn: false,
            data: null
        }
    },
    //provide a way of accessing data stored in the state.
    getters: {
        user(state){
            return state.user
        }
    },
    //Mutations allows us to be able to make changes to our state.
    mutations: {
        increment (state) {
            state.count++
        },
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit("SET_USER", null);
            }
        }
    }
})

export default store