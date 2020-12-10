<template>
  <div>
    <v-sheet
      color="green"
      elevation="4"
      class="mx-auto white--text"
      height="583"
      width="300"
    >
      <v-container class="px-9">
        <h2 class="display-2 mt-4">{{ this.client.data[0].name }}</h2>
        <v-divider light class="my-4"></v-divider>
        <h3 class="font-weight-light">
          Client ID: <strong>{{ this.client.data[0].id }}</strong>
        </h3>
        <h3 class="font-weight-light">
          Total Attendance Row:
          <strong>{{ this.client.data[0].attendances.length }}</strong>
        </h3>
        <h3 class="font-weight-light">
          Shift-in: <strong>{{ this.client.data[0].shift_in }}:00:00</strong>
        </h3>
        <h3 class="font-weight-light">
          Shift-out: <strong>{{ this.client.data[0].shift_out }}:00:00</strong>
        </h3>
        <v-divider class="my-4"></v-divider>
        <p class="label">
          Quick attendance summary for the month of
          <span class="display-1"
            ><strong>{{ current_month }}</strong></span
          >
        </p>
        <p>Regular Time: 20 hrs.</p>
        <p>Over Time: 40 hrs.</p>
        <v-row>
          <v-col cols="6">
            <v-select
              :items="months"
              dense
              solo
              v-model="selected_month"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="years"
              dense
              solo
              v-model="selected_year"
            ></v-select
          ></v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Profile_Table",
  data() {
    return {
      current_month: null,
      selected_month: null,
      selected_year: null,
      dialog: false,
      client_array: null,
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
      years: [],
    };
  },
  computed: {
    ...mapGetters({
      client: "client/client",
      attendance_summary: "attendance/attendance_individual_summary",
    }),
  },
  created() {
    this.client_array = this.client;
    this.current_month = this.months[new Date().getMonth()];
    this.selected_month = this.current_month;

    var i;
    for (i = 2020; i <= 2030; i++) {
      this.years.push(i);
    }
    this.get_attendance_summary(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      get_attendance_summary: "attendance/get_individual_attendance_summary",
    }),
    change_month() {
      alert(this.selected_month);
    },
  },
};
</script>
