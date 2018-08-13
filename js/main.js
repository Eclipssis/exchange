Vue.use(VueResource);

var app = new Vue({
    el: '#app',
    data: {
        currenciesQuery: 'https://openexchangerates.org/api/currencies.json',
        exchangedRatesQuery: 'https://openexchangerates.org/api/latest.json' + '?app_id=8a3b13129aa94ab08387293f6c22eb30',
        currencies: {},
        rates: {},
        curr1: '',
        curr2: '',
        changeCurrencyAmount: 100,
        getCurrencyAmount: 0
    },
    methods: {
        getCurrencies() {
            this.$http.get(this.currenciesQuery).then(function (response) {
                this.currencies = response.data;
            })
        },

        getRates() {
            this.$http.get(this.exchangedRatesQuery).then(function (response) {
                this.rates = response.data.rates;
            })
        },

        exhanged() {
            let rate1;
            let rate2;
            let allRates = this.rates;

            for (key in allRates) {
              if(key == this.curr1) {
                rate1 = allRates[key];
              }

              if(key == this.curr2) {
                rate2 = allRates[key];
              }
            }

            var result = (this.changeCurrencyAmount / rate1) * rate2;
            this.getCurrencyAmount = result.toFixed(2);

        }


    },
    created: function () {
        this.getRates();
        this.getCurrencies();
    }
})