<template>
  <section class="about">
    <h2 class="title" v-text="title"></h2>
    <p class="text" v-text="text"></p>
    <router-link class="link" to="/" v-text="link"></router-link>
  </section>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {
        title: 'Platzi Exchange v1.0.0',
        text: 'Proyecto para obtener las cotizaciones de las cryptomonedas más importantes a traves de una API.',
        link: 'Inicio'
      }
    }
  }
</script>

<style scoped>
  .about{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    padding: 0 2rem;
  }

  .about .title{
    font-size: 3rem;
    color: var(--green-dark);
    margin-bottom: 1.2rem;
  }

  .about .text{
    font-size: 1.8rem;
    color: var(--grey-dark);
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .about .link{
    background-color: var(--green-light);
    color: var(--white);
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border-radius: .5rem;
  }

  .about .link:hover{
    box-shadow: 0 0 1.5rem var(--green-light);
  }

  .about .link:focus{
    background-color: var(--green-dark);
  }
</style>