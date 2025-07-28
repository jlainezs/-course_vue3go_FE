<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Add/Edit Book</h1>
        <hr/>
        <form-tag @bookEditEvent="submitHandler" name="bookForm" event="bookEditEvent">
          <div v-if="this.book.slug !== ''" class="mb-3">
            <img :src="`{this.imgPath}/covers/${this.book.slug}.jpg`" class="img-fluid img-thumbnal book-cover" alt="cover" />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Cover image</label>
            <input v-if="this.book.id === 0" ref="coverInput"
                 class="form-control" type="file" id="formFile" required accept="image/jpeg" @change="loadCoverImage" />
            <input v-else ref="coverInput"
                 class="form-control" type="file" id="formFile" required accept="image/jpeg" @change="loadCoverImage" />
          </div>

          <text-input v-model="book.title" type="text" required="true" label="Title" name="title" :value="book.title" />
          <select-input name="author_id" v-model="this.book.author_id" :items="this.authors" required="required" label="Author" />

          <text-input v-model="book.publication_year" type="text" required="true" label="Publication Year" name="publication_year" :value="book.publication_year" />

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea required v-model="book.description" class="form-control" id="description" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="genres" class="form-label">Genres</label>
            <select ref="genres"
                    class="form-select"
                    id="genres"
                    required
                    size="7"
                    v-model="this.book.genre_ids"
                    multiple>
              <option v-for="g in this.genres" :value="g.value" :key="g.value">{{g.text}}</option>
            </select>
          </div>

          <hr/>

          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save" />
            <router-link to="/admin/books" class="btn btn-outline-secondary">Cancel</router-link>
          </div>
          <div class="float-end">
            <a v-if="this.book.id > 0"  class="btn btn-danger" href="javascript:void(0);" @click="confirmDelete(this.book.id)">
              Delete
            </a>
          </div>

        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import Security from "./security.js";
import FormTag from "@/components/forms/FormTag.vue";
import SelectInput from "@/components/forms/SelectInput.vue";
import TextInput from "@/components/forms/TextInput.vue";

export default {
  name: "BookEdit",
  components: {
    'text-input': TextInput,
    'form-tag': FormTag,
    'select-input': SelectInput
  },
  data() {
    return {
      book: {
        id: 0,
        title: "",
        description: "",
        publication_year: 0,
        author_id: 0,
        genres: [],
        genre_ids: [],
        slug: "",
        cover: "",
      },
      authors: [],
      imgPath: import.meta.env.VITE_API_IMAGE_URL,
      genres: [
        {value: 1, text: "Science fiction"},
        {value: 2, text: "Fanatasy"},
        {value: 3, text: "Romance"},
        {value: 4, text: "Thriller"},
        {value: 5, text: "Mystery"},
        {value: 6, text: "Horror"},
        {value: 7, text: "Classic"},
      ],
    }
  },
  beforeMount() {
    Security.requireToken();
  },
  methods:{
    submitHandler(){

    },
    loadCoverImage(){

    },
    confirmDelete(id){

    }
  }
}
</script>
