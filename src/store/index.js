import Vue from "vue";
import Vuex from "vuex";
import attendance from "./attendance";
import client from "./client";
import holiday from "./holiday";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { attendance, client, holiday }
});
