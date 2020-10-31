<template>
  <header class="header">
    <h1 class="title">
      <router-link class="title-link" 
        :to="{ name: 'home' }"
        v-text="title">
      </router-link>
    </h1>
    <router-link class="link"
      v-for="link of links" :key="link.title"
      v-text="link.title"
      :to="link.to"
    ></router-link>
  </header>
</template>

<script>
  export default {
    name: 'PxHeader',
    props: {
      links: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        title: 'Platzi exchage'
      }
    }
  }
</script>

<style scoped>
  .header{
    background-color: var(--green-light);
    padding: 1rem 0;
    text-align: center;
  }

  .header .title{
    font-size: 2.5rem;
  }

  .header .title .title-link{
    display: inline-block;
    margin-bottom: 1rem;
    color: var(--white);
  }

  .header .title .title-link:hover{
    color: var(--grey-light);
  }

  .header .link{
    color: var(--white);
    margin: 0 1rem;
    font-size: 1.5rem;
  }

  .header .link:hover{
    opacity: .5;
  }
</style>