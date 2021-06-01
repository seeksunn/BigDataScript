const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0.xk6bx.mongodb.net/bigDataProj?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const path = require('path');
const fs = require('fs');
const rumourPath = path.join(__dirname, 'RumourTweetDatasets/putinmissing');
var mongo = require('mongodb');

client.connect(err => {
    const collection = client.db("bigDataProj").collection("tweets");
    fs.readdir(rumourPath, function (err, files) {
        files.forEach(function (file) {
            const annoPath = rumourPath+'\\'+file+'\\'+'annotation'+".json"   
            let data = JSON.parse(fs.readFileSync(annoPath));
            console.log(data);
            collection.updateOne({ 'id_str':file}, {$set:data}, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");                
            });
        });       
    });
    //client.close();
});