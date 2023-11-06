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
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedVideo: '',
      zoomedIn: false,
    };
  },
  methods: {
    selectVideo(video) {
      this.selectedVideo = video.source;
    },
    openZoomViewer() {
      //
    },
    zoomIn() {
      this.zoomedIn = true;
      this.$refs.videoPlayer.play();
    },
    zoomOut() {
      this.zoomedIn = false;
      this.$refs.videoPlayer.pause();
    },
  },
};
</script>
