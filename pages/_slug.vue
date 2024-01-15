<template>
  <div class="flex flex-row my-10 gap-16">
    <div class="flex-1">
      <div
        class="flex flex-col justify-between items-center bg-white shadow-lg md:p-10"
      >
        <!-- Product Image Zoom Component -->
        <image-zoom
          :media="mediaSource"
          @nextMedia="nextMedia"
          @previousMedia="previousMedia"
          @openPopup="showPopup"
        />
        <!-- Thumbnails -->
        <thumbnails
          :thumbnails="thumbnails"
          :currentMediaSource="mediaSource"
          @thumbnailSelected="customMedia"
          class="hidden md:flex"
        />
        <popup-viewer
          v-if="isPopupVisible"
          :media="popupMedia"
          :imageThumbnails="imageThumbnails"
          :videoThumbnails="videoThumbnails"
          @closePopup="closePopup"
          :product="product"
          @thumbnailSelected="customMedia"
          @switchTab="switchPopupTab"
          @nextMedia="nextMedia"
          @previousMedia="previousMedia"
        />
      </div>
    </div>
    <div class="flex-1">
      <!-- Product Info Component -->
      <product-info :product="product" />
    </div>
  </div>
</template>

<script>
import data from "@/data/phone.js";
export default {
  name: "ProductPage",
  asyncData({ params }) {
    const product = data.getPhone(params.slug);
    return { product };
  },
  data() {
    return {
      isPopupVisible: false,
      popupMedia: "product-image-large.jpeg",
    };
  },
  // watch this.product.image
  watch: {
    "product.image": function () {
      // if it is not image on mobile select image tab
      const viewPort = window.innerWidth;
      if (!this.isImage && viewPort < 768) this.switchPopupTab('Images');
    },
  },
  computed: {
    imageThumbnails() {
      const imageThumbnails = this.product.imageList.thumbnails.map(
        (image) => ({
          thumbnail: image,
          file: image.replace("-thumbnail", ""),
          type: "image",
        })
      );
      return imageThumbnails;
    },
    videoThumbnails() {
      const videoThumbnails = this.product.videos.map((video, index) => ({
        thumbnail: video.replace(".mp4", "-thumbnail.png"),
        file: video,
        type: "video",
      }));
      return videoThumbnails;
    },
    thumbnails() {
      return [...this.imageThumbnails, ...this.videoThumbnails];
    },
    mediaSource() {
      return this.product.image;
    },
    isImage() {
      return /\.(jpg|jpeg|png|gif)$/i.test(this.product.image);
    },
  },

  methods: {
    nextMedia() {
      const currentIndex = this.thumbnails.findIndex((thumbnail) => {
        const thumbnailFile = thumbnail.file.replace("-thumbnail", "");
        return thumbnailFile === this.product.image;
      });
      const nextIndex = currentIndex + 1;
      if (nextIndex >= this.thumbnails.length) {
        this.product.image = this.thumbnails[0].file;
        return;
      }
      this.product.image = this.thumbnails[nextIndex].file;
      this.setPopupMedia();
    },

    previousMedia() {
      const currentIndex = this.thumbnails.findIndex((thumbnail) => {
        const thumbnailFile = thumbnail.file.replace("-thumbnail", "");
        return thumbnailFile === this.product.image;
      });
      const previousIndex = currentIndex - 1;
      if (previousIndex < 0) {
        this.product.image = this.thumbnails[this.thumbnails.length - 1].file;
        return;
      }
      this.product.image = this.thumbnails[previousIndex].file;
      this.setPopupMedia();
    },

    customMedia(thumbnail) {
      const { file } = thumbnail;
      this.product.image = file;
      this.setPopupMedia();
    },

    switchPopupTab(tab) {
      switch (tab) {
        case "Videos":
          if (this.isImage) {
            this.product.image = this.product.videos[0];
          } else if (!this.isImage) {
            const currentIndex = this.product.videos.findIndex((video) => {
              return video === this.product.image;
            });
            this.product.image = this.product.videos[currentIndex];
          }
          break;

        default:
          if (!this.isImage) {
            this.product.image = this.product.imageList.originalResolution[0];
          } else if (this.isImage) {
            const currentIndex =
              this.product.imageList.originalResolution.findIndex((image) => {
                return image === this.product.image;
              });
            this.product.image =
              this.product.imageList.originalResolution[currentIndex];
          }
          break;
      }
      this.setPopupMedia();
    },

    setPopupMedia() {
      if (this.isImage) {
        const currentIndex = this.product.imageList.largeImages.findIndex(
          (image) => {
            const imageFile = image.replace("-large", "");
            return imageFile === this.product.image;
          }
        );
        this.popupMedia = this.product.imageList.largeImages[currentIndex];
      } else if (!this.isImage) {
        const currentIndex = this.product.videos.findIndex((video) => {
          return video === this.product.image;
        });
        this.popupMedia = this.product.videos[currentIndex];
      }
    },

    showPopup() {
      this.setPopupMedia();
      this.isPopupVisible = true;
    },

    closePopup() {
      this.isPopupVisible = false;
    },
  },
};
</script>
<style>
@media (max-width: 768px) {
  .flex-row {
    flex-direction: column;
  }
}
</style>
