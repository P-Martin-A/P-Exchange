<template>
  <section class="coin-detail">
    <div class="pAbsolute">
      <bounce-loader
        :loading="isLoading"
        :color="'#7fd582'"
        :size="100"
      />
    </div>
   <template v-if="!isLoading">    
      <header class="header">
        <div class="crypto">
          <img class="icon" 
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" 
            :alt="asset.name">
          <h1 class="title">
            {{ asset.name }} - <span v-text="asset.symbol"></span>
          </h1>
        </div>
        <ul class="details">
          <li class="detail">
            <b>Ranking: </b>
            <span>{{ asset.rank }}</span>
          </li>
          <li class="detail">
            <b>Precio Actual: </b>
            <span>{{ asset.priceUsd | dollar }}</span>
          </li>
          <li class="detail">
            <b>Precio más bajo: </b>
            <span>{{ min | dollar }}</span>
          </li>
          <li class="detail">
            <b>Precio más alto: </b>
            <span>{{ max | dollar }}</span>
          </li>
          <li class="detail">
            <b>Precio promedio: </b>
            <span>{{ prom | dollar }}</span>
          </li>
          <li class="detail">
            <b>Variación 24hs: </b>
            <span 
              :class="asset.changePercent24Hr.includes('-') ? 'red' : 'green'"
            >{{ asset.changePercent24Hr | percent }}</span>
          </li>
        </ul>
        <div class="box-change">
          <button class="change" 
            @click="toggleConverter"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD`}}
          </button>
          <input type="number" id="convertValue"
            v-model="convertValue"
            :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
          >
          <span class="result"
            v-text="convertResult"
          ></span>
        </div>
      </header>
      <line-chart 
        :colors="['green']"
        :min="min"
        :max="max"
        :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />
      <footer class="footer">
        <h2 class="title" v-text="title"></h2>
        <table class="table">
          <tbody class="table-body">
            <tr class="table-row"
              v-for="m of markets" 
              :key="`${m.exchangeId}-${m.priceUsd}`"
            >
              <td class="table-content">
                <b v-text="m.exchangeId"></b>
              </td>
              <td class="table-content">
                {{ m.priceUsd | dollar }}
              </td>
              <td class="table-content">
                {{ m.baseSymbol }} / {{ m.quoteSymbol }}
              </td>
              <td class="table-content">
                <px-button 
                  :is-loading="m.isLoading || false"
                  v-if="!m.url"
                  @custom-click="getWebSite(m)"
                >
                  <span>Obtener Link</span>
                </px-button>
                <a class="green" target="_blanck"
                  v-else
                  :href="m.url"
                  v-text="m.url"
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </footer>
   </template>
  </section>
</template>

<script>
  import Api from '@/api'
  import PxButton from '@/components/PxButton'

  export default {
    name: 'CoinDetail',
    components: {
      PxButton,
    },
    data() {
      return {
        button: 'Cambiar',
        asset: {},
        history: [],
        markets: [],
        isLoading: false,
        title: 'Mejores Ofertas de Cambio',
        fromUsd: true,
        convertValue: null
      }
    },
    computed: {
      convertResult() {
        if(!this.convertValue) return 0

        const RESULT = this.fromUsd ? this.convertValue / this.asset.priceUsd : this.convertValue * this.asset.priceUsd

        return RESULT.toFixed(4)
      },
      min() {
        return Math.min(
          ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
        )
      },
      max() {
        return Math.max(
          ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
        )
      },
      prom() {
        return Math.abs(
          ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
        )
      }
    },
    watch: {
      $route() {
        this.getCoin()
      }
    },
    created() {
      this.getCoin()
    },
    methods: {
      getCoin() {
        const ID = this.$route.params.id
        this.isLoading = true

        Promise.all([
          Api.getAsset(ID),
          Api.getAssetHistory(ID),
          Api.getMarkets(ID)
        ])
          .then(([asset, history, markets]) => {
            this.asset = asset
            this.history = history
            this.markets = markets
          })
          .finally(() => this.isLoading = false)
      },
      getWebSite(exchange) {
        this.$set(exchange, 'isLoading', true)

        return Api.getExchange(exchange.exchangeId)
                .then(res => {this.$set(exchange, 'url', res.exchangeUrl)})
                .finally(() => this.$set(exchange, 'isLoading', false))
      },
      toggleConverter() {
        this.fromUsd = !this.fromUsd
      }
    }
  }
</script>

<style scoped>
  .coin-detail{
    width: 100%;
    padding-top: 2rem;
  }

  .coin-detail .header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4rem;
  }

  .coin-detail .header .crypto{
    text-align: center;
    margin-bottom: 2rem;
  }

  .coin-detail .header .crypto .icon{
    width: 15rem;
    height: 15rem;
  }

  .coin-detail .header .crypto .title{
    font-size: 4rem;
    color: var(--black);
  }

  .coin-detail .header .crypto .title span{
    color: var(--grey-dark);
  }

  .coin-detail .header .details{
    margin-bottom: 5rem;
    width: 100%;
    padding: 0 10rem;
  }

  .coin-detail .header .details .detail{
    color: var(--grey-dark);
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .coin-detail .header .box-change{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .coin-detail .header .box-change .change, .coin-detail .header .box-change input{
    font-size: 3rem;
    width: 25rem;
    margin-bottom: 2rem;
  }

  .coin-detail .header .box-change .change{
    padding: 1rem 5rem;
    border: none;
    cursor: pointer;
    color: var(--white);
    background-color: var(--green-light);
    border-radius: .2rem;
  }

  .coin-detail .header .box-change .change:hover{
    background-color: var(--green-dark);
    box-shadow: 0 0 1rem var(--green-light);
  }

  .coin-detail .header .box-change input{
    padding: .5rem 0 .5rem 2rem;
  }

  .coin-detail .header .box-change .result{
    font-size: 5rem;
  }

  .coin-detail .footer{
    padding-top: 5rem;
  }

  .coin-detail .footer .title{
    font-size: 2.5rem;
    margin: 0 0 2rem 2rem;
  }

  .coin-detail .footer .table{
    width: 100%;
    border-spacing: 0;
  }

  .coin-detail .footer .table .table-body{
    font-size: 1rem;
  }

  .coin-detail .footer .table .table-body .table-row{
    text-align: center;
  }

  .coin-detail .footer .table .table-body .table-row:nth-child(2n){
    background-color: var(--grey-light);
  }

  .coin-detail .footer .table .table-body .table-row .table-content{
    padding: 1rem 0;
  }

  @media screen and (min-width: 1000px){
    .coin-detail{
      width: 80%;
      margin: auto;
    }

    .coin-detail .header{
      flex-direction: row;
    }

    .coin-detail .header .crypto, .coin-detail .header .details, .coin-detail .header .change{
      margin: 0;
    }

    .coin-detail .header .crypto .icon{
      width: 10rem;
      height: 10rem;
    }

    .coin-detail .header .crypto .title{
      font-size: 2.4rem;
      color: var(--black);
    }

    .coin-detail .header .details{
      width: 50%;
    }

    .coin-detail .header .details .detail{
      font-size: 1.8rem;
    }

    .coin-detail .header .box-change .change{
      font-size: 2rem;
    }

    .coin-detail .header .box-change .change, .coin-detail .header .box-change input{
      margin-bottom: 1rem;
    }

    .coin-detail .header .box-change .result{
      font-size: 3rem;
    }
  }
</style>