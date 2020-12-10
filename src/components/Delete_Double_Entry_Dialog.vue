<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small v-bind="attrs" v-on="on" dark color="warning">
        <v-icon class="mr-2">mdi-refresh</v-icon>Delete Double Entry
      </v-btn>
    </template>
    <v-card>
      <v-card-title color="warning"> <h2>Delete Double Entry</h2></v-card-title>
      <v-card-subtitle class="mt-2">
        Note: This will delete "ALL" the double entries from the Attendance
        Table based on the Year and Month below.
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="mx-5">
          <v-col
            ><v-form>
              <label for="">Year</label>
              <v-select
                v-model="form.year"
                name="year"
                :items="year"
                label="Select a Year"
              ></v-select>
              <label for="">Month</label>
              <v-select
                v-model="selected_month"
                name="month"
                :items="months"
                label="Select a Month"
                @change="get_month_index()"
              ></v-select>
            </v-form>
          </v-col>
        </v-row>
        <v-card color="primary" dark v-if="loading">
          <v-card-text>
            Please stand by...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="red white--text" :loading="loading" text @click="del"
          ><v-icon small class="mr-2">mdi-delete</v-icon>Delete</v-btn
        ><v-btn
          color="primary"
          text
          @click="dialog = false"
          :disabled="disabled"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      disabled: false,
      loading: false,
      dialog: false,
      year: [],
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
      selected_month: null,
      form: {
        year: null,
        month: null,
      },
    };
  },
  created() {
    var i;
    for (i = 2020; i <= 2030; i++) {
      this.year.push(i);
    }
  },
  methods: {
    ...mapActions({
      delete_double_entry: "attendance/delete_double_entry",
    }),
    del() {
      this.loading = true;
      this.disabled = true;
      this.delete_double_entry(this.form).then(() => {
        this.loading = false;
        this.disabled = false;
        window.location.reload();
      });
    },
    get_month_index() {
      this.form.month = this.months.indexOf(this.selected_month) + 1;
      console.log(this.form.month);
    },
  },
};
</script>
