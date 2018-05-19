const fs    = require('fs');
const ccxt  = require('ccxt')
const fetch = require ('node-fetch')

module.exports = {

    totalWeight: function(data) {
        uncapped_weight = 0
        for(var i=0; i<data.length; i++) {
            uncapped_weight += parseFloat(data[i].market_cap_usd)
        }
    
        return uncapped_weight
    },
    filter: function(data, uncapped_weight) {

        for(var i=0; i<data.length; i++) {
            data[i].input_weight = parseFloat(data[i].market_cap_usd)
            data[i].uncapped_weight = data[i].input_weight/uncapped_weight
            data[i].capped_weight = data[i].input_weight/uncapped_weight

            data[i].total_input_weight = uncapped_weight
            data[i].price = data[i].price_usd
            data[i].supply = data[i].available_supply
            // delete data[i].id;
            delete data[i].price_usd;
            delete data[i].name;
            delete data[i].symbol;
            delete data[i]['24h_volume_usd'];
            delete data[i].percent_change_1h;
            delete data[i].percent_change_24h
            delete data[i].percent_change_7d
            delete data[i].available_supply
            delete data[i].total_supply
            delete data[i].max_supply
            delete data[i].last_updated
            delete data[i].market_cap_usd
            delete data[i].price_btc
        }

        return data
    },
    rebalance: function(input, data){
        for(var i=0; i<data.length; i++) {
            data[i].balance = input * data[i].uncapped_weight
            data[i].units   = data[i].balance / data[i].price
        }

        return data
    },
    loadPrices: async function(sources) {
        let prices = []
        let symbols = []

        for (i=0; i < sources.length ; i++) {
            let exchangeFound = ccxt.exchanges.indexOf (sources[i]) > -1
            if (exchangeFound) {
                source = new ccxt[sources[i]] ()
                prices[i] = await source.loadMarkets()
                symbols[i] = source.symbols
            }  else {
                log('Exchange ' + sources[i] + ' not found')
                break
            }
        }

        return { prices: prices, symbols: symbols }
    },
    loadIndex: async function(limit, convert) {
        const res = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit}&convert=${convert}`)
        return res.json()
    },
    cleanup: function(data) {
        for(var i=0; i<data.length; i++) {
            delete data[i].supply
            delete data[i].uncapped_weight
            delete data[i].total_input_weight
        }

        return data
    }
}
