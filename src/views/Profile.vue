<template>
  <div>
    <v-row>
      <v-col cols="2"
        ><h2 class="mb-4">PROFILE <span>VIEW</span></h2></v-col
      >
      <v-col cols="1"
        ><v-btn color="success" route :to="link.route">Dashboard</v-btn></v-col
      >
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="3"> <Profile_Table v-if="ready"/></v-col>
      <v-col cols="8"> <Attendance_Table2 v-if="ready1"/></v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Profile_Table from "@/components/Profile_Table.vue";
import Attendance_Table2 from "@/components/Attendance_Table2.vue";
export default {
  name: "Profile",
  components: {
    Profile_Table,
    Attendance_Table2,
  },

  data() {
    return {
      ready: false,
      ready1: false,
      id: this.$route.params.id,
      link: {
        route: "/",
      },
    };
  },

  methods: {
    ...mapActions({
      get_client: "client/get_client",
      get_individual_attendance: "attendance/get_individual_attendance",
    }),
  },
  created() {
    this.get_client(this.id).then(() => {
      this.ready = true;
    });
    this.get_individual_attendance(this.id).then(() => {
      this.ready1 = true;
    });
  },
};
</script>
