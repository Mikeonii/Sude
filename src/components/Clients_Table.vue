<template>
  <v-container class="mt-4">
    <h2 class="">Clients Table</h2>

    <v-row>
      <v-col cols="1">
        <p class="label">Reshift Schedule</p>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="shift_in"
          append-icon="mdi-clock"
          :items="hours"
          name="from"
          label="Log-in Time"
          return-object
          item-value="name"
        />
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="shift_out"
          append-icon="mdi-clock"
          :items="hours"
          name="to"
          label="Log-out Time"
          return-object
          item-value="name"
          @change="check_reshift()"
        />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="search"
          max-width="500"
        ></v-text-field
      ></v-col>
    </v-row>

    <v-data-table
      dense
      v-model="selected"
      :headers="headers"
      :items="items"
      multi-sort
      :search="search"
    >
      <template v-slot:[`item.actions0`]="{ item }">
        <v-chip class="ma-2" color="green" outlined @click="straight(item)">
          <span v-if="item.is_straight == '0'">Not Straight</span>
          <span v-else>Straight</span>
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-chip
          :disabled="ready_shift"
          class="ma-2"
          color="green"
          outlined
          @click="reshift(item)"
        >
          Reshift
        </v-chip>
      </template>
      <template v-slot:[`item.actions2`]="{ item }">
        <v-icon class="mr-2" @click="view_profile(item)" color="primary"
          >mdi-face</v-icon
        >
        <caption>
          Profile
        </caption>
      </template>
      <template v-slot:[`item.actions3`]="{ item }">
        <v-icon class="mr-2" @click="view_profile(item)" color="error"
          >mdi-delete</v-icon
        >
        <caption>
          Delete
        </caption>
      </template></v-data-table
    >
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Clients_Table",
  data() {
    return {
      is_straight: "0",
      edit_index: -1,
      edit_item: [],
      ready_shift: true,
      shift_in: null,
      shift_out: null,
      selected: [],
      search: "",
      headers: [
        { text: "", value: "actions0" },
        { text: "", value: "actions" },
        { text: "", value: "actions2" },
        { text: "", value: "actions3" },
        { text: "Account Number", value: "id" },
        { text: "Name", value: "name" },
        { text: "Shift-in Time", value: "shift_in" },
        { text: "Shift-out Time:", value: "shift_out" },
      ],
      items: null,
      hours: [],
    };
  },
  computed: {
    ...mapGetters({
      clients: "client/clients",
    }),
  },
  created() {
    this.items = this.clients.data;
    var x = 0;
    for (var i = 1; i <= 24; i++) {
      x += 1;
      this.hours.push(x);
    }
  },
  methods: {
    async straight(item) {
      const form = {
        client_id: item.id,
        is_straight: !item.is_straight,
        shift_in: item.shift_in,
        shift_out: item.shift_out,
      };
      let response = await axios.put("/client", form);
      const index = this.items.indexOf(item);
      this.items[index].is_straight = response.data;
    },
    view_profile(item) {
      this.$router.push("/profile/" + item.id);
    },
    delete_client(item) {
      console.log("delete");
      console.log(item);
    },
    ...mapActions({
      update_client: "client/update_client",
    }),
    reshift(item) {
      const request = {
        client_id: item.id,
        shift_in: this.shift_in,
        shift_out: this.shift_out,
      };

      this.update_client(request).then(() => {
        this.edit_index = this.items.indexOf(item);
        (item.shift_in = this.shift_in), (item.shift_out = this.shift_out);
        Object.assign(this.items[this.edit_index], item);
        alert("successfuly updated");
      });
    },
    check_reshift() {
      if (this.shift_in) {
        this.ready_shift = false;
      }
    },
  },
};
</script>
