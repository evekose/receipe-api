<template>
  <div>
    <table-template 
    caption="All recipes" 
    :items="recipes" :showControls="true" 
    @show="recipeDetailId = $event.id"
    >
    </table-template>
  </div> 
  <recipe-details :recipeDetailId="recipeDetailId"
  @close="recipeDetailId = 0"
  ></recipe-details>
</template>

<script>
import TableTemplate from "./components/Table.vue";
import RecipeDetails from "./components/RecipeDetails.vue";
export default {
  components: {
    TableTemplate,
    RecipeDetails,
  },
  data() {
    return {
      recipes: [],
      recipeDetailId: 0,
      };
    },
  async created() {
    this.recipes = await (await fetch("http://localhost:8090/recipes")).json();
  },
  watch: {
    async recipeDetailId(newId) {
      if (newId == 0) return;
      this.currentRecipe = await (await fetch(`http://localhost:8090/recipes/${newId}`)).json();
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
