<template>
  <div class="attractions-grid">
    <div class="attraction-item" v-for="attraction in attractions" :key="attraction.at_id">
      <img :src="attraction.image_url" alt="Attraction Image" />
      <h3 class="attraction-name">{{ attraction.name }}</h3>
      <p class="attraction-description">{{ attraction.description }}</p>
      <router-link :to="'/attractions/' + attraction.at_id">
        <button>View Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttractionCard",
  props: ['attractions'],
}
</script>

<style scoped>
.attractions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as needed */
  gap: 20px; /* Adjust the gap between items as needed */
}

.attraction-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.attraction-item img {
  max-width: 100%;
  height: auto;
}
</style>
