import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        user: {
            loggedIn: false,
            data: null
        },
        previousUrl: '/',
        chatList: [],
        searchData: ''
    },
    //provide a way of accessing data stored in the state.
    getters: {
        user(state){
            return state.user
        },
        previousUrl(state){
            return state.previousUrl
        },
        chatList(state){
            return state.chatList
        },
        uid(state){
            return state.user.data.uid
        },
        searchData(state){
            return state.searchData
        }
    },
    //Mutations allows us to be able to make changes to our state.
    mutations: {
        increment (state) {
            state.count++
        },
        // sets the loggedIn property on state.user to the value that was passed to it.
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        // makes changes to the data property on state.user.
        SET_USER(state, data) {
            state.user.data = data;
        },
        // store previous URL
        SET_PREV_URL(state, route) {
            state.previousUrl = route;
        },
        STORE_CHAT_LIST(state, list) {
            state.chatList = list;
        },
        storeSearchData(state, value) {
            state.searchData = value;
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
        },
        pushRoute({commit}, prev) {
            commit("SET_PREV_URL", prev);
        },
        storeChats({commit}, l) {
            // var c = [];
            // for(var i=0; i<l.length; i++){
            //     c.push(l[i])
            // }
            commit("STORE_CHAT_LIST", l);
        }
    }
})

export default store