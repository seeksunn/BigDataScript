const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const fs = require('fs');
//atlas uri
const uri = "mongodb+srv://test:test@cluster0.xk6bx.mongodb.net/bigDataProj?retryWrites=true&w=majority";
//select rumour
const rumourPath = path.join(__dirname, 'RumourTweetDatasets/putinmissing');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {  
    //read file dir
    fs.readdir(rumourPath, function (err, files) {               
        files.forEach(function (file) {
            const tweetPath = rumourPath+'\\'+file+'\\'+'source-tweets'+'\\'+file+'.json';
            const retweetPath = rumourPath+'\\'+file+'\\'+'retweets'+".json"             
            //exec mongoimport
            let exec = require('child_process').exec
            //import tweet as one collection            
            let command = 'mongoimport --uri "mongodb+srv://test:test@cluster0.xk6bx.mongodb.net/bigDataProj?retryWrites=true&w=majority" --collection tweets --file '+'"'+tweetPath+'"'      
            exec(command, (err, stdout, stderr) => {     
                if (err){
                    console.log(err);
                }                            
            }) 
            //import retweet as one collection
            command = 'mongoimport --uri "mongodb+srv://test:test@cluster0.xk6bx.mongodb.net/bigDataProj?retryWrites=true&w=majority" --collection retweets --file '+'"'+retweetPath+'"'   
            exec(command, (err, stdout, stderr) => {     
                if (err){
                    console.log(err);
                }                            
            }) 
            console.log('done')            
        });
    });   
});
console.log('run')
//client.close();
