import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB0vLbpjfaebfLMBh0bOtqWbRvB-g9fuEM",
    libraries: "places"
  }
});
