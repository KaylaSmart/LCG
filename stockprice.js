/**You are given a stream of records about a particular stock. Each record contains a timestamp and the corresponding price of the stock at that timestamp.

Unfortunately due to the volatile nature of the stock market, the records do not come in order. Even worse, some records may be incorrect. Another record with the same timestamp may appear later in the stream correcting the price of the previous wrong record.

Design an algorithm that:

Updates the price of the stock at a particular timestamp, correcting the price from any previous records at the timestamp.
Finds the latest price of the stock based on the current records. The latest price is the price at the latest timestamp recorded.
Finds the maximum price the stock has been based on the current records.
Finds the minimum price the stock has been based on the current records. */
var StockPrice = function() {
	// Initialize a Map
	// Should simply store [timestamp -> value]
    this.data = new Map()
	
	// Initialize Max Heap
	// Should simply store timestamp as value, and price as priority
    this.max = new MaxPriorityQueue()
	
	// Initialize Min Heap
	// Should simply store timestamp as value, and price as priority
    this.min = new MinPriorityQueue()
	
	// This is find maximum timestamp i.e. current stock price.
    this.currentTimestamp = -1
};

/** 
 * @param {number} timestamp 
 * @param {number} price
 * @return {void}
 */
StockPrice.prototype.update = function(timestamp, price) {
	// Check if its a new timestamp or an update to older
    this.currentTimestamp = Math.max(this.currentTimestamp, timestamp)
    
	// Upsert [Insert or Update value] for price at timestamp
    this.data.set(timestamp, price)
    
	// insert timestamp to the queue with price is priority
    this.max.enqueue(timestamp, price)
    this.min.enqueue(timestamp, price)
};

/**
 * @return {number}
 */
StockPrice.prototype.current = function() {
	// get the data with max timestamp from map
    return this.data.get(this.currentTimestamp)
};

/**
 * @return {number}
 */
StockPrice.prototype.maximum = function() {
	// check the front of max queue
	// element -> timestamp
	// priority -> price
    let {element, priority} = this.max.front()
    
	// if priority [i.e. price] is not same latest value, discard it
    while (priority != this.data.get(element)) {
        this.max.dequeue()
        
        element = this.max.front().element
        priority = this.max.front().priority
    }
    
	// return price
    return priority
};

/**
 * @return {number}
 */
StockPrice.prototype.minimum = function() {
	// check the front of max queue
	// element -> timestamp
	// priority -> price
    let {element, priority} = this.min.front()
    
	// if priority [i.e. price] is not same latest value, discard it
    while (priority != this.data.get(element)) {
        this.min.dequeue()
        
        element = this.min.front().element
        priority = this.min.front().priority
    }
	
	// return price
    return priority
};

/** 
 * Your StockPrice object will be instantiated and called as such:
 * var obj = new StockPrice()
 * obj.update(timestamp,price)
 * var param_2 = obj.current()
 * var param_3 = obj.maximum()
 * var param_4 = obj.minimum()
 */