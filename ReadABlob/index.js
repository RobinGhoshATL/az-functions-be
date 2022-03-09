module.exports = function(context, req) {
    context.log('Node.js Blob trigger function processed');

    context.res = {
        status: 200, /* Defaults to 200 */
        body: context.bindings.myBlob
    };
    context.done();
};