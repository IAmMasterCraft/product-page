<template>
  <div class="flex flex-col md:flex-row justify-between flex-wrap gap-5 my-10">
    <product-item
      v-for="(product, index) in allPhones"
      :key="`phone_${ index }`"
      :product="product"
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
