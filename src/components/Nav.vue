<template>
  <!-- nav drawer -->
  <v-navigation-drawer app class="green darken-3">
    <v-list>
      <template>
        <v-list-item>
          <v-list-item-avatar>
            <img src="http://getdrawings.com/img/face-silhouette-maker-2.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="white--text text--lighten-4 "
              >Welcome to SDTRS</v-list-item-title
            >
            <v-list-item-subtitle class="blue--text text--lighten-3"
              >Daily Time Record System</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn
              :loading="create_clients_loading"
              :disabled="!create_ready"
              small
              dark
              color="success"
              @click="create"
            >
              <v-icon class="mr-2">mdi-face</v-icon>{{ entry }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="white--text">
            <Delete_Double_Entry_Dialog />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="white--text">
            <v-btn small color="primary" route :to="link.route"
              ><v-icon class="mr-2">mdi-book</v-icon>Attendance Summary</v-btn
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <Calculate_Summary />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="white--text">
            <Insert_Holiday v-if="ready" />
          </v-list-item-content>
        </v-list-item>
        <p class="container white--text caption mt-14">
          <v-icon>mdi-alert-circle</v-icon>
          Note: You can always delete the current attendance rows after printing
          or viewing to achieve maximum performance.
        </p>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import Delete_Double_Entry_Dialog from "./Delete_Double_Entry_Dialog.vue";
import Insert_Holiday from "./Insert_Holiday.vue";
import Calculate_Summary from "./Calculate_Summary.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Nav",
  components: {
    Calculate_Summary,
    Delete_Double_Entry_Dialog,
    Insert_Holiday,
  },
  data() {
    return {
      create_clients_loading: false,
      entry: null,
      ready: false,
      create_ready: null,
      link: {
        route: "/print_all",
      },
    };
  },
  methods: {
    export_attendance() {
      alert("exported");
    },
    ...mapActions({
      get_holiday: "holiday/get_holiday",
      get_clients: "client/get_clients",
      get_attendance: "attendance/get_attendance",
      create_clients: "client/create_clients",
    }),
    create() {
      this.create_clients_loading = true;
      this.create_clients().then((data) => {
        alert(data);
        this.create_clients_loading = false;
        window.location.reload();
      });
    },
  },
  created() {
    this.get_attendance().then(() => {
      if (this.attendances.data.length == 0) {
        this.create_ready = false;
      } else {
        this.create_ready = true;
      }
    });

    this.get_holiday().then(() => {
      this.ready = true;
    });
    this.get_clients().then(() => {
      if (this.clients.data.length == 0) {
        this.entry = "Create Clients";
      } else {
        this.entry = "Update Clients";
      }
    });
  },
  computed: {
    ...mapGetters({
      holidays: "holiday/holidays",
      clients: "client/clients",
      attendances: "attendance/attendance",
    }),
  },
};
</script>
