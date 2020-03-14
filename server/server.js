const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()  
});
  
const db = admin.firestore();

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
        
        await db.collection('stubCollection').doc('stubs').set({
            stub,
            text
        }).then((e) =>{
            if(e != null)
                res.send({'Error': `${e}`});
            else
                res.send({stub, text})
        })

    }

    
});