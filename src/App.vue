<template>
  <v-app>
    <v-app-bar app color="green darken-4" dark>
      <div class="d-flex align-center">
        <h2>
          SUDECOR<span class="overline ml-1"> Daily Time Record System</span>
        </h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">Help</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- navbar -->
    <Navbar />
    <v-main>
      <router-view class="ml-5 mt-5"></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Footer from "@/components/Footer";
import Navbar from "@/components/Nav";
export default {
  name: "App",

  components: {
    Navbar,
    Footer,
  },

  data: () => ({
    
  }),
};
</script>
