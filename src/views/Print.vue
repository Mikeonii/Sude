<template>
  <v-container>
    <h2>Print attendance for the month of:</h2>
    <v-row>
      <v-col cols="2">
        <v-select :items="months" label="months" v-model="month"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select label="year" :items="years" v-model="year"></v-select>
      </v-col>
      <v-col cols="1">
        <v-btn @click="search"> Search</v-btn>
      </v-col>
      <v-col cols="2" v-if="this.month != null && this.year != null">
        <v-btn small color="success" @click="excel_export()">
          <v-icon class="pr-2">mdi-microsoft-excel</v-icon>

          Export</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <v-col>
        <p class="overline">Please Wait..</p>
        <v-progress-linear indeterminate></v-progress-linear
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-for="clients in clients_list">
        <Attendance_Table_3 :client="clients" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Attendance_Table_3 from "@/components/Attendance_Table3.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Print_Attendance",
  data() {
    return {
      loading: false,

      clients_list: [],
      month: null,
      year: null,

      years: [],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  components: {
    Attendance_Table_3,
  },
  computed: {},

  methods: {
    ...mapActions({
      get_client_full: "client/client_full",
    }),
    search() {
      this.loading = true;
      const month = this.months.indexOf(this.month) + 1;
      var date = { date: this.year + "-" + month };
      this.get_client_full(date).then((response) => {
        this.clients_list = response.data;
        // console.log(this.clients_list);
        this.loading = false;
      });
    },
    excel_export() {
      window.open(
        "http://127.0.0.1:8000/print_summary/" +
          (this.months.indexOf(this.month) + 1) +
          "/" +
          this.year
      );
    },
  },
  created() {
    var x;
    for (x = 2020; x <= 2030; x++) {
      this.years.push(x);
    }
  },
};
</script>
