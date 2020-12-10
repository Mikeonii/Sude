import axios from "axios";
export default {
    namespaced: true,
    state: {
        holidays: null,

    },
    getters: {
        // clients(state) {
        //     return state.clients;
        // },
        holidays(state) {
            return state.holidays;
        }

    },
    mutations: {
        // SET_CLIENTS(state, data) {
        //     state.clients = data;
        // },
        // SET_CLIENT(state, data) {
        //     state.client = data
        // }
        SET_HOLIDAYS(state, data) {
            state.holidays = data
        }
    },
    actions: {

        async add_holiday({ }, form) {
            let response = await axios.post("/add_holiday", form);
            return response;
        },
        async get_holiday({ commit }) {
            let response = await axios.get("/holidays");
            commit("SET_HOLIDAYS", response.data);
        }
        // async get_clients({ commit }) {
        //     let response = await axios.get("/client_list");
        //     commit("SET_CLIENTS", response.data);
        // },
        // async update_client({ }, request) {

        //     let response = await axios.put("/client", request);

        // },
        // async get_client({ commit }, client_id) {
        //     // console.log(client_id);
        //     let response = await axios.get("/client/" + client_id);
        //     commit("SET_CLIENT", response.data)
        // }
    }
};
