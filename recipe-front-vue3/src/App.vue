<template>
  <div>
    <table border="1">
    <caption>
    All Recipes
    </caption>
      <tr>
        <th>Name</th>
        <th></th>
      </tr>
      <tr v-for="recipe in recipes" :key="recipe.id">
      <td> {{ recipe.name }}</td>
      <td><button @click="recipeDetailId = recipe.id">Show details</button></td>
      </tr>
    </table>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Recipe Details</h3>
      </template>
      <template #body>
        <b>Name: </b>{{ currentRecipe.name }} <br />
        <b>Ingredients Amount: </b>{{ currentRecipe.ingredientsAmount }} <br />
        <b>How To Make: </b>{{ currentRecipe.howToMake }} <br />
        <b>Picture url: </b>{{ currentRecipe.pictureURL }} <br />
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from "./components/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      recipes: [],
      showModal: false,
      recipeDetailId: 0,
      currentRecipe: {
        id: 0, 
        name:"", 
        ingredientsAmount:"", 
        howToMake:"",
        pictureURL:"",
      },
    };
  },
  async created() {
    this.recipes = await (await fetch("http://localhost:8090/recipes")).json();
  },
  watch: {
    async recipeDetailId(newId) {
      this.currentRecipe = await (await fetch(`http://localhost:8090/recipes/${newId}`)).json();
      this.showModal = true;
    },
  },
};

</script>



<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
