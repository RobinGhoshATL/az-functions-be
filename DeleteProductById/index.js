module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('product_id=' + context.bindingData.id);
    if (context.bindingData.id) {
        var myproduct = context.bindings.inputDocument;
        if (myproduct) {
            myproduct[0].active = 'inactive';
            context.bindings.outputDocument = JSON.stringify(myproduct);
        }
       context.res = {
        status: 200,
        body: context.bindings.outputDocument 
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a id to soft-delete"
        };
    }
};