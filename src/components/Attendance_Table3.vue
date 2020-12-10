<template>
  <v-card>
    <v-container>
      <div>
        <v-card-title>Name: {{ client[0][0].name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <p>Shift-in: {{ client[0][0].shift_in }}</p></v-col
            >
            <v-col>
              <p>Shift-out: {{ client[0][0].shift_out }}</p></v-col
            >
          </v-row>
          <v-row>
            <v-col>
              <table class="table">
                <thead>
                  <tr>
                    <th>Time in</th>
                    <th>Time out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(morning, index) in morning_array">
                    <td>
                      {{ morning }}
                    </td>

                    <td>
                      {{ afternoon_array[index] }}
                    </td>
                  </tr>
                </tbody>
              </table></v-col
            >
            <p v-if="client[1].length == 0">No Records found</p>
            <v-col v-if="client[1].length != 0" cols="4">
              <h5>First Half Total</h5>
              <div v-for="(first_half, index) in first_half_total">
                <p class="overline">{{ index }}: {{ first_half }}</p>
              </div>
              <br />
              <br />
              <h5>Second Half Total</h5>
              <div v-for="(second_half, index) in second_half_total">
                <p class="overline">{{ index }}: {{ second_half }}</p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: ["client"],
  attendances: null,
  summary: null,

  data() {
    return {
      morning_array: [],
      afternoon_array: [],
      first_half_total: null,
      second_half_total: null,
    };
  },

  computed: {},
  methods: {},
  created() {
    console.log(this.client);
    var morning = [];
    var afternoon = [];
    var first_half_total = {
      regular_time: null,
      holiday: null,
      sunday: null,
      over_time: null,
    };
    var second_half_total = {
      regular_time: null,
      holiday: null,
      sunday: null,
      over_time: null,
    };
    this.client.forEach(function(val, index) {
      val.forEach(function(val, index) {
        if (val.half == "1") {
          first_half_total.regular_time = val.regular_time;
          first_half_total.holiday = val.holiday;
          first_half_total.sunday = val.sunday;
          first_half_total.over_time = val.over_time;
        } else if (val.half == "2") {
          second_half_total.regular_time = val.regular_time;
          second_half_total.holiday = val.holiday;
          second_half_total.sunday = val.sunday;
          second_half_total.over_time = val.over_time;
        }
        if (val.is_morning == "1") {
          if (val.is_morning == null) {
            // continue;
          } else {
            morning.push(val.date_time);
          }
        } else {
          if (val.is_morning == null) {
            // continue;
          } else {
            afternoon.push(val.date_time);
          }
        }
      });
    });
    this.morning_array = morning;
    this.afternoon_array = afternoon;
    this.first_half_total = first_half_total;
    this.second_half_total = second_half_total;
    console.log(this.first_half_total);
  },
};
</script>
