<template>
  <div
    class="popup-viewer fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="h-full w-full md:w-[55rem] bg-white shadow-lg m-5 md:my-0 md:mx-20 max-h-[90%] md:max-h-[33rem] relative"
    >
      <!-- Close & Back Button -->
      <button
        @click="closePopup"
        class="hidden md:block absolute top-0 right-0 border-[#c53030] border-[1px] text-[#c53030] rounded-md font-semibold text-lg cursor-pointer m-2 px-2"
      >
        &times;
      </button>
      <button
        @click="closePopup"
        class="md:hidden absolute top-0 left-0 border-gray-800 border text-gray-800 rounded-md font-semibold cursor-pointer m-2 px-2"
      >
        Back
      </button>

      <!-- Tabs for Desktop View -->
      <div
        class="hidden md:flex gap-5 w-full border-b transition-all duration-300 ease-in-out"
      >
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
      <div class="media-display p-4 border-b h-full w-full mt-10 md:mt0">
        <div class="flex flex-col md:flex-row gap-10 w-full overflow-hidden">
          <div
            class="w-full md:w-2/3 h-[25rem] overflow-hidden"
            ref="popup_media_container"
          >
            <img
              v-if="isImage"
              :src="media"
              class="max-h-[100%] max-w-[100%] object-contain m-auto block"
              :class="{
                'cursor-zoom-in': !zoomed,
                'cursor-zoom-out scale-[3]': zoomed,
              }"
              @click="toggleZoom"
              @touchend="handleDoubleTap"
              @mousemove="handleMouseMove"
              ref="image"
              :style="zoomStyles"
            />
            <div
              v-else-if="!isImage"
              class="hidden md:block relative pt-[56.25%]"
            >
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
            <thumbnails
              :thumbnails="imageThumbnails"
              :currentMediaSource="mediaSource"
              @thumbnailSelected="thumbnailSelected"
              v-if="isImage"
            />

            <!-- Thumbnails for Videos -->
            <thumbnails
              :thumbnails="videoThumbnails"
              :currentMediaSource="mediaSource"
              @thumbnailSelected="thumbnailSelected"
              v-if="!isImage"
              class="hidden md:flex"
            />
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
  watch: {
    media() {
      // if it is not image on mobile select image tab
      const viewPort = window.innerWidth;
      if (!this.isImage && viewPort < 768) {
        this.selectTab('Images')
      }
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
      if (event.type === "click") {
        ({ clientX, clientY } = event);
      } else if (event.type === "touchend") {
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
        transformOrigin: `${x}% ${y}%`,
      };
      this.zoomed = true;
    },
    handleMouseMove(event) {
      if (!this.zoomed) return;
      const rect = this.$refs.image.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      this.zoomStyles = {
        transformOrigin: `${x}% ${y}%`,
        transition: "transform 0.3s ease",
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
          transformOrigin: `${zoomX}% ${zoomY}%`,
          transition: "transform 0.3s ease",
        };
      }
      this.lastTap = currentTime;
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },

    handleTouchMove(event) {
      if (!this.touchStartX) return;
      const touchEndX = event.touches[0].clientX;
      const threshold = 50;

      if (touchEndX - this.touchStartX > threshold) {
        this.previousMedia();
        this.touchStartX = null;
      } else if (this.touchStartX - touchEndX > threshold) {
        this.nextMedia();
        this.touchStartX = null;
      }
    },
    nextMedia() {
      this.$emit("nextMedia");
    },
    previousMedia() {
      this.$emit("previousMedia");
    },
  },
  beforeDestroy() {
    this.$refs.popup_media_container.removeEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.$refs.popup_media_container.removeEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
  },
  mounted() {
    this.$refs.popup_media_container.addEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.$refs.popup_media_container.addEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
  },
};
</script>

<style scoped>
.popup-viewer {
  z-index: 1000;
}

.media {
  transition: "transform 0.3s ease";
}
</style>
