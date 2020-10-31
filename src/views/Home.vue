<template>
  <main>
    <div class="pAbsolute">
      <bounce-loader
        :loading="isLoading"
        :color="'#7fd582'"
        :size="100"
      />
    </div>
    <px-assets-table 
      v-if="!isLoading"
      :assets="assets"
    />
  </main>
</template>

<script>
  import Api from '@/api'
  import PxAssetsTable from '@/components/PxAssetsTable'


  export default {
    name: 'Home',
    components: {
      PxAssetsTable,
    },
    data() {
      return {
        assets: [],
        isLoading: false
      }
    },
    created() {
      this.isLoading = true

      Api.getAssets()
        .then(assets => this.assets = assets)
        .finally(() => this.isLoading = false)
    }
  }
</script>