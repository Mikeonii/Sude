<template>
  <v-row>
    <v-col>
      <v-card class="pa-4 white--text" max-width="300" color="green darken-2">
        <v-container>
          <h2>Total Clients:</h2>
          <p class="display-2">{{ total_clients }}</p>
        </v-container></v-card
      ></v-col
    >
    <v-col>
      <v-card class="pa-4 white--text" max-width="300" color="green darken-2">
        <v-container>
          <h2>Total Attendance:</h2>
          <p class="display-2">{{ total_attendance }}</p>
        </v-container>
      </v-card></v-col
    >
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Database_Summary",
  data() {
    return {
      total_attendance: 0,
      total_clients: 0
    };
  },
  computed: {
    ...mapGetters({
      attendance: "attendance/attendance",
      clients: "client/clients"
    })
  },
  created() {
    this.total_attendance = this.attendance.data.length;
    this.total_clients = this.clients.data.length;
  }
};
</script>
