<template>
  <div>
    <div
      class="bg-white shadow w-full min-h-[32rem] flex flex-col justify-center items-center gap-10 md:p-10"
    >
      <div class="flex justify-between items-center h-full w-full">
        <button
          class="text-blue-800 font-semibold text-lg cursor-pointer p-2"
          @click="previousImage"
        >&lt;</button
        >
        <!-- Display product image -->
        <div
          class="w-fit h-full overflow-hidden relative hover:cursor-pointer"
          @mouseleave="zoomOut"
          v-if="mediaType === 'image'"
        >
          <img
            class="max-h-[18rem] w-full object-contain transition-all duration-500 ease-in-out overflow-hidden"
            :src="selectedImage"
            :alt="`${ product.phoneName } Product Image`"
            @mousemove="updateImagePosition"
            @click="togglePopup"
          />
          <!-- mask overlay -->
          <img
            class="absolute w-20 h-20 object-contain"
            :style="`
              top: ${ overlayY };
              left: ${ overlayX };
              transition: transform 0.5s ease;
            `"
            src="overlay.gif"
            :alt="`${ product.phoneName } Product Image`"
            @click="togglePopup"
            v-if="onHover"
          />
        </div>

        <div
          class="w-fit h-full"
          v-else
        >
          <video class="max-h-full w-full object-contain" controls>
            <source :src="selectedVideo" type="video/mp4" />
          </video>
        </div>

        <button
          class="text-blue-800 font-semibold text-lg cursor-pointer p-2"
          @click="nextImage"
        >&gt;</button
        >
      </div>

      <!-- Add thumbnails for image selection -->
      <div class="flex items-center justify-center gap-5">
        <div
          v-for="(thumbnail, index) in thumbnails"
          :key="`thumbnail_${index}`"
          class="hover:shadow-lg hover:border-[1px] hover:border-[#1e40af] cursor-pointer p-2 rounded-md"
          :class="{ 'border-[1px] border-[#1e40af]': activeThumbnail(thumbnail) }"
          @mouseover="selectImage(thumbnail)"
        >
          <img :src="thumbnail.thumbnail" />
        </div>
      </div>
      <div class="italic text-center text-xs text-gray-600 hidden" v-show="!zoomedIn">
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
      <zoom-viewer-old
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
      selectedVideo: this.product.videos[0],
      zoomedIn: false,
      touchStartX: null,
      imageX: '0px',
      imageY: '0px',
      overlayX: '0px',
      overlayY: '0px',
      debounceTimeout: null,
      showPopup: false,
      onHover: false,
      mediaType: 'image',
    };
  },
  computed: {
    thumbnails() {
      const imageThumbnails = this.product.imageList.thumbnails.map(image => (
        {
          thumbnail: image,
          file: image.replace("-thumbnail", ""),
          type: 'image',
        })
      );
      const videoThumbnails = this.product.videos.map(video => (
        {
          thumbnail: 'video-thumbnail.png',
          file: video,
          type: 'video',
        })
      );
      return [...imageThumbnails, ...videoThumbnails];
    },
    originalResolution() {
      return this.product.imageList.originalResolution;
    },
    largeJpeg() {
      return this.selectedImage.replace(".jpeg", "-large.jpeg");
    }
  },
  methods: {
    selectImage(thumbnail) {
      if (thumbnail.type === 'video') {
        this.selectedVideo = thumbnail.file;
        this.mediaType = 'video';
        console.log(this.selectedVideo);
        return;
      }
      this.selectedImage = thumbnail.file.replace("-thumbnail", "");
      this.mediaType = 'image';
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
      // this.onHover = true;
    },
    zoomOut() {
      this.onHover = false;
      this.imageX = '0px';
      this.imageY = '0px';
      this.overlayX = '0px';
      this.overlayY = '0px';
      this.$emit('zoom-in', false);
    },
    updateImagePosition(event) {
      const container = event.target;
      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;


      this.imageX = -((x - rect.width / 2) ) + 'px';
      this.imageY = -((y - rect.height / 2) + 100) + 'px';
      this.overlayX = ((x - rect.width / 2) + 90) + 'px';
      this.overlayY = ((y - rect.height / 2) + 100) + 'px';
      this.overlayX = ((x - rect.width / 2) + 100) + 'px';
      this.overlayY = ((y - rect.height / 2) + 100) + 'px';
      console.log(event.clientX, event.clientY, rect.left, rect.top, x, y, this.imageX, this.imageY, this.overlayX, this.overlayY)

      this.onHover = true;
      this.$emit('zoom-in', {
        image: this.largeJpeg,
        imageX: this.imageX,
        imageY: this.imageY,
      });
    },
    debouncedUpdateImagePosition(event) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => {
        this.updateImagePosition(event);
      }, 200);
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
