var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-east-1'
});

exports.handler = function(event, context) {
    //console.log("Incoming: ", event);

    var eParams = {
        Destination: {
            ToAddresses: ["contato@dominio.com.br"]
        },
        Message: {
            Body: {
                Text: {
                    Data: event.Records[0].Sns["Message"]
                }
            },
            Subject: {
                Data: event.Records[0].Sns["Subject"]
            }
        },
        Source: "contato@ceptis.com.br"
    };

    //console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        /*if(err) 
            console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            context.succeed(event);

        }*/
        if(!err) context.succeed(event);
    });

};
