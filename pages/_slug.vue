<template>
  <div class="grid md:grid-cols-3 gap-4 md:gap-8 xl:gap-20 md:items-center my-10">
    <div>
      <product-image :product="product" />
    </div>
    <div>
      <pre>{{ product }}</pre>
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
