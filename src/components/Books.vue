<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Books</h1>
      </div>

      <hr/>

      <div>
        <div class="card-group">
          <div class="p-3 d-flex flex-wrap">
            <div v-for="b in books" :key="b.id">
              <div class="card me-2 ms-1 mb-3" style="width: 10rem;"
                v-if="b.genre_ids.includes(currentFilter) || currentFilter === 0">
                  <img :src="`${this.imgPath}/covers/${b.slug}.jpg`" class="card-img-top"
                       :alt="`cover for ${b.title}`" />
                  <div class="card-body text-center">
                    <h6 class="card-title">{{b.title}}</h6>
                    {{b.author.author_name}}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { store } from "@/components/store.js"
import Security from "@/components/security.js";

export default {
  data() {
    return {
      store,
      ready: false,
      imgPath: import.meta.env.VITE_API_IMAGE_URL,
      books: {},
      currentFilter: 0,
    }
  },
  emits: ['error'],
  beforeMount() {
    fetch(import.meta.env.VITE_API_URL + "/books", Security.requestOptions(""))
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        this.$emit("error", response.message);
      } else {
        this.books = response.data.books;
        this.ready = true;
      }
    })
    .catch(error => {
      this.$emit('error', error);
    })
  }
}
</script>
