const asTable    = require ('as-table')
const log        = require ('ololog').configure ({ locate: false })
require ('ansicolor').nice

const step       = require('./step')
const data       = require('./data')
const capMarket  = require('./capping/mcap')
const capRussell = require('./capping/russell')
const config     = require('./config.json')
const formatter  = require('./formatter.js')

var program = require('commander');
var tableFormat = { dash: '-'.bright, title: x => x.bright, delimiter: ' | ' }

;(async function main () {


    program.capping = 'mcap'
    program
      .arguments('<file>')
      .option('-c, --capping <capping>', 'The capping algorithm: russell or mcap (default)')
    .parse(process.argv);
    
    let initialIndex = false

    try {
        log("PREVIOUS/INITIAL INDEX".blue.underline)
        rawData0  = require('./data.0.json');
        total_weight  = data.totalWeight(rawData0)
        console.log("Total weight: " + formatter.format(total_weight))
        training_data = data.filter(rawData0, total_weight)
        console.log('Initial amount:' + formatter.format(config.initial_amount))
        balanced_data0 = capMarket.rebalance(config.initial_amount, training_data, total_weight)
        if (program.capping == capRussell.name) {
            balanced_data0 = capRussell.rebalance(config.initial_amount, balanced_data0, config.russell_percentage)
        }
        balanced_data0 = data.cleanup(training_data)
        log("\n")
        log(asTable.configure (tableFormat) (balanced_data0.filter(x => Object.keys(x).length !== 0)));
        initialIndex = true
    } catch(e) {
        log(e)
    }

    require('./data').loadIndex(config.top, 'USD').then(rawData1 => {
        log("--------------------\n\n")
        log("LIVE INDEX".blue.underline)

        total_weight  = data.totalWeight(rawData1)
        console.log("Total weight: " + formatter.format(total_weight))
        training_data = data.filter(rawData1, total_weight)
        
        initial_amount = config.initial_amount
        count = 0
        if (initialIndex) {
            initial_amount = 0
            for (i = 0; i < balanced_data0.length; i++) {
                for (j = 0; j < training_data.length; j++) {
                    if (balanced_data0[i].id == training_data[j].id) {
                        initial_amount += balanced_data0[i].units * training_data[j].price
                        count += 1
                    }
                }
            }

            var  arrayDiff = require('simple-array-diff');
            var result = arrayDiff(balanced_data0, training_data, 'id');
            for (i = 0; i < result.removed.length; i++) {
                initial_amount += result.removed[i].units * result.removed[i].price
            }
            
            console.log(('Assets removed : ' + result.removed.map(x => x.id).join(', ')).lightRed)
            console.log(('Assets added : ' + result.added.map(x => x.id).join(', ')).lightGreen)
        }

        log('New initial amount: ' + formatter.format(initial_amount))
        balanced_data1 = capMarket.rebalance(initial_amount, training_data, total_weight)
        if (program.capping == capRussell.name) {
            balanced_data1 = capRussell.rebalance(initial_amount, balanced_data1, config.russell_percentage)
        }
        balanced_data1 = data.cleanup(balanced_data1)
        log("\n")
        log(asTable.configure (tableFormat) (balanced_data1.filter(x => Object.keys(x).length !== 0)));

        if (initialIndex) {
            steps = step.list(balanced_data0, balanced_data1)
            log("--------------------\n\nSteps list")
            log(asTable.configure ({ delimiter: ' | ' }) (steps.filter(x => Object.keys(x).length !== 0)));
        
            markets = data.loadPrices(config.sources)
                        .then(result => {
                log("--------------------\n\nSteps actions")
                console.log(result.symbols[0])//, result.prices[0])
        
                console.log(result.exchanges[0])/
        
                console.log(pairs)
                log(asTable.configure ({ delimiter: ' | ' }) (pairs.filter(x => Object.keys(x).length !== 0)));
        
            })    
        }
    })


}) ()
