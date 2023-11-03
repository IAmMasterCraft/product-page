<template>
  <div class="zoom-viewer" v-if="isOpen">
    <div class="zoom-content">
      <button class="close-button" @click="closeViewer">Close</button>

      <div class="tabs">
        <button @click="switchTo('images')" :class="{ active: activeTab === 'images' }">Images</button>
        <button @click="switchTo('videos')" :class="{ active: activeTab === 'videos' }">Videos</button>
      </div>

      <div class="viewer">
        <template v-if="activeTab === 'images'">
          <img
            :src="selectedMedia"
            alt="Zoomed Image"
            @click="zoomOut"
            @mouseover="zoomIn"
            @mouseleave="zoomOut"
          />
          <div class="thumbnails">
            <div v-for="image in product.images" :key="image.id">
              <img :src="image.thumbnail" @click="selectMedia(image.standard)" />
            </div>
          </div>
        </template>

        <template v-else>
          <video
            ref="videoPlayer"
            controls
            :src="selectedMedia"
            @click="zoomOut"
            @mouseover="zoomIn"
            @mouseleave="zoomOut"
          ></video>
          <div class="thumbnails">
            <div v-for="video in product.videos" :key="video.id">
              <img :src="video.thumbnail" @click="selectMedia(video.source)" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isOpen: Boolean,
    activeTab: String,
  },
  data() {
    return {
      selectedMedia: '',
      zoomedIn: false,
    };
  },
  methods: {
    // Methods remain the same as in the previous code
  },
};
</script>

<style scoped>
.zoom-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.zoom-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}

.close-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.tabs button {
  background: none;
  border: none;
  font-size: 16px;
  padding: 5px 10px;
  cursor: pointer;
}

.tabs button.active {
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

.viewer img,
.viewer video {
  max-width: 100%;
  height: auto;
}

.thumbnails {
  display: flex;
  justify-content: center;
}

.thumbnails img {
  width: 60px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

/* You can further customize these styles as needed */
</style>
