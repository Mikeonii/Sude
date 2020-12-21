import axios from "axios";
export default {
    namespaced: true,
    state: {
        clients: null,
        client: null,
        full: null,

    },
    getters: {
        clients(state) {
            return state.clients;
        },
        client(state) {
            return state.client;
        },
        full(state) {
            return state.full;
        },

    },
    mutations: {
        SET_CLIENTS(state, data) {
            state.clients = data;
        },
        SET_CLIENT(state, data) {
            state.client = data
        },
        SET_CLIENT_FULL(state, data) {
            state.full = data
        },

    },
    actions: {

        async create_clients() {

            let response = await axios.get('/create_clients');
            return response.data;
        },

        async client_full({ }, request) {

            let response = await axios.post('/client_full_info', request)
            return response
        },
        async get_clients({ commit }) {
            let response = await axios.get("/client_list");
            commit("SET_CLIENTS", response.data);
        },
        async update_client({ }, request) {

            let response = await axios.put("/client", request);

        },
        async get_client({ commit }, client_id) {
            // console.log(client_id);
            let response = await axios.get("/client/" + client_id);
            commit("SET_CLIENT", response.data)
        }
    }
};
