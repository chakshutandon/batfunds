import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const base_url = "http://batfunds.herokuapp.com"

export const store = new Vuex.Store({
    state: {
        groups: [],
        members: [],
        currentGroup: {},
        paymentFlags: [],
    },
    actions: {
        LOAD_GROUPS: (context) => {
            axios.get(`${base_url}/api/user/groups/`).then((response) => {
                context.commit('SET_GROUPS', response.data)
            }), (err) => {
                console.log(err)
            }
        },
        CREATE_GROUP: (context, group) => {
            axios.post(`${base_url}/api/groups`, {
                name: group.name,
                desc: group.desc,
            }).then((response) => {
                context.dispatch('LOAD_GROUPS')
            }), (err) => {
                console.log(err)
            }
        },
        LOAD_MEMBERS: (context, group) => {
            axios.get(`${base_url}/api/groups/${group.gid}/users`).then((response) => {
                context.commit('SET_MEMBERS', response.data)
            }), (err) => {
                console.log(err)
            }
        },
        SET_CURRENT_GROUP: (context, group) => {
            context.commit('SET_CURRENT_GROUP', group)
        },
        ADD_MEMBER_TO_GROUP: (context, params) => {
            axios.post(`${base_url}/api/groups/member/`, {
                username: params.username,
                gid: params.group.gid,
            }).then((response) => {
                context.dispatch('LOAD_MEMBERS', params.group)
            }), (err) => {
                console.log(err)
            }
        },
        LOAD_PAYMENT_FLAGS: (context, gid) => {
            axios.get(`${base_url}/api/paymentflags/${gid}`).then((response) => {
                context.commit('LOAD_PAYMENT_FLAGS', response.data)
            }), (err) => {
                console.log(err)
            }
        },
        CREATE_PAYMENT_FLAG: (context, params) => {
            axios.post(`${base_url}/api/raisepayment`, {
                gid: params.gid,
                amount: params.amount,
                due: '2019-01-01'
            }).then((response) => {
                
            }), (err) => {
                console.log(err)
            }
        },
        DELETE_GROUP: (context, gid) => {
            axios.delete(`${base_url}/api/groups/member/${gid}`).then((response) => {
                context.dispatch('LOAD_GROUPS')
            }), (err) => {
                console.log(err)
            }
        }
    },
    mutations: {
        SET_GROUPS: (state, data) => {
            state.groups = data.groups;
            state.currentGroup = state.groups[0]
        },
        SET_MEMBERS: (state, data) => {
            state.members = data.users;
        },
        SET_CURRENT_GROUP: (state, group) => {
            state.currentGroup = group;
        },
        LOAD_PAYMENT_FLAGS: (state, flags) => {
            state.paymentFlags = flags;
        },
    },
})