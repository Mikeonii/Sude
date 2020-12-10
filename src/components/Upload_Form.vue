<template>
  <v-card class="pa-4" max-width="400">
    <v-container>
      <v-form>
        <p>Import Excel Attendance File</p>
        <v-file-input
          chips
          label="XLXS Document Format"
          v-model="file"
        ></v-file-input>
        <v-btn
          color="success"
          :loading="loading"
          @click="submit"
          :disabled="disabled"
          >Upload</v-btn
        >
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      file: null,
      disabled: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      upload_attendance: "attendance/upload_attendance",
    }),
    submit() {
      let formdata = new FormData();
      formdata.append("file", this.file);

      if (this.file != null) {
        this.disabled = true;
        this.loading = true;
        this.upload_attendance(formdata).then(() => {
          this.disabled = false;
          this.loading = false;
          alert("File uploaded successfully!");
          window.location.reload();
        });
      } else {
        alert("please insert file");
      }
    },
  },
};
</script>
