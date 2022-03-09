module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function AddProduct called...');
    /*
    * Event Grid topic is used to send to a logic app
    */

    // var aguid = require('aguid');
    // var JWT   = require('jsonwebtoken');
    // var broker = require('./eventgridbroker');
    // broker.sendTransaction(null,'POC.Product.Add', req.body);

    if (req.body) {
        req.body.active = 'active';
        context.bindings.outputDocument = JSON.stringify(req.body);
        context.res = {
            status: 200,
            body: context.bindings.outputDocument
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass product details in the request body"
        };
    }
};
