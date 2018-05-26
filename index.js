const express = require('express')
const ti = require('technicalindicators');

const app = express()
const port = process.argv[2] || 8080

app.use(express.json())

app.post('/:indicator', (req, response) => {
    let content = {};

    switch (req.params.indicator) {
        case 'ema':
            content.result = ti.EMA.calculate({
                period : req.query.period || 9,
                values: formatCandles(req.body).close
            })

            break;
        case 'sma':
            content.result = ti.EMA.calculate({
                period : req.query.period || 9,
                values: formatCandles(req.body).close
            })

            break;
        case 'bollinger_bands':
            content.result = ti.BollingerBands.calculate({
                period : req.query.period || 30,
                values: formatCandles(req.body).close, stdDev: 2
            })

            break;
        case 'macd':
            content.result = ti.MACD.calculate({
                fastPeriod: 12,
                slowPeriod: 26,
                signalPeriod : 9,
                values: formatCandles(req.body).close
            })

            break;
        case 'stoch_rsi':
            content.result = ti.StochasticRSI.calculate({
                rsiPeriod: 14,
                stochasticPeriod: 14,
                kPeriod: 3,
                dPeriod: 3,
                values: formatCandles(req.body).close
            })

            break;
        case 'stoch':
            let candles = formatCandles(req.body);

            content.result = ti.Stochastic.calculate({
                high: candles.high,
                low: candles.low,
                close: candles.close,
                period: 14,
                signalPeriod: 3
            })

            break;
        case 'rsi':
            content.result = ti.RSI.calculate({
                values: formatCandles(req.body).close,
                period: 14,
            })

            break;
        default:
            content.error = 'unknown indicator'
    }

    response.setHeader('Content-Type', 'application/json');
    response.send(content)
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

function formatCandles(candles) {
    let format = {
        'open': [],
        'close': [],
        'high': [],
        'low': [],
        'vol': [],
    }

    // reverse candles as oldest candle must given first 'technicalindicators' lib
    candles.reverse().forEach(candle => {
        format.open.push(candle[1])
        format.close.push(candle[2])
        format.high.push(candle[3])
        format.low.push(candle[4])
        format.vol.push(candle[5])
    })

    return format;
}