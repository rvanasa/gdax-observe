'use strict'

var cache = {};

module.exports = {
	gdax: require('gdax'),
	Observable: require('rxjs').Observable,
	state(pair)
	{
		return cache[pair] || (cache[pair] = this.Observable.create(sub =>
		{
			var client = new this.gdax.OrderbookSync(pair);
			
			var _processMessage = client.processMessage;
			client.processMessage = function(data)
			{
				_processMessage.apply(this, arguments);
				var state = client.book.state();
				if(state.asks.length && state.bids.length)
				{
					sub.next(state);
				}
			}
			
			return () =>
			{
				client.onClose();
				delete cache[pair];
			}
		}));
	},
	price(pair)
	{
		return this.state(pair)
			.map(state =>
			{
				return {ask: String(state.asks[0].price), bid: String(state.bids[0].price)};
			})
			.distinctUntilChanged(data => data.ask + ':' + data.bid);
	},
	ask(pair)
	{
		return this.price(pair)
			.pluck('ask')
			.distinctUntilChanged();
	},
	bid(pair)
	{
		return this.price(pair)
			.pluck('bid')
			.distinctUntilChanged();
	},
};