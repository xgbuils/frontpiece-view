var Observer     = require('ontrigger')
var objectAssign = require('object-assign')

var extendFactory = require('frontpiece.extend-factory')

function View (options) {
    this.options || (this.options = {})
    var options  = objectAssign({}, this.options, options)
    if (this.initialize) {
        this.initialize(options)
    }
}

View.prototype = Object.create(Observer.prototype)
View.prototype.constructor = View

View.extend = extendFactory({})

module.exports = View