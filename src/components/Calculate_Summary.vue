<template>
  <v-dialog width="500" :v-model="dialog" :persistent="processing">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small v-bind="attrs" v-on="on" color="" class="">
        <v-icon class="mr-2">mdi-pencil</v-icon>Calculate Summary
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Calculate Attendance Summary</v-card-title>
      <v-card-subtitle>please select month and year</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-select
            :disabled="processing"
            v-model="form.month"
            :items="months"
            label="month"
            placeholder="Please Select Month"
          ></v-select>
          <v-select
            :disabled="processing"
            v-model="form.year"
            :items="years"
            label="year"
            placeholder="Please Select Year"
          ></v-select>
          <v-select
            :disabled="processing"
            v-model="form.half"
            :items="half"
            label="half"
            placeholder="Please Select Half"
          ></v-select>
        </v-form>
        <template v-if="processing"
          ><p class="overline">{{ notification_text }}</p>
          <v-progress-linear
            color="lime"
            indeterminate
            reverse
          ></v-progress-linear
        ></template>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn :disabled="processing" color="success" @click="submit"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Calculate_Summary",
  data() {
    return {
      form: {
        month: null,
        year: null,
        half: null,
      },
      notification_text: "Calculating Summary...",
      processing: false,
      dialog: false,
      half: ["1", "2"],
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
  created() {
    var i;
    var x;
    for (i = 2020; i <= 2030; i++) {
      this.years.push(i);
    }
  },
  methods: {
    ...mapActions({
      calculate_summary: "attendance/calculate_summary",
    }),
    submit() {
      const month = this.months.indexOf(this.form.month) + 1;
      this.form.month = month;
      this.processing = true;
      this.calculate_summary(this.form).then((data) => {
        alert("Action Completed!");
        this.processing = false;
        this.$refs.form.reset();
      });
    },
  },
};
</script>
