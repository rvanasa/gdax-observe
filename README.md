### An unofficial API wrapper to make the GDAX websocket orderbook easy to use.

## Example:

```js

var orderbook = require('gdax-observe');

// print current asks/bids
orderbook.state('BTC-USD')
	.take(1)
	.subscribe(console.log); // {asks: [...], bids: [...]}

// dynamically update ask/bid price variables
var ask, bid;
orderbook.price('BTC-USD')
	.subscribe(price =>
	{
		{ask, bid} = price;
	});

```

Check out the [`rxjs`](https://www.npmjs.com/package/rxjs) and [`gdax`](https://www.npmjs.com/package/gdax) packages for related usage information and examples.

## Notice

Please keep in mind that this package is under development, so for now you should be very careful about using it for anything important. 

Feedback and contributions are welcome! Let me know if you are interested in seeing support added for other cryptocurrencry exchanges. 