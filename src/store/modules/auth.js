/* eslint-disable */
import axios from 'axios'

const state = {
    user: null,
    posts: null,
    token: ""
}

const actions = {
    async Register({ dispatch }, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('email', form.username)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },

    LogIn({ commit }, User) {
        return new Promise((resolve, reject) => {
            axios.post('login', User).then(response => {
                resolve(response);
                window.localStorage.setItem('token', response.data.token)
                commit('setUser', 'Kiryowa Francis');
            }).catch(error => {
                reject(error);
                commit('stopLoader');
            })
        });
    },

    async CreatePost({ dispatch }, post) {
        await axios.post('post', post)
        await dispatch('GetPosts')
    },

    async GetPosts({ commit }) {
        // let getToken = JSON.parse(window.localStorage.getItem('vuex'));
        let token = window.localStorage.getItem('token');
        const headers = {
            'Authorization': 'Bearer '+ token
        }

        let response = await axios.get('closed', {
            headers: headers
        })
        commit('setPosts', response.data)
    },

    async LogOut({ commit }) {
        let user = null
        commit('setLogOut', user)
    }
}

const getters = {
    isAuthenticated: state => !!state.user,
    StatePosts: state => state.posts,
    StateUser: state => state.user,
}

const mutations = {
    setUser(state, username) {
        state.user = username
    },
    setPosts(state, posts) {
        state.posts = posts
    },
    setLogOut(state) {
        state.user = null
        state.posts = null
    },
    setToken: (state, responseData) => {
        state.token = responseData;
    }

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}