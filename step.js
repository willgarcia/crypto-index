const formatter  = require('./formatter.js')

module.exports = {

    list: function(data0, data1) {
        diff = []
        current = 0
        for(var i=0; i<data0.length; i++) {
            for(var j=0; j<data1.length; j++) {
                if (data0[i].rank == data1[j].rank) {
                    diff[current] = {}
                    diff_mcap = data1[j].balance_mcap - data0[i].balance_mcap
                    if (diff_mcap < 0) {
                        diff[current].action = "SELL"
                    } else {
                        diff[current].action = "BUY"

                    }
                    diff[current].step = current
                    diff[current].id = data0[i].id
                    diff[current].unit = diff_mcap / data1[j].price
                    diff[current].diff = formatter.format(diff_mcap)
                    diff[current].diff_russell = data0[i].balance_russell - data1[j].balance_russell
                    current += 1                 
                }
            }
        }

        return diff
    },

    pair: function(pairs, data) {

        
        // var pairs = [[1,2][1,7]]
// console.log(pairs)

        for (i=0; i<pairs.length;i++) {
            // console.log(pairs[i].charAt(0))
            for (j=0;j<data.length;j++) {
                if (data[j].diff > 0) {
                    // console.log(pairs[i].charAt(0))
                    // console.log(data[j].rank)
                    // console.log(data[j].rank == pairs[i].charAt(0))
                    if (data[j].rank == pairs[i].charAt(0)) {
                        // console.log(data[j])
                    }
                }
            }
        }
    }
}