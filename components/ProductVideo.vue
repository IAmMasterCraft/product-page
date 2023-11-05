<template>
  <div>
    <!-- Display product video -->
    <video
      ref="videoPlayer"
      controls
      :src="selectedVideo"
      @click="openZoomViewer"
      @mouseover="zoomIn"
      @mouseleave="zoomOut"
    ></video>

    <!-- Add thumbnails for video selection -->
    <div class="thumbnails">
      <div v-for="video in product.videos" :key="video.id">
        <img :src="video.thumbnail" @click="selectVideo(video)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductVideoComponent',
  props: {
    product: Object, // The product data, including videos
  },
  data() {
    return {
      selectedVideo: '', // Currently selected video
      zoomedIn: false, // Flag for video zoom
    };
  },
  methods: {
    selectVideo(video) {
      // Update the selected video
      this.selectedVideo = video.source;
    },
    openZoomViewer() {
      // Open the ZoomViewer component with the selected video
      // You'll implement this functionality later
    },
    zoomIn() {
      // Implement video zoom-in logic
      this.zoomedIn = true;
      this.$refs.videoPlayer.play(); // Auto-play video when zoomed in (optional)
    },
    zoomOut() {
      // Implement video zoom-out logic
      this.zoomedIn = false;
      this.$refs.videoPlayer.pause(); // Pause video when zoomed out (optional)
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
