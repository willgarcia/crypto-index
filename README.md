# Index tracker and rebalancer

## Installation

```
npm install
```

## Configuration and usage

```
node index.js
```


## Index strategies

### Number of components of the index

Hypothesis:
* a top 10 can be maintained manually: the list of coins is quite consistent due to their current dominance or relative market stability - difficulty: easy; estimated maximum transaction per rebalancing: 13
* a top 20 can be maintained manually - the list of coins is quite consistent due to their current dominance or relative market stability - difficulty: easy; estimated maximum transaction per rebalancing: TBC - difficulty: TBC
* a top 30 cannot be maintained manually - the diversity of coins entering and exiting the portfolio may cause more than 30 transactions per rebalancing

Moving from one top to an other during a rebalancing is not restricted.

### Frequency

* Estimated fees per week

### Index weighting

#### Marketcap-weighted capping

See [market-capitalization weighted index](http://www.ftserussell.com/research-insights/education-center/how-are-indexes-weighted)

Methodology:
* Retrieve the top X coins from the coinmarketcap.com API (https://api.coinmarketcap.com/v1/ticker/?limit=20&convert=USD)
* Calculate the market cap of each coin (Price * Circulating Supply)
* Sum the market cap of each coin
* For each coin, divide the coin market cap by the total market cap. We will call this percentage the uncapped_weight.
* Define an initial deposit (in fiat currency) that will be used to build the portfolio
* Take the initial deposit and for each coin, redistribute it based on the corresponding uncapped_weight.

Pros:
* A cap-weighted index is a a self-rebalancing methodology as it reflects exactly how the markets behave

Cons:
* BTC or other currencies dominance due to no hard cap
* Tends to give too much weight to securities the market has overvalued and too little weight to ones it has undervalued. As a result, true market value is skewed.

#### Hybrid-market cap index 

##### FTSE Russell

This strategy defines a market cap ceiling. See [Single Level Company Capping - page 11](http://www.ftse.com/products/downloads/Capping_Methodology_Guide.pdf).

This method is used by [Crypto20](http://crypto20.com)

Methodology:
* Any coin whose index weight is greater than y% is capped at y%.
* The coin of the remaining index constituent coins are increased as a consequence of reducing the weights of the larger coins. 
* The weights of uncapped constituent coins are then checked and if they exceed y% they are also capped at y%. 
* This process is repeated until no company weight exceeds y%.

Pros:
* protects against a single coin dominating portfolio composition whether it be bitcoin now or another coin in future
* provides broad market exposure with acceptable turnover
and mitigates risk by more evenly weighting the tracked
assets. 

##### ICONOMI - BLX 
##### COMBICOIN 
##### TAAS FUND 
##### BITTWENTY 

https://www.cnbc.com/2017/10/06/fundstrat-launches-five-indexes-to-track-bitcoin-and-other-digital-currencies.html

##### Bitwise HOLD 10 index

https://www.bitwiseinvestments.com/index

### Portfolio rebalancing

### Index results / Steps List

Partial units
Cash amounts

1. ZAG	Buy 6 units	Buy 6.5062 units	Spend $100.00
2. VCN	Buy 9 units	Buy 9.2764 units	Spend $300.00
3. XAW	Buy 23 units	Buy 23.3918 units	Spend $600.00

# Data

# coinmarketcap USD

API: https://coinmarketcap.com/api/
Methodology: https://coinmarketcap.com/faq/

# coingecko

Methodology: Github activity

* https://www.coingecko.com/buzz/understanding-coingecko-developer-metrics
* https://www.coingecko.com/en/methodology

No API available


# cryptocompare USD

API: https://www.cryptocompare.com/api/#

# Exchanges

See ccxt libraries - access to 90 exchanges APIs

# Resources

https://www.bitwiseinvestments.com/index
https://btcmanager.com/investing-cryptocurrency-index-tracking/
https://github.com/aboutlo/crypto-index-fund
https://www.bitwiseinvestments.com/index
https://static.crypto20.com/pdf/c20-whitepaper.pdf?_ga=2.92950557.1013622623.1514504485-1579083509.1512601968
http://www.ftserussell.com/research-insights/education-center/how-are-indexes-weighted
https://www.bitwiseinvestments.com/index

https://steemit.com/cryptocurrency/@thorthur22/portfolio-reblancing-tool-using-google-sheets-quadruple-your-earnings


https://btcmanager.com/investing-cryptocurrency-index-tracking/

https://techcrunch.com/2017/10/16/the-hold-10-index-is-a-passively-managed-fund-of-the-top-10-cryptocurrencies/
https://github.com/aboutlo/crypto-index-fund

http://www.ftse.com/products/downloads/Capping_Methodology_Guide.pdf

https://crypto-compare.github.io/index-comparison/
https://www.cnbc.com/2017/10/06/fundstrat-launches-five-indexes-to-track-bitcoin-and-other-digital-currencies.html


Time keeps on slippin’: Laspeyre vs. Paasche indices
http://www.ftserussell.com/research-insights/education-center/calculating-index-values

# Biggest Gainers and Losers

https://coinmarketcap.com/gainers-losers/
