/*jshint esversion: 6 */

const Http = require("http");
const Express = require("./node_modules/express");
const BodyParser = require("./node_modules/body-parser");
const MongoClient = require("./node_modules/mongodb").MongoClient;

const kMongoURLString = "mongodb://mongoserver:27017";
const KDBNameString = "workshopdb";

let express = Express();
let server = Http.createServer(express);

express.use(BodyParser.json
({
    
}));

express.use(BodyParser.urlencoded
({
    
    extended: true

}));

express.get("/", (request, response) =>
{

    response.send("Welcome");

});

express.get("/fetch", (request, response) =>
{

    MongoClient.connect(kMongoURLString, (err, client) =>
    {

        if (err !== null)                            
            return;

        const db = client.db(KDBNameString);
        const collection = db.collection("workshopcollection");
        collection.find({}).toArray((err, docs) =>
        {

            if (err !== null)
                return;

            console.log(docs);
            response.send("KubernetesApp - Fetch" + docs + "\n\n");
            
        });

    });
});

express.post("/upload", (request, response) =>
{

    MongoClient.connect(kMongoURLString, (err, client) =>
    {

        const db = client.db(KDBNameString);
        const collection = db.collection("workshopcollection");
        const body = request.body;
        
        let documentsArray = [];
        documentsArray.push(body);

        collection.insertMany(documentsArray, (err, docs) =>
        {

            if (err !== null)
                return;
            
            console.log(docs);
            response.send("KubernetesApp - Upload" + docs + "\n\n");


        });

    });
    

    // response.send("KubernetesApp - Upload1.80\n" + JSON.stringify(request.body) + "\n");
    
});

var port = process.env.port || process.env.PORT || 7007;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
