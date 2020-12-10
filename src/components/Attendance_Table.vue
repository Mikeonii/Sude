<template>
  <v-container class="mt-4">
    <h2 class="">Attendance Table</h2>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="search"
          max-width="500"
        ></v-text-field
      ></v-col>
    </v-row>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      multi-sort
      :search="search"
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
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Clients_Table",
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Account Number", value: "client_id" },
        { text: "Name", value: "name" },
        { text: "Date/Time", value: "date_time" }
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters({
      attendance: "attendance/attendance"
    })
  },
  created() {
    this.items = this.attendance.data;
  }
};
</script>
