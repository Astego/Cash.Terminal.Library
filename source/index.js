const products = require('./products');

function CashProvider() {
    
    this.cart = [];
    this.session = false;
    this.sum = 0;
    
    this.openSession = function () {
        if (!this.session) {
            this.clearSession();
            this.session = true;
        }
    }

    this.closeSession = function () {
        this.session = false;
    }
    
    this.clearSession = function () {
        if (!this.session) {
            this.cart = [];
            this.sum = 0;
        }
    }

    /**
     * Takes item from object and push to array and recalc sum
     * 
     * @param {object} product
     * @returns {undefined}
     */
    this.addProduct = function (product) {
        if (this.session) {
            this.cart.push(product);
            this.calcSum();
        }
    }

    /**
     * Remove item from array and recalc sum
     * 
     * @param {object} product
     * @returns {undefined}
     */
    this.removeProduct = function (product) {
        if (this.session) {
            const index = this.cart.findIndex(({id}) => id === product.id);
            this.cart.splice(index, 1);
            this.calcSum();
        }
    }

    /**
     * Takes price from object in array and sum them
     */
    this.calcSum = function () {
        this.sum = 0;
        for (const {price} of this.cart) {
            this.sum += price;
        }
    }

    /**
     * Takes list of objects, count of object and total summ.
     */
    this.printCheck = function () {
        if (this.session) {
            const checkOutList = this.cart.map(({name, price}) => ({name, price}));

            return {
                list: checkOutList,
                count: checkOutList.length,
                totalSumm: this.sum,
            };
        }
    }

}

module.exports = {CashProvider};