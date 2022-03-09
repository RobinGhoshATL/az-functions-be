var uuid = require('uuid').v4;
var msRestAzure = require('ms-rest-azure');
var eventGrid = require("azure-eventgrid");
var url = require('url');


// TODO: Enter value for topicKey
let topicKey = 'Fill up';
// TODO: Enter value for topic-endpoint
let topicEndPoint = 'https://rsg-topic.westus2-1.eventgrid.azure.net/api/events';

let topicCreds = new msRestAzure.TopicCredentials(topicKey);
let egClient = new eventGrid(topicCreds);
let topicUrl = url.parse(topicEndPoint, true);
let topicHostName = topicUrl.host;
let currentDate = new Date();


module.exports={
 
   
    /*
    *  Send transaction via event hub
    */
   sendTransaction: function (id,dt,transaction) {
       
        console.log("Transaction: " + transaction);
        /*
        * Try to add this transaction into Event-Grid
        */
    
        let events = [
            {
            id: uuid(),
            subject: 'Adding Asset',
            dataVersion: '2.0',
            eventType: dt, //'POC.Asset.Add', 
            data: transaction,
            eventTime: currentDate
            }
        ];
        egClient.publishEvents(topicHostName, events).then((result) => {
            return Promise.resolve(console.log('Publish to event-grid successful.'));
        }).catch((err) => {
            console.log('An error ocurred ' + err);
        });
               
           
   },


};
