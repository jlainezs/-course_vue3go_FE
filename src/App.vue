<template>
  <Header />
  <div>
    <router-view :key="componentKey" @success="success" @error="error" @warning="warning" @forceUpdate="forceUpdate"/>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { store } from "./components/store.js"
import notie from "notie"

const getCookie = (name) => {
  /*
  return document.cookie.split("; ").reduce((r,v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
   */
  // proposed code in course was not working properly
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return "";
}

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      store,
      componentKey: 0,
    }
  },
  beforeMount() {
    // check for a cookie
    let data = getCookie("_site_data");
    if (data !== "") {
      //console.log(data);
      let cookieData = JSON.parse(data);

      // update store
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }
  },
  mounted() {
    const payload = {
     foo: "bar",
   }

   const headers = new Headers()
   headers.append("Content-Type", "application/json");
   headers.append("Authorization", "Bearer " + store.token);

   const requestOptions = {
     method: "POST",
     body: JSON.stringify(payload),
     headers: headers,
   }

   /*
   fetch(import.meta.env.VITE_API_URL + "/admin/foo", requestOptions)
   .then((response) => response.json())
   .then((data) => {
     //console.log(data);
   });
   */
  },
  methods: {
    success(msg) {
      notie.alert({
        type: "success",
        text: msg,
      })
    },
    error(msg) {
      notie.alert({
        type: "error",
        text: msg,
      })
    },
    warning(msg) {
      notie.alert({
        type: "warning",
        text: msg,
      })
    },
    forceUpdate() {
      this.componentKey += 1;
    }
  }
}

</script>
<style>

</style>
