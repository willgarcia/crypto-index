const fs    = require('fs');
const ccxt  = require('ccxt')
const fetch = require ('node-fetch')

module.exports = {
    rebalance: function(input, data){
        for(var i=0; i<data.length; i++) {
            data[i].balance_mcap = input * data[i].uncapped_weight
            data[i].units   = data[i].balance_mcap / data[i].price
        }

        return data
    },
    total: function(data) {
        total = 0
        for (i=0; i<data.length; i++) {
            total += data[i]['balance_mcap']
        }
        return total
    }
}
