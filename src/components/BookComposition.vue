<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <img v-if="ready" class="img-fluid img-thumbnail" :src="`${imgPath}/covers/${book.slug}.jpg`" alt="cover for {{book.title}}"/>
      </div>
      <div class="col-md-10">
        <template v-if="ready">
          <h3 class="mt-3">{{ book.title }}</h3>
          <p>
            <strong>Author:</strong> {{ book.author.author_name }}<br/>
            <strong>Published</strong> {{ book.publication_year }}<br/>
          </p>
          <p>
            {{ book.description }}
          </p>
        </template>
        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Security from "@/components/security.js";

export default {
  name: "BookComposition",
  emits: ["error"],
  props: {},
  setup(props, ctx) {
    let ready = ref(false);
    const imgPath = ref(import.meta.env.VITE_API_IMAGE_URL);
    let book = ref({});
    const route = useRoute();

    onMounted(() => {
      console.log("using books with composition api");
      fetch(import.meta.env.VITE_API_URL + "/books/" + route.params.bookName)
        .then(response => response.json())
        .then((data) => {
          if (data.error) {
            ctx.emit('error', data.message);
          } else {
            book.value = data.data;
            ready.value = true;
          }
        })
        .catch(error => {
          ctx.emit('error', error);
        })
    })

    return {
      ready,
      imgPath,
      book,
    }
  }
}
</script>
