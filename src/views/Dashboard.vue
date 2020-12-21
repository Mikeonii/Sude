<template>
  <div class="home">
    <v-container>
      <h1>Dashboard <span class="font-weight-light">SUDECOR</span></h1>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="4"> <Upload_Form /></v-col>
        <v-col cols="7">
          <Database_Summary v-if="ready" class="mr-11" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7"><Clients_Table v-if="ready" max-width="300"/></v-col>
      </v-row>

      <v-dialog v-model="dialog" width="300">
        <v-card>
          <v-card-text>
            <p class="overline">{{ notification_text }}</p>
            <v-progress-linear
              color="lime"
              indeterminate
              reverse
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Upload_Form from "@/components/Upload_Form.vue";
import Database_Summary from "@/components/Database_Summary.vue";
import Clients_Table from "@/components/Clients_Table.vue";
import Attendance_Table from "@/components/Attendance_Table.vue";
import Delete_Double_Entry_Dialog from "@/components/Delete_Double_Entry_Dialog.vue";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    Upload_Form,
    Database_Summary,
    Clients_Table,
    Attendance_Table,
    Delete_Double_Entry_Dialog,
  },
  data() {
    return {
      dialog: true,
      loading: true,
      ready: false,
      notification_text: "please wait",
    };
  },
  methods: {
    ...mapActions({
      get_attendance: "attendance/get_attendance",
      get_clients: "client/get_clients",
      get_holiday: "holiday/get_holiday",
    }),
  },

  created() {
    this.get_attendance();

    this.get_clients().then(() => {
      this.ready = true;
      this.dialog = false;
      this.loading = false;
    });
  },
};
</script>
