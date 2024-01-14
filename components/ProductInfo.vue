<template>
  <div>
    <div class="flex flex-col gap-3">
      <div class="flex justify-between text-sm w-full gap-10">
        <span class="uppercase text-xs lg:text-base text-gray-500">{{ product.manufacturer }}</span>
        <span class="capitalize text-xs lg:text-base text-green-700">Hurry limited stock</span>
      </div>
      <div class="">
        <h2 class="text-base leading-tight md:text-2xl font-medium">{{ product.manufacturer }} {{ product.phoneName }}</h2>
      </div>
      <div class="" v-if="!forPopup">
        <h3 class="leading-tight font-semibold">£{{ product.price.toFixed(2) }}</h3>
      </div>
      <div class="border-t border-b border-gray-300 md:border-t-2 md:border-b-2 py-5" v-if="!forPopup">
        <div class="py-3 text-gray-900">
          <span class="font-semibold">Sim:</span>
          <span class="uppercase">{{ product.sim }}</span>
        </div>
        <div class="py-3 text-gray-900">
          <span class="font-semibold">Condition:</span>
          <span class="uppercase">{{ product.condition }}</span>
        </div>
        <div class="py-3 text-gray-900">
          <span class="font-semibold">Color:</span>
          <span class="uppercase">{{ product.color }}</span>
        </div>
        <div class="py-3 text-gray-900">
          <span class="font-semibold">Network:</span>
          <span class="uppercase">{{ product.network }}</span>
        </div>
        <div class="py-3 text-gray-900">
          <span class="font-semibold">Storage:</span>
          <span class="uppercase">{{ product.storage }}</span>
        </div>
      </div>
      <div class="flex items-center justify-center sm:justify-start gap-5" v-if="!forPopup">
        <span
          class="font-semibold text-gray-600"
          :class="{ 'cursor-not-allowed': quantity === 1, 'cursor-pointer': quantity > 1 }"
          @click="decreaseQuantity"
        > &mdash; </span>
        <span class="text-blue-800 px-4 py-2 font-bold bg-gray-200 md:px-6 md:py-3"> {{ quantity }} </span>
        <span class="font-semibold text-gray-600 text-2xl cursor-pointer" @click="increaseQuantity"> + </span>
      </div>
      <div v-if="!forPopup">
        <button
          class="w-full rounded py-2 text-lg font-semibold text-black bg-[#ffd811] focus:outline-none lg:px-10 xl:px-16 hover:bg-[#ffd811]"
          @click.prevent="addToBasket"
        >
          Add to Basket
        </button>
      </div>
    </div>
    <base-modal
      @close-modal="showPopup = false"
      v-if="showPopup"
    >
      <p class="italic my-10 p-3 w-full text-center">
        Added {{ quantity }} {{ product.manufacturer }} {{ product.phoneName }} to basket!
      </p>
    </base-modal>
  </div>
</template>

<script>
export default {
  name: 'ProductInfoComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
    forPopup: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      quantity: 1,
      showPopup: false,
    };
  },
  methods: {
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    addToBasket() {
      this.showPopup = true;
    },
  },
  mounted() {
  }
}
</script>
