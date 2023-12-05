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
          class="mx-4 py-2 focus:outline-none uppercase"
        >
          Images
        </button>
      </div>

      <div class="w-full min-h-[30rem] flex justify-center items-center overflow-hidden">
        <template v-if="activeTab === 'images'">
          <div class="w-full flex flex-col md:flex-row justify-between items-center gap-10">
            <div class="w-[75%] h-full flex items-center justify-center overflow-hidden relative">
              <img
                :src="selectedMedia"
                class="object-contain max-h-[28rem] hover:cursor-zoom-in transition-all duration-500 ease-in-out"
                :class="{ 'hover:cursor-zoom-out': scale >= 2 }"
                alt="Zoomed Image"
                @click="zoomMedia"
                @mousemove="getMousePosition"
                @mouseleave="resetMedia"
              />
            </div>
            <div class="w-[25%] flex justify-end flex-wrap gap-3 mt-16">
              <div
                v-for="(image, index) in thumbnails"
                :key="`thumbnails-pop-${index}`"
                class="hover:shadow-lg hover:border-[1px] hover:border-[#c53030] cursor-pointer p-2 rounded-md"
                :class="{ 'border-[1px] border-[#c53030]': activeThumbnail(image.file) }"
                @click="selectMedia(image)"
              >
                <img :src="image.thumbnail" />
              </div>
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
    videoThumbnails: {
      type: Array
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
    activeThumbnail(file) {
      const activeFile = this.selectedMedia.replace("-large", "");
      return activeFile === file;
    },
    selectMedia(media) {
      this.$emit("update-media", media);
    },
    zoomMedia(event) {
      this.scale = (this.scale < 2) ? this.scale + 2.5 : 1;
      const target = event.target;
      // get offset
      const offsetLeft = target.offsetLeft;
      const offsetTop = target.offsetTop;
      // get mouse position
      const mouseX = event.clientX - offsetLeft;
      const mouseY = event.clientY - offsetTop;
      target.style.transform = `scale(${ this.scale })`;
      target.style.transformOrigin = `${mouseX}px ${mouseY}px`;
    },
    getMousePosition(event) {
      if (this.scale < 2) return;
      const target = event.target;
      // get offset
      const offsetLeft = target.offsetLeft;
      const offsetTop = target.offsetTop;
      // get mouse position
      const mouseX = event.clientX - offsetLeft;
      const mouseY = event.clientY - offsetTop;
      console.log(mouseX, mouseY);
      target.style.transformOrigin = `${mouseX}px ${mouseY}px`;
    },
    resetMedia(event) {
      const target = event.target;

      this.scale = 1;
      target.style.transformOrigin = 'initial';
      target.style.transform = 'initial';
    }
  },
  mounted() {
  }
};
</script>
