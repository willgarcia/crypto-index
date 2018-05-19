module.exports = {
    name: 'russell',
    minRussellPercentage: function(length) {
        return (101 / length)/100
    },
    rebalance: function(initial_amount, data, russell_percentage){
        min_russell_percentage = this.minRussellPercentage(data.length)
        if (russell_percentage < min_russell_percentage) {
            console.error("Error: " + russell_percentage + " (config.russell in config.json) < " + min_russell_percentage + ' (min. russell percentage)')
            process.exit()
        }

        console.log('Russel percentage: ' + (russell_percentage*100)+ '%')
        console.log('Uncapped assets: ' + this.countUncapped(data, russell_percentage))
        current_capped = -1
        total_uncapped = this.countUncapped(data, russell_percentage)
        w = 0
        while(this.countUncapped(data, russell_percentage, false) > 0) {
            console.debug("-> Uncapped assets: " + this.countUncapped(data, russell_percentage, true))
            for(var i=0; i<data.length; i++) {
                if (data[i].capped_weight > russell_percentage) {
                    data[i].capped_weight = russell_percentage
                    if (i >= 1) {
                        console.debug("Old market cap: "+ data[i-1].total_input_weight)
                        data[i].total_input_weight = data[i-1].total_input_weight - data[i].input_weight
                    } else {
                        console.debug("Old market cap: "+ data[i].total_input_weight)
                        data[i].total_input_weight -= data[i].input_weight

                    }
                    console.debug("New market cap: "+ data[i].total_input_weight)
                    current_capped = i
                    console.debug("Current capped: " + data[current_capped].id)
                    break
                }
            }    
            russell_factor = 1-(russell_percentage*(w+1))

            console.debug("Factor: " + russell_factor)
            for(var i=current_capped+1; i<data.length; i++) {
                if (i == current_capped) {
                    data[i].total_input_weight = data[current_capped].total_input_weight

                } else {
                    data[i].capped_weight = 
                        russell_factor * 
                        (data[i].input_weight/data[current_capped  ].total_input_weight)
                }                    
            }
            w +=1
        }

        for(var i=0; i<data.length; i++) {
            data[i].balance_russell = initial_amount * data[i].capped_weight
            data[i].units   = data[i].balance_russell / data[i].price
        }

        return data
    },
    countUncapped: function(data, russell_percentage, display) {

        count = 0
        console.debug("Uncapped coins: ")
        for(var i=0; i<data.length; i++) {
            if (data[i].capped_weight > russell_percentage) {
                if (display) console.debug('- ' + data[i].id, data[i].capped_weight) 
                count += 1
            }
        }

        return count
    },
    total: function(data) {
        total = 0
        for (i=0; i<data.length; i++) {
            total += data[i]['balance_russell']
        }
        return total
    },
    optimizeRebalancing: function(initial_amount, data){
        min = this.minRussellPercentage(data.length)
        amount = 0
        rebalancedAmount = 0
        console.log(data.length)
console.log("MIN " + min)

        while (min < 1) {
            rebalancedData = this.rebalance(initial_amount, data, min)
            rebalancedAmount = 0
            for (i=0; i<rebalancedData.length; i++) {
                rebalancedAmount += rebalancedData[i].units * rebalancedData[i].price
            }
            if (rebalancedAmount > amount) {
                amount = rebalancedAmount
            }
            min += .1
            console.log(min)
        }

        console.log("Rebalanced " + rebalancedAmount)

        return rebalancedAmount
    }
}
