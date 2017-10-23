'use strict'

var orderbook = require('..');

orderbook.price('BTC-USD')
	.subscribe(price => console.log(price.ask, price.bid));
