<template>
  <div>
    <div
      class="bg-white shadow w-full min-h-[32rem] flex flex-col justify-center items-center gap-10 md:p-10"
    >
      <div class="flex justify-between items-center max-h-[18rem] w-full overflow-hidden">
        <button
          class="text-blue-800 font-semibold text-lg cursor-pointer p-2"
          @click="previousImage"
        >&lt;</button
        >
        <!-- Display product image -->
        <div
          class="w-fit h-full overflow-hidden hover:cursor-pointer"
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
          <div
            class="fixed w-20 h-20 rounded-md"
            :style="`
              top: ${ overlayY };
              left: ${ overlayX };
              transform: translate(-50%, -50%);
              background-color: rgba(50, 100, 145, 0.3);
            `"
            @click="togglePopup"
            v-if="onHover"
          ></div>
        </div>

        <div
          class="w-fit h-full"
          v-else
        >
          <video class="w-full object-contain" controls>
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
          :class="{ 'border-[1px] border-[#1e40af]': activeThumbnail(thumbnail.file) }"
          @click="selectImage(thumbnail)"
        >
          <img :src="thumbnail.thumbnail" />
        </div>
      </div>
    </div>

    <base-modal
      @toggle-popup="togglePopup"
      v-if="showPopup"
    >
      <zoom-viewer-old
        :product="product"
        :selected-media="largeJpeg"
        :thumbnails="imageThumbnails"
        :video-thumbnails="videoThumbnails"
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
      showPopup: true,
      onHover: false,
      mediaType: 'image',
    };
  },
  computed: {
    thumbnails() {
      return [...this.imageThumbnails, ...this.videoThumbnails];
    },
    imageThumbnails() {
      const imageThumbnails = this.product.imageList.thumbnails.map(image => (
        {
          thumbnail: image,
          file: image.replace("-thumbnail", ""),
          type: 'image',
        })
      );
      return imageThumbnails;
    },
    videoThumbnails() {
      const videoThumbnails = this.product.videos.map((video, index) => (
        {
          thumbnail: `video-thumbnail.png`,
          file: video,
          type: 'video',
        })
      );
      return videoThumbnails;
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
      this.mediaType = 'image';
      if (thumbnail.type === 'video') {
        this.$nextTick(() => {
          this.selectedVideo = thumbnail.file;
          this.mediaType = 'video';
        });
        return;
      }
      this.selectedImage = thumbnail.file.replace("-thumbnail", "");
    },
    activeThumbnail(file) {
      const activeFile = (this.mediaType === 'image') ? this.selectedImage : this.selectedVideo;
      return activeFile === file;
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
      try{
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        // get image width and height
        const imageWidth = container.offsetWidth;
        const imageHeight = container.offsetHeight;
        const posX = ((cursorX - container.offsetLeft) / imageWidth).toFixed(4) * 100;
        const posY = ((cursorY - container.offsetTop) / imageHeight).toFixed(4) * 100;
        this.imageX = (posX - 15) + '%';
        this.imageY = (posY - 35) + '%';
        // this.imageX = (posX) + '%';
        // this.imageY = (posY) + '%';
        this.overlayX = (cursorX) + 'px';
        this.overlayY = (cursorY) + 'px';
        this.onHover = true;
        this.$emit('zoom-in', {
          image: this.largeJpeg,
          imageX: this.imageX,
          imageY: this.imageY,
        });
      } catch(e) {
        console.log(e.message);
      }
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
