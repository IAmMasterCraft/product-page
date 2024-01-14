<template>
  <div
    class="popup-viewer fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="h-full w-full md:w-[55rem] bg-white shadow-lg m-5 md:my-0 md:mx-20 max-h-[90%] md:max-h-[33rem] relative"
    >
      <!-- Close Button -->
      <button
        @click="closePopup"
        class="absolute top-0 right-0 border-[#c53030] border-[1px] text-[#c53030] rounded-md font-semibold text-lg cursor-pointer m-2 px-2"
      >
        &times;
      </button>

      <!-- Tabs for Desktop View -->
      <div class="flex gap-5 w-full border-b transition-all duration-300 ease-in-out">
        <div
          class="py-3 px-8 cursor-pointer hover:border-b hover:border-b-blue-800 hover:font-semibold hover:text-blue-800"
          :class="{
            'border-b border-b-blue-800 font-semibold text-blue-800': isImage,
          }"
          @click="selectTab('Images')"
        >
          Images
        </div>
        <div
          class="py-3 px-8 cursor-pointer hover:border-b hover:border-b-blue-800 hover:font-semibold hover:text-blue-800"
          :class="{
            'border-b border-b-blue-800 font-semibold text-blue-800': !isImage,
          }"
          @click="selectTab('Videos')"
        >
          Videos
        </div>
      </div>

      <!-- Media Display -->
      <div class="media-display p-4 border-b h-full w-full">
        <div class="flex flex-col md:flex-row gap-10 w-full overflow-hidden">
          <div class="w-full md:w-2/3 h-[25rem] overflow-hidden">
            <img
              v-if="isImage"
              :src="media"
              class="max-h-[100%] max-w-[100%] object-contain m-auto block"
              :class="{'cursor-zoom-in': !zoomed, 'cursor-zoom-out scale-[3]': zoomed}"
              @click="toggleZoom"
              @touchend="handleDoubleTap"
              @mousemove="handleMouseMove"
              ref="image"
              :style="zoomStyles"
            />
            <div v-else-if="!isImage" class="relative pt-[56.25%]">
              <video
                :src="media"
                class="max-h-[100%] max-w-[100%] m-auto block absolute top-0 left-0 w-full h-full"
                controls
              ></video>
            </div>
          </div>
          <div class="w-full md:w-1/3">
            <product-info :product="product" :forPopup="true" class="w-full" />
            <!-- Thumbnails for Images -->
            <thumbnails :thumbnails="imageThumbnails" :currentMediaSource="mediaSource" @thumbnailSelected="thumbnailSelected" v-if="isImage" />

            <!-- Thumbnails for Videos -->
            <thumbnails :thumbnails="videoThumbnails" :currentMediaSource="mediaSource" @thumbnailSelected="thumbnailSelected" v-if="!isImage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageThumbnails: {
      type: Array,
      required: true,
      default: () => [],
    },
    videoThumbnails: {
      type: Array,
      required: true,
      default: () => [],
    },
    media: {
      type: String,
      required: true,
      default: "",
    },
    product: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      isVisible: false,
      selectedTab: "Images",
      zoomed: false,
      zoomStyles: {},
      lastTap: 0,
    };
  },
  computed: {
    isImage() {
      return /\.(jpg|jpeg|png|gif)$/i.test(this.media);
    },
    mediaSource() {
      if (this.isImage) {
        return this.media.replace("-large", "");
      }
      return this.media;
    },
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    thumbnailSelected(thumbnail) {
      this.$emit("thumbnailSelected", thumbnail);
    },
    selectTab(tab) {
      this.$emit("switchTab", tab);
    },
    toggleZoom(event) {
      this.zoomed = !this.zoomed;
      if (this.zoomed) this.handleMouseMove(event);
    },
    handleInteraction(event) {
      if (!this.zoomed) return;
      let clientX, clientY;
      if (event.type === 'click') {
        ({ clientX, clientY } = event);
      } else if (event.type === 'touchend') {
        if (event.touches.length > 0) {
          clientX = event.touches[0].clientX;
          clientY = event.touches[0].clientY;
        } else {
          return;
        }
      }

      const rect = this.$refs.image.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      this.zoomStyles = {
        transformOrigin: `${x}% ${y}%`
      };
      this.zoomed = true;
    },
    handleMouseMove(event) {
      if (!this.zoomed) return;
      const rect = this.$refs.image.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      this.zoomStyles = {
        transformOrigin: `${x}% ${y}%`
      };
    },
    handleDoubleTap(event) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - this.lastTap;
      if (tapLength < 300 && tapLength > 0) {
        const imgRect = this.$refs.image.getBoundingClientRect();
        const tapX = event.changedTouches[0].clientX - imgRect.left;
        const tapY = event.changedTouches[0].clientY - imgRect.top;
        const zoomX = (tapX / imgRect.width) * 100;
        const zoomY = (tapY / imgRect.height) * 100;
        this.zoomStyles = {
          transform: 'scale(2)',
          transformOrigin: `${zoomX}% ${zoomY}%`,
        };
      }
      this.lastTap = currentTime;
    },
  },
};
</script>

<style>
.popup-viewer {
  z-index: 1000;
}
</style>
