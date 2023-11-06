<template>
  <div class="">
    <div class="">
      <div class="flex w-full border-b">
        <button
          @click="switchTo('videos')"
          :class="{
            'text-blue-900 border-b-[1px] border-[#ffd811]':
              activeTab === 'videos',
          }"
          class="mx-4 py-2 focus:outline-none uppercase"
        >
          Videos
        </button>
        <button
          @click="switchTo('images')"
          :class="{
            'text-blue-900 border-b-[1px] border-[#ffd811]':
              activeTab === 'images',
          }"
          class="mx-4 py-2 focus:outline-none uppercase text-gray-700"
        >
          Images
        </button>
      </div>

      <div class="w-full min-h-[30rem] flex justify-center items-center overflow-hidden">
        <template v-if="activeTab === 'images'">
          <div class="w-full flex flex-col justify-between items-center gap-10">
            <div class="max-w-[30rem]">
              <img
                :src="selectedMedia"
                class="object-contain max-h-[10rem] hover:cursor-zoom-in transition-all duration-500 ease-in-out"
                :class="{ 'hover:cursor-zoom-out': scale >= 2 }"
                alt="Zoomed Image"
                @click="zoomMedia"
              />
            </div>
            <div class="flex justify-center items-center gap-3 mt-16">
              <div
                v-for="(image, index) in thumbnails"
                :key="`thumbnails-pop-${index}`"
                class="hover:shadow-lg hover:border-[1px] hover:border-[#c53030] cursor-pointer p-2 rounded-md"
                :class="{ 'border-[1px] border-[#c53030]': activeThumbnail(image) }"
                @click="selectMedia(image)"
              >
                <img :src="image" />
              </div>
            </div>
            <div class="italic text-center text-xs text-gray-600" v-show="scale === 1">
              <span class="hidden md:block">
                Use left/right arrow keys to navigate between images<br />
                Click on the image to zoom in or out, up to 2x
              </span>
              <span class="md:hidden">
                Swipe left/right to navigate between images<br />
                Tap on the image to zoom in or out, up to 2x
              </span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="w-full flex flex-col justify-between">
            <div class="max-w-[30rem]">
              <video
                ref="videoPlayer"
                controls
              ></video>
            </div>
            <div class="">
              <div v-for="(video, index) in videoList" :key="`video-${index}`">
                <img :src="video" @click="selectMedia(video)" />
              </div>
            </div>
          </div>

        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZoomViewerComponent",
  props: {
    product: {
      type: Object,
      required: true,
    },
    selectedMedia: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      zoomedIn: false,
      activeTab: "images",
      scale: 1,
    };
  },
  computed: {
    videoList() {
      return this.product.videos ? this.product.videos : [];
    },
  },
  methods: {
    switchTo(tab) {
      this.activeTab = tab;
    },
    activeThumbnail(thumbnail) {
      const mediaName = this.selectedMedia.replace("-large.jpeg", "-thumbnail.jpeg");
      return mediaName === thumbnail;
    },
    selectMedia(media) {
      this.$emit("update-media", media);
    },
    zoomMedia(event) {
      this.scale = (this.scale < 2) ? this.scale + 0.5 : 1;
      const target = event.target;
      target.style.transform = `scale(${ this.scale })`;
    }
  },
  mounted() {
    // console.log(this.selectedMedia);
  }
};
</script>
