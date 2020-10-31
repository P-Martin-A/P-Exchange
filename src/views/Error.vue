<template>
  <section class="error">
    <h2 class="title" v-text="title"></h2>
    <router-link class="link" to="/" v-text="link"></router-link>
  </section>
</template>

<script>
  export default {
    name: 'Error',
    data() {
      return {
        title: 'Error!',
        link: 'Inicio'
      }
    }
  }
</script>


<style scoped>
  .error{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    padding: 0 2rem;
  }

  .error .title{
    font-size: 3rem;
    color: var(--red-dark);
    margin-bottom: 2rem;
    animation: size 2s infinite step-end;
  }

  @keyframes size {
    0% { font-size: 4rem; }
    25% { font-size: 5rem; }
    50% { font-size: 6rem; }
    75% { font-size: 7rem; }
    100% { font-size: 4rem; }
  }

  .error .link{
    background-color: var(--green-light);
    color: var(--white);
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border-radius: .5rem;
  }

  .error .link:hover{
    box-shadow: 0 0 1.5rem var(--green-light);
  }

  .error .link:focus{
    background-color: var(--green-dark);
  }
</style>