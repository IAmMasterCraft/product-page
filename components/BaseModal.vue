<template>
  <div>
    <!-- Modal container -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <!-- Modal overlay -->
      <div class="modal-overlay absolute w-full h-full bg-black opacity-50"></div>

      <!-- Modal content -->
      <div class="modal-container relative w-full md:w-3/4 lg:w-2/3 xl:w-4/5 mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-0 right-0 p-1 m-2 text-[#c53030] font-semibold leading-none bg-transparent outline-none focus:outline-none border-[1px] border-[#c53030] shadow-md rounded"
        >
          ×
        </button>

        <!-- Modal content with slot -->
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModalComponent',
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.classList.remove('modal-open');
      this.$emit('close-modal', true);
    },
  },
  mounted(){
    this.openModal();
  }
};
</script>
