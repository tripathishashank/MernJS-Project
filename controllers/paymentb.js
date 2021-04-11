const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "n6pdfdfp7q24tdhg",
  publicKey: "mwynf6hh8vwjb9rp",
  privateKey: "b721b58060271e33a3c20deb7858e160"
});



exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {

        // pass clientToken to your front-end
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if (err) {
              res.status(500).send(err);
          } else {
            res.send(result);
        }
      });
}