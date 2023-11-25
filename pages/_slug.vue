<template>
  <div class="grid md:grid-cols-2 md:gap-8 xl:gap-20 md:items-center my-10 relative">
    <div class="col-span-2 md:col-span-1">
      <product-image :product="product" @zoom-in="onZoom" />
    </div>
    <div
      class="absolute right-0 w-1/2 h-full border-2 overflow-hidden bg-[#f5f5f5] drop-shadow-lg"
      v-if="isZoomedIn"
    >
      <div
        class="w-full h-full object-contain"
        :style="`
          background-image: url(${zoomedImage});
          background-position: ${zoomedImageOnX} ${zoomedImageOnY};
          background-size: cover;
          background-repeat: no-repeat;
          transform: scale(1.20);
        `"
      ></div>
    </div>
    <div class="col-span-2 md:col-span-1 mt-10 md:mt-0">
      <product-info :product="product" />
    </div>
  </div>
</template>

<script>
import data from "@/data/phone.js";
export default {
  name: 'ProductPage',
  asyncData({ params }) {
    const product = data.getPhone(params.slug);
    return { product };
  },
  data () {
    return {
      isZoomedIn: false,
      zoomedImageOnX: "0px",
      zoomedImageOnY: "0px",
      zoomedImage: null,
    };
  },
  methods: {
    onZoom(metadata = null) {
      if (metadata == null || metadata == false) {
        this.isZoomedIn = false;
        return;
      }
      this.zoomedImage = metadata.image;
      this.zoomedImageOnX = metadata.imageX;
      this.zoomedImageOnY = metadata.imageY;
      this.isZoomedIn = true;
    },
  },
  mounted() {
  }
}
</script>
