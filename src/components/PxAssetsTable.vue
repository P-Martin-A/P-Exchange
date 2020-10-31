<template>
  <table class="table">
    <thead class="table-header">
      <tr class="table-row">
        <th class="table-title"></th>
        <th class="table-title"
          :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }"
        >
          <b @click="changeSortOrder">Ranking</b>
        </th>
        <th class="table-title"
          v-for="(title, index) of titles" 
          :key="index"
          v-text="title"></th>
        <th class="table-title">
          <input type="text" id="filter" placeholder="Buscar..." v-model="filter">
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-row"
        v-for="a of filteredAssets" :key="a.id">
        <td class="table-content">
          <img 
            :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`" 
            :alt="a.name">
        </td>
        <td class="table-content">
          <b>#{{ a.rank }}</b>
        </td>
        <td class="table-content">
          <router-link class="r-link"
            :to="{ name: 'coin-detail', params: {id: a.id} }"
            v-text="a.name"
          ></router-link> 
          -
          <small v-text="a.symbol"></small>
        </td>
        <td class="table-content">{{ a.priceUsd | dollar }}</td>
        <td class="table-content">{{ a.marketCapUsd | dollar }}</td>
        <td class="table-content"
          :class="a.changePercent24Hr.includes('-') ? 'red' : 'green'"
        >{{ a.changePercent24Hr | percent }}</td>
        <td class="table-content">
          <px-button @custom-click="goToCoin(a.id)">
            <span>Detalles</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import PxButton from '@/components/PxButton'

  export default {
    name: 'PxAssetsTable',
    components: {
      PxButton
    },
    props: {
      assets: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        titles: [
          'Nombre', 'Precio', 'Cap. de Mercado', 'Variación 24hs'
        ],
        filter: '',
        sortOrder: 1
      }
    },
    computed: {
      filteredAssets() {
        const altOrder = this.sortOrder === 1 ? -1 : 1

        return this.assets.filter(a => a.symbol.toLowerCase().includes(this.filter.toLowerCase()) || a.name.toLowerCase().includes(this.filter.toLowerCase()))
                  .sort((a, b) => {
                    if (parseInt(a.rank) > parseInt(b.rank)) return this.sortOrder

                    return altOrder
                  })
      }
    },
    methods: {
      goToCoin(id) {
        this.$router.push({ 
          name: 'coin-detail',
          params: {
            id
          }
        })
      },
      changeSortOrder() {
        this.sortOrder = this.sortOrder === 1 ? -1 : 1
      }
    }
  }
</script>

<style scoped>
  .table{
    width: 100%;
    border-spacing: 0;
  }

  .table .table-header .table-row{
    background-color: var(--green-dark);
  }

  .table .table-header .table-row .table-title{
    color: var(--white);
    padding: 1rem 0;
  }

  .table .table-header .table-row .table-title b{
    cursor: pointer;
  }

  .table .table-header .table-row .table-title input{
    width: 5rem;
    font-size: 1rem;
  }

  .table .table-body .table-row{
    text-align: center;
  }

  .table .table-body .table-row:nth-child(2n){
    background-color: var(--grey-light);
  }

  .table .table-body .table-row .table-content{
    padding: .8rem 0;
  }

  .table .table-body .table-row .table-content img{
    width: 2.5rem;
    height: 2.5rem;
  }

  .table .table-body .table-row .table-content small{
    color: var(--black);
    opacity: .5;
  }

  .table .table-body .table-row .table-content .r-link{
    color: var(--blue-light);
  }
  
  @media screen and (min-width: 1000px){
    .table{
      width: 80%; 
      height: auto;
      margin: auto;
    }

    .table .table-header .table-row .table-title input{
      width: 15rem;
      font-size: 1.5rem;
    }
  }
</style>