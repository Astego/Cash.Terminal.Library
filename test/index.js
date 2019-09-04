const assert = require('assert');
const {CashProvider} = require('../source');
const products = require('../source/products');

describe('API CashProvider', () => {
    const cash = new CashProvider();

    it('is defined', () => {
        assert.notEqual(cash, undefined);
    })

    describe('Types', () => {
        it('Cart is Array', () => {
            assert.equal(Array.isArray(cash.cart), true);
        })

        it('Session is boolean', () => {
            assert.equal(typeof cash.session, 'boolean');
        })

        it('Sum is number', () => {
            assert.equal(typeof cash.sum, 'number');
        })
    });
    
    describe('Session behaviour', () => {
        it('Session is open', () => {
            cash.openSession();
            assert.equal(cash.session, true);
            cash.closeSession();
        })

        it('Session is closed', () => {
            cash.openSession();
            cash.closeSession();
            assert.equal(cash.session, false);
        })
    });

    describe('Cart behaviour', () => {
        it('Add product', () => {
            cash.openSession();
            cash.addProduct(products.PANTS_WOMAN_SML);
            cash.addProduct(products.PANTS_WOMAN_MED);
            assert.equal(cash.cart.length, 2);
            cash.closeSession();
            cash.clearSession();
        })

        it('Remove product', () => {
            cash.openSession();
            cash.addProduct(products.PANTS_WOMAN_SML);
            cash.addProduct(products.PANTS_WOMAN_MED);
            cash.addProduct(products.PANTS_KID_MED);
            cash.removeProduct(products.PANTS_KID_MED);
            assert.equal(cash.cart.length, 2);
            cash.closeSession();
            cash.clearSession();
        })

        it('Remove product if list is empty', () => {
            cash.openSession();
            cash.removeProduct(products.PANTS_KID_MED);
            assert.equal(cash.cart.length, 0);
            cash.closeSession();
            cash.clearSession();
        })

        it('Clearing of cart', () => {
            cash.openSession();
            cash.addProduct(products.PANTS_KID_BIG);
            cash.addProduct(products.PANTS_MAN_BIG);
            cash.closeSession();
            cash.clearSession();
            assert.equal(cash.cart.length, 0);
        })
        
        it('Cart summ', () => {
            cash.openSession();
            cash.addProduct(products.PANTS_WOMAN_BIG);
            cash.addProduct(products.PANTS_KID_MED);
            assert.equal(cash.sum, 530);
            cash.closeSession();
            cash.clearSession();
        })
    });

    describe('Check', () => {
        it('Print check if session is closed', () => {
            cash.openSession();
            cash.addProduct(products.PANTS_WOMAN_BIG);
            cash.addProduct(products.PANTS_KID_MED);
            cash.closeSession();
            assert.equal(cash.printCheck(), undefined);
            cash.clearSession();
        })

        it('Print check', () => {
            cash.openSession();
            cash.addProduct(products.PANTS_WOMAN_BIG);
            cash.addProduct(products.PANTS_KID_MED);
            assert.deepEqual(cash.printCheck(), {
                list: [
                    {name: 'Woman Pants L', price: 200},
                    {name: 'Kid Pants M', price: 330},
                ],
                count: 2,
                totalSumm: 530,
            });
            cash.closeSession();
            cash.clearSession();
        })
    });
});
