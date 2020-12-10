<template>
  <v-dialog width="1000" :v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small v-bind="attrs" v-on="on" color="black" class="white--text">
        <v-icon class="mr-2">mdi-pencil</v-icon>Insert Holiday
      </v-btn>
    </template>
    <v-card>
      <v-row>
        <v-col>
          <v-card-title>Holidays</v-card-title>
          <v-card-subtitle>Holiday list</v-card-subtitle>
          <v-card-text>
            <v-data-table
              dense
              :headers="headers"
              :items="items"
              multi-sort
            ></v-data-table>
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <v-card-title>Insert Holiday</v-card-title>
          <v-card-subtitle
            >please select month,year and the name of the
            holiday</v-card-subtitle
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="holiday_name"
                label="Holiday Name"
                placeholder="ex. Bonifacio Day"
              ></v-text-field>
              <v-select
                v-model="day"
                label="Day"
                :items="days"
                placeholder="Please Select Day"
              ></v-select>

              <v-select
                v-model="month"
                :items="months"
                label="Month"
                placeholder="Please Select Month"
              ></v-select>
              <v-select
                v-model="year"
                :items="years"
                label="year"
                placeholder="Please Select Year"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="success" @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Insert_Holiday",
  data() {
    return {
      headers: [
        { text: "Holiday Name", value: "holiday_name" },
        {
          text: "Date",
          value: "date_time",
        },
        {
          text: "Created at",
          value: "created_at",
        },
      ],
      items: null,

      day: null,
      month: null,
      year: null,
      holiday_name: null,

      form: {
        holiday_name: null,
        date_time: null,
      },

      dialog: false,
      days: [],
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
  computed: {
    ...mapGetters({
      holidays: "holiday/holidays",
    }),
  },
  created() {
    var i;
    var x;
    for (i = 2010; i <= 2030; i++) {
      this.years.push(i);
    }
    for (x = 1; x <= 31; x++) {
      this.days.push(x);
    }
    this.items = this.holidays.data;
  },
  methods: {
    ...mapActions({
      add_holiday: "holiday/add_holiday",
    }),
    submit() {
      //   this.dialog = true;
      const month = this.months.indexOf(this.month) + 1;

      (this.form.holiday_name = this.holiday_name),
        (this.form.date_time = this.year + "-" + month + "-" + this.day),
        this.add_holiday(this.form).then((data) => {
          alert(data.data);
          this.$refs.form.reset();
          // add to table
          this.items.push(this.form);
        });
    },
  },
};
</script>
