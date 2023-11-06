<template>
  <div class="grid md:grid-cols-3 xl:grid-cols-4 md:gap-8 xl:gap-20 md:items-center my-10">
    <product-item
      v-for="(product, index) in allPhones"
      :key="`phone_${ index }`"
      :product="product"
      class="w-full md:w-64"
    />
  </div>
</template>

<script>
import data from "@/data/phone.js";
export default {
  name: 'IndexPage',
  data () {
    return {
      allPhones: data.phoneList,
    };
  },
  mounted() {
  }
}
</script>
