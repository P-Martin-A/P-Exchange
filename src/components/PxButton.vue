<template>
  <button class="btn" @click="buttonClick">
    <beat-loader 
      :loading="isLoading"
      :color="'#7fd582'"
      :size="8"
    />
    <p v-show="!isLoading"> 
      <slot></slot>
    </p>
  </button>
</template>

<script>
  export default {
    name: 'PxButton',
    props: {
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      buttonClick() {
        this.$emit('custom-click')
      }
    }
  }
</script>

<style>
  .btn{
    background-color: var(--white);
    border: 1px solid var(--green-light);
    padding: .5rem 1rem;
    color: var(--green-light);
    cursor: pointer;
    font-size: .8rem;
  }

  @media screen and (min-width: 1000px){
    .btn{
      font-size: 1.2rem;
    }

      .btn:hover{
      background-color: var(--green-light);
      color: var(--white);
    }
  }
</style>