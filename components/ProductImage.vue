<template>
  <div>
    <div
      class="bg-white shadow w-full min-h-[32rem] flex flex-col justify-center items-center gap-10"
    >
      <div class="flex justify-between items-center h-full w-full overflow-hidden">
        <span
          class="text-blue-800 font-semibold text-lg cursor-pointer p-2"
          @click="previousImage"
        >&lt;</span
        >
        <!-- Display product image -->
        <img
          class="max-h-[18rem] w-full object-contain transition-all duration-500 ease-in-out hover:cursor-zoom-in"
          :style="{ transform: `translate(${imageX}, ${imageY}) scale(${scale})` }"
          :src="(zoomedIn) ? largeJpeg : selectedImage"
          :alt="`${ product.phoneName } Product Image`"
          @mouseover="zoomIn"
          @mouseleave="zoomOut"
          @mousemove="debouncedUpdateImagePosition"
          @click="togglePopup"
        />
        <span
          class="text-blue-800 font-semibold text-lg cursor-pointer p-2"
          @click="nextImage"
        >&gt;</span
        >
      </div>

      <!-- Add thumbnails for image selection -->
      <div class="flex items-center justify-center gap-3">
        <div
          v-for="(thumbnail, index) in thumbnails"
          :key="`thumbnail_${index}`"
          class="hover:shadow-lg hover:border-[1px] hover:border-[#c53030] cursor-pointer p-2 rounded-md"
          :class="{ 'border-[1px] border-[#c53030]': activeThumbnail(thumbnail) }"
          @click="selectImage(thumbnail)"
        >
          <img :src="thumbnail" />
        </div>
      </div>
      <div class="italic text-center text-xs text-gray-600" v-show="!zoomedIn">
        <span class="hidden md:block">
          Hover over a particular section of the image to zoom in<br />
          Move your mouse over to other parts to zoom in<br />
          Move your mouse away from the image to zoom out<br />
          Use left/right arrow keys to navigate between images<br />
          Click on the image to view the image in a popup modal
        </span>
        <span class="md:hidden">
          Swipe left/right to navigate between images<br />
          Tap on the image to view the image in a popup modal
        </span>
      </div>
    </div>

    <base-modal
      @toggle-popup="togglePopup"
      v-if="showPopup"
    >
      <zoom-viewer
        :product="product"
        :selected-media="largeJpeg"
        :thumbnails="thumbnails"
        @update-media="selectImage"
      />
    </base-modal>
  </div>
</template>

<script>
export default {
  name: 'ProductImageComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedImage: this.product.image,
      zoomedIn: false,
      touchStartX: null,
      imageX: '0px',
      imageY: '0px',
      scale: 1,
      debounceTimeout: null,
      showPopup: false,
    };
  },
  computed: {
    thumbnails() {
      return this.product.imageList.thumbnails;
    },
    originalResolution() {
      return this.product.imageList.originalResolution;
    },
    largeJpeg() {
      return this.selectedImage.replace(".jpeg", "-large.jpeg");
    }
  },
  methods: {
    selectImage(image) {
      this.selectedImage = image.replace("-thumbnail", "");
    },
    activeThumbnail(thumbnail) {
      const imageName = this.selectedImage.replace(".jpeg", "-thumbnail.jpeg");
      return imageName === thumbnail;
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    handleTouchEnd(event) {
      if (this.touchStartX !== null) {
        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchEndX - this.touchStartX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            this.previousImage();
          } else {
            this.nextImage();
          }
        }
        this.touchStartX = null;
      }
    },
    nextImage() {
      const allImages = this.originalResolution;
      const currentImageIndex = allImages.indexOf(this.selectedImage);
      const nextImageIndex = currentImageIndex + 1;
      if (nextImageIndex < allImages.length) {
        this.selectedImage = allImages[nextImageIndex];
      } else {
        this.selectedImage = allImages[0];
      }
    },
    previousImage() {
      const allImages = this.originalResolution;
      const currentImageIndex = allImages.indexOf(this.selectedImage);
      const previousImageIndex = currentImageIndex - 1;
      if (previousImageIndex >= 0) {
        this.selectedImage = allImages[previousImageIndex];
      } else {
        this.selectedImage = allImages[allImages.length - 1];
      }
    },
    handleArrowKeys(event) {
      if (event.key === 'ArrowLeft') {
        this.previousImage();
      } else if (event.key === 'ArrowRight') {
        this.nextImage();
      }
    },
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    zoomIn() {
      this.zoomedIn = true;
    },
    zoomOut() {
      this.imageX = '0px';
      this.imageY = '0px';
      this.scale = 1;
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
      this.zoomedIn = false;
    },
    updateImagePosition(event) {
      const container = event.target;
      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.imageX = -((x - rect.width / 2) ) + 'px';
      this.imageY = -((y - rect.height / 2) ) + 'px';
      this.scale = 2;
    },
    debouncedUpdateImagePosition(event) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => {
        this.updateImagePosition(event);
      }, 500);
    },
  },
  mounted(){
    window.addEventListener('keydown', this.handleArrowKeys);
    this.$el.addEventListener('touchstart', this.handleTouchStart);
    this.$el.addEventListener('touchend', this.handleTouchEnd);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleArrowKeys);
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchend', this.handleTouchEnd);
  },
};
</script>
