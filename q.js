var Q = function() {
	Q.prototype.init = function() {
		this.q = [];
	}

	Q.prototype.enqueue = function(element) {
		this.q.push(element);
	}

	Q.prototype.dequeue = function() {
		this.q.shift();
	}
}; 

module.exports = Q;