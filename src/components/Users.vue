<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Users</h1>
      </div>
      <hr/>
      <table v-if="this.ready" class="table table-compact table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`">
                {{ u.last_name }}, {{ u.first_name }}
              </router-link>
            </td>
            <td>{{ u.email }}</td>
            <td v-if="u.active === 1">
              <span class="badge bg-success">Active</span>
            </td>
            <td v-else>
              <span class="badge bg-danger">Inactive</span>
            </td>
            <td v-if="u.token.id > 0">
              <a href="javascript:void(0);">
                <span class="badge bg-success" @click="logUserOut(u.id)">Logged in</span>
              </a>
            </td>
            <td v-else>
              <span class="badge bg-danger">Not logged in</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        ...
      </p>
    </div>
  </div>
</template>

<script>
import Security from "./security.js";
import notie from 'notie'
import {store} from "@/components/store.js";

export default {
  data() {
    return {
      users: [],
      ready: false,
      store,
    }
  },
  beforeMount() {
    Security.requireToken();
    fetch(import.meta.env.VITE_API_URL + "/admin/users", Security.requestOptions(""))
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        this.$emit("error, response.message");
      } else {
        this.users = response.data.users;
        this.ready = true;
      }
    })
    .catch((error) => {
      notie.alert({
        type: "error",
        text: error,
      })
    })
  },
  methods: {
    logUserOut(id) {
      if (id !== store.user.id) {
        notie.confirm({
          text: "Are you sure you want to log this user out?",
          submitText: "Log out",
          submitCallback: () => {
            console.log("will log out", id);
            fetch(import.meta.env.VITE_API_URL + "/admin/log-user-out/" + id, Security.requestOptions(""))
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                this.$emit('error', data.message);
              } else {
                this.$emit('success', data.message);
                this.$emit('forceUpdate');
              }
            })
          }
        });
      } else {
        this.$emit("error", "You cannot log out yourself.");
      }
    }
  },
}
</script>
