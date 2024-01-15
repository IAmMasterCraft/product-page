<template>
  <div
    class="image-zoom-container relative w-full min-h-[22rem] flex justify-center items-center"
  >
    <div class="relative mx-10" @click="openPopup" ref="media_container">
      <img
        v-if="isImage"
        :src="media"
        class="max-h-[20rem] w-auto media"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        ref="image"
      />
      <video
        v-else-if="!isImage"
        :src="media"
        class="max-h-[20rem] w-auto media"
        controls
        ref="media"
      ></video>
      <div
        v-if="zoomed"
        :style="zoomStyles"
        class="zoom-lens absolute bg-gray-500 border hidden md:block"
      ></div>
    </div>
    <button
      class="text-blue-800 font-semibold text-lg cursor-pointer p-2 absolute top-1/2 left-0 transform -translate-y-1/2"
      @click="previousMedia"
    >
      &lt;
    </button>
    <button
      class="text-blue-800 font-semibold text-lg cursor-pointer p-2 absolute top-1/2 right-0 transform -translate-y-1/2"
      @click="nextMedia"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: String,
      required: true,
      default: "product-image.jpeg",
    },
  },
  data() {
    return {
      zoomed: false,
      zoomFactor: 2,
      zoomStyles: {},
      touchStartX: null,
    };
  },
  computed: {
    isImage() {
      return /\.(jpg|jpeg|png|gif)$/i.test(this.media);
    },
  },
  methods: {
    handleMouseMove(event) {
      if (!this.isImage) return;
      this.zoomed = true;
      const { left, top, width, height } =
        this.$refs.image.getBoundingClientRect();
      let x = event.pageX - left;
      let y = event.pageY - top;
      x = Math.max(0, Math.min(x, width));
      y = Math.max(0, Math.min(y, height));
      const zoomWidth = width / this.zoomFactor;
      const zoomHeight = height / this.zoomFactor;
      this.zoomStyles = {
        left: `${x - zoomWidth / 2}px`,
        top: `${y - zoomHeight / 2}px`,
        width: `${zoomWidth}px`,
        height: `${zoomHeight}px`,
        background: `url(${this.media}) no-repeat`,
        backgroundSize: `${width * this.zoomFactor}px ${
          height * this.zoomFactor
        }px`,
        backgroundPositionX: `-${x * this.zoomFactor - zoomWidth / 2}px`,
        backgroundPositionY: `-${y * this.zoomFactor - zoomHeight / 2}px`,
        transition: "transform 0.3s ease",
      };
    },
    handleMouseLeave() {
      if (!this.isImage) return;
      this.zoomed = false;
    },

    nextMedia() {
      this.$emit("nextMedia");
    },
    previousMedia() {
      this.$emit("previousMedia");
    },
    openPopup() {
      this.$emit("openPopup");
    },

    handleKeydown(event) {
      if (event.key === "ArrowRight") {
        this.nextMedia();
      } else if (event.key === "ArrowLeft") {
        this.previousMedia();
      }
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
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
    this.$refs.media_container.removeEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.$refs.media_container.removeEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    this.$refs.media_container.addEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.$refs.media_container.addEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
  },
};
</script>

<style>
.image-zoom-container {
  cursor: zoom-in;
}
.zoom-lens {
  cursor: zoom-out;
  pointer-events: none;
}
.media {
  transition: opacity 0.5s ease-in-out;
}
</style>
