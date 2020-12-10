<template>
  <v-card>
    <v-card-title><h2 class="">Attendance Table</h2></v-card-title>
    <v-card-text>
      <v-col cols="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="search"
          max-width="500"
        ></v-text-field
      ></v-col>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        multi-sort
        :search="search"
        dense
      >
        <template v-slot:[`item.actions`]="{}">
          <v-icon small class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon small>
            mdi-delete
          </v-icon>
        </template></v-data-table
      >
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Attendance_Table",
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Account Number", value: "client_id" },
        { text: "Name", value: "name" },
        { text: "Date/Time", value: "date_time" },
      ],
      items: [],
    };
  },
  computed: {
    ...mapGetters({
      attendance: "attendance/individual_attendance",
    }),
  },
  created() {
    this.items = this.attendance.data;
  },
};
</script>
