<template>
<Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="recipeDetailId != 0" @close="$emit('close')">
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
import Modal from "./Modal.vue";
export default {
    
    components: {
        Modal,
    },
    props: {
        recipeDetailId: {
            type: Number,
            required: true,
    }
},
emits: ["close"],
data() {
    return {
      currentRecipe: {
        id: 0, 
        name:"", 
        ingredientsAmount:"", 
        howToMake:"",
        pictureURL:"",
      },
    };
  },
  beforeUpdate() {
    if (this.recipeDetailId == 0)  return;
    this.getDetails()
  },
methods: {
    async getDetails() {
      this.currentRecipe = await (
        await fetch(`http://localhost:8090/recipes/${this.recipeDetailId}`)
            ).json();
        },
    },
};
</script>

<style>
.modal-container {
  width: 700px;
}
  </style>