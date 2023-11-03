<template>
  <div>
    <!-- Display product image -->
    <img :src="selectedImage" alt="Product Image" @click="openZoomViewer" @mouseover="zoomIn" @mouseleave="zoomOut" />

    <!-- Add thumbnails for image selection -->
    <div class="thumbnails">
      <div v-for="image in product.images" :key="image.id">
        <img :src="image.thumbnail" @click="selectImage(image)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedImage: '', // Currently selected image
      zoomedIn: false, // Flag for image zoom
    };
  },
  methods: {
    selectImage(image) {
      // Update the selected image
      this.selectedImage = image.standard;
    },
    openZoomViewer() {
      // Open the ZoomViewer component with the selected image
      // You'll implement this functionality later
    },
    zoomIn() {
      // Implement image zoom-in logic
      this.zoomedIn = true;
    },
    zoomOut() {
      // Implement image zoom-out logic
      this.zoomedIn = false;
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
