import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        coursesList: [],
        favouritesList: []
    },

    getters: {
        coursesList: state => state.coursesList,
        recentFavourites: state => {
            return state.favouritesList.slice(-3).reverse();
        },
    },

    mutations: {
        searchedCoursesList(state, payload) {
            state.coursesList = payload;
            console.log(state.coursesList)
        },
        addFavourite(state, payload) {
            state.favouritesList.push(payload);
        },
    },

    actions: {
        addFavourite(context, id) { 
            context.commit('addFavourite', id)
        }
    }
})