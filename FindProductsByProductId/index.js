module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function FindAssetsByStoreId called...');

    context.log('product_id=' + context.bindingData.product_id);
    if (context.bindingData.product_id) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: context.bindings.ourproducts
        };
        context.log('Our data ' + JSON.stringify(context.bindings));
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass product_id on the query string or a param on the end-point!"
        };
    }
};