<template>
  <div>
    <nuxt-link :to="`/${ generateSlug }`" class="inline-block w-full md:w-64 m-2.5 custom-pulse relative">
      <div class="bg-white rounded-2xl p-4 shadow-xl cursor-pointer">
        <div class="max-w-full h-auto my-10">
          <img
            :src="`./${ product.image }`"
            alt="Product Thumbnail"
            class="mx-auto h-32"
          />
        </div>
        <div class="">
          <div class="text-lg font-medium">{{ product.manufacturer }} {{ product.phoneName }}</div>
          <div class="flex justify-between text-sm text-gray-600">
            <div>{{ product.sim }}</div>
            <div>{{ product.storage }}</div>
          </div>
        </div>
      </div>
      <div class="absolute top-0 right-0 bg-[#c53030] text-white p-2 rounded-tr-2xl font-medium text-sm">
        £ {{ product.price.toFixed(2) }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ProductItemComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    generateSlug(){
      const manufacturer = this.product.manufacturer.toLowerCase();
      const name = this.product.phoneName.toLowerCase();
      const slug = `${ manufacturer }-${ name }`
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return slug;
    },
  }
}
</script>

<style scoped>
@keyframes custom-pulse {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-1rem) scale(1.05);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.custom-pulse:hover {
  animation: custom-pulse 1s ease-in-out;
  animation-iteration-count: 2;
}
</style>
