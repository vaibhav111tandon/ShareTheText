const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)  
});
  
const db = admin.firestore();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log("Listening on port : ", PORT)
});

app.get('store/:stub/:text', async (req, res) => {
    
    let stub = await req.params.stub;
    let text = await req.params.text;

    if(stub.trim() != '' && text.trim() != ''){
        
        await db.collection('stubCollection').doc(stub).set({
            text
        }).then(() => {
            res.send({
                stub,text
            });
        }).catch((e) => {
            res.send({
                'Error':`${e.message}` 
            })
        });

    }

    
});

app.get('/:stub', async (req, res) => {

    let stub = req.params.stub;

    await db.collection('stubCollection')
            .doc(stub)
            .get()
            .then((doc) => {
                if(!doc.exists){
                    console.log("Document does not exist");
                }else{
                    let data = doc.data();
                    res.send({data});
                }
            })
            .catch((error) => {
                console.log("Error : ", error)
            })

});