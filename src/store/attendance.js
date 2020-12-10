import axios from "axios";
export default {
    namespaced: true,
    state: {
        attendance: null,
        single_attendance: null,
        attendance_individual_summary: null,
    },
    getters: {
        attendance(state) {
            return state.attendance;
        },
        individual_attendance(state) {
            return state.single_attendance
        },
        attendance_individual_summary(state) {
            return state.attendance_individual_summary
        }
    },
    mutations: {
        SET_ATTENDANCE(state, data) {
            state.attendance = data;
        },
        SET_INDIVIDUAL_ATTENDANCE(state, data) {
            state.single_attendance = data;
        },
        SET_ATTENDANCE_INDIVIDUAL_SUMMARY(state, data) {
            state.attendance_individual_summary = data
        }
    },
    actions: {

        async calculate_summary({ }, form) {
            let response = await axios.post("/calculate_summary", form);
            return response;
        },

        async get_individual_attendance_summary({ commit }, client_id) {

            let response = await axios.get("/get_attendance_summary/" + client_id);
            commit("SET_ATTENDANCE_INDIVIDUAL_SUMMARY", response.data);
        },

        async delete_double_entry({ }, request) {
            let year = request.year;
            let month = request.month
            let response = await axios.delete("/delete_double_entry/" + year + '/' + month);
            alert(response.data);

        },

        async upload_attendance({ }, file) {

            let response = await axios.post("/import", file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        },
        async get_attendance({ commit }) {
            let response = await axios.get("/attendance_list");
            commit("SET_ATTENDANCE", response.data);
        },
        async get_individual_attendance({ commit }, client_id, date) {
            // console.log(client_id);
            let response = await axios.get("/attendance_individual_list/" + client_id);
            commit("SET_INDIVIDUAL_ATTENDANCE", response.data);
        }
    }
};
