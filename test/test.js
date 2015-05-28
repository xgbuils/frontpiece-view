var chai = require('chai')
chai.use(require('chai-things'))
var should = chai.should()
var expect = chai.expect

var Model = require('frontpiece.model')
var View  = require('../')

describe('Frontpiece.View', function () {
    it ('View is a function', function () {
        (typeof View).should.be.equal('function')
    })

    it ('instance of View has inherited trigger method', function () {
        var view = new View()
        ;(typeof view.trigger).should.be.equal('function')
    })

    it ('instance of View has inherited on method', function () {
        var view = new View()
        ;(typeof view.on).should.be.equal('function')
    })

    it ('has constructor', function () {
        var view = new View()
        view.constructor.should.be.equal(View)
    })

    describe('extend View', function () {
        beforeEach(function () {
            var self = this
            self.render = 0
            this.model = new Model({
                foo: 'bar',
                fizz: 'buzz'
            })
            var FancyView = View.extend({
                initialize: function (options) {
                    var view   = this
                    this.model = options.model

                    this.render()

                    this.model.on('change', function () {
                        view.render()
                    })
                },
                render: function () {
                	++self.render
                    self.foo  = this.model.get('foo')
                    self.fizz = this.model.get('fizz')
                }
            })
            this.view = new FancyView({
            	model: this.model
            })
        })

        it('when view is created is rendered', function () {
        	this.render.should.be.equal(1)
            this.foo.should.be.equal('bar')
            this.fizz.should.be.equal('buzz')
        })

        it('when view is set property is rendered', function () {
            this.model.set('foo', 'rab')
            this.render.should.be.equal(2)
            this.foo.should.be.equal('rab')
            this.fizz.should.be.equal('buzz')
        })
        it('when view is set properties is rendered', function () {
            this.model.set({
            	foo: 'rab',
            	fizz: 'zzub'
            })
            this.render.should.be.equal(2)
            this.foo.should.be.equal('rab')
            this.fizz.should.be.equal('zzub')
        })
    })
})