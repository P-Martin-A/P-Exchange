<template>
  <div>
    <px-header 
      :links="links"
    />
    <router-view />
  </div>
</template>

<script>
import PxHeader from '@/layouts/PxHeader'

export default {
  name: 'App',
  components: {
    PxHeader,
  },
  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: {
            name: 'coin-detail',
            params: {
              id: 'bitcoin'
            }
          }
        },
        {
          title: 'ETH',
          to: {
            name: 'coin-detail',
            params: {
              id: 'ethereum'
            }
          }
        },
        {
          title: 'XRP',
          to: {
            name: 'coin-detail',
            params: {
              id: 'xrp'
            }
          }
        },
      ]
    }
  },
}
</script>

<style>
  *, *::before, *::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root{
    --white: #ffffff;
    --black: #4d4d4d;
    --green-light: #7fd582;
    --green-dark: #66ac69;
    --grey-light: #ededed;
    --grey-dark: #777777;
    --red-dark: #e73232;
    --blue-light: #2591da;
  }

  html{
    font-size: 8px;
  }

  html body{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: var(--white);
  }

  a{
    text-decoration: none;
  }

  ul li{
    list-style: none;
  }

  .pAbsolute{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .red{
    color: var(--red-dark)
  }

  .green{
    color: var(--green-dark)
  }

  .up::before{
    content: '👆';
  }

  .down::before{
    content: '👇';
  }

  @media screen and (min-width: 1000px){
    html{
      font-size: 10px;
    }
  }
</style>
