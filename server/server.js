const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log("Listening on port : ", PORT)
});

app.get('/:stub/:text', async (req, res) => {
    
    const stub = await req.params.stub;
    const text = await req.params.text;

    if(stub.trim() != '' && text.trim() != ''){
        res.send({
            stub,
            text
        });
    }
    

});