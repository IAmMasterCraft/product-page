<template>
  <div class="grid md:grid-cols-3 md:gap-8 xl:gap-20 md:items-center my-10">
    <div class="col-span-2 md:col-span-1">
      <product-image :product="product" />
    </div>
    <div class="col-span-2 mt-10 md:mt-0">
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
    };
  },
  mounted() {
  }
}
</script>
