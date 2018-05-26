# Candlestick Technical Analysis Http Server

## Tools

- node.js
- technicalindicators lib

## Start

```
npm install
node index.js
```

Or change port listen on

```
node index.js 8080
```

## Start

Download some candles from live market and post them to the webserver

Some Urls:
```
https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist?limit=500

```

Candles must be formatted as the common why in a numeric array whereas newest candles must be given first oldest last
        
```
{
[
    1527335700000, // micro timestamp
    7532.5, // open
    7532.5, // close
    7532.5,  // high
    7532.5,  // low
    1.02278819 // volume
],
[
    1527340320000,
    7521.2,
    7522.9,
    7522.9,
    7521.2,
    0.59021799
]
}
```

## Indicators

### EMA

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/ema"
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/ema?period=200"
```

### SMA

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/sma"
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/sma?period=200"

```

### Bollinger Bands

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/bollinger_bands"
```

### Stochastic RSI

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/stoch_rsi"
```

### Stochastic

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/stoch"
```

### MACD

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/macd"
```

### RSI

```
curl -H "Content-Type: application/json" --data @candles.json "http://127.0.0.1:8080/rsi"
```