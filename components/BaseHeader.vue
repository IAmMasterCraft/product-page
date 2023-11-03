<template>
  <header class="bg-white shadow-lg px-10 border-b-[1px]">
    <div class="container mx-auto">
      <nav class="flex justify-between items-center py-4">
        <div>
          <nuxt-link to="/">
            <img src="@/assets/images/tbps-logo.webp" class="h-10" alt="The Big Phone Store Logo" />
          </nuxt-link>
        </div>
        <div>
          <ul class="flex space-x-6">
            <li>
              <a href="https://iammastercraft.github.io/#app/contact" target="_blank" class="text-gray-600 hover:text-red-800">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BaseHeader'
};
</script>
