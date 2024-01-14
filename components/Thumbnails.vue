<template>
  <div class="thumbnails-container hidden md:flex mt-10">
    <div v-for="(item, index) in thumbnails" :key="index" class="thumbnail cursor-pointer" @click="selectThumbnail(index)">
      <img :src="item.thumbnail" class="w-10 h-10 object-cover border hover:border-red-800 rounded-lg p-2" :class="{'border-blue-800': activeThumbnailIndex !== index, 'border-red-800': activeThumbnailIndex === index }" @click="selectThumbnail(index)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumbnails: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentMediaSource: {
      type: String,
      required: true,
      default: "product-image.jpeg",
    },
  },

  computed: {
    activeThumbnailIndex() {
      return this.thumbnails.findIndex(item => item.file === this.currentMediaSource);
    },
  },
  methods: {
    selectThumbnail(index) {
      this.$emit('thumbnailSelected', this.thumbnails[index]);
    },
  },
};
</script>

<style>
.thumbnail {
  margin-right: 10px;
}
</style>
