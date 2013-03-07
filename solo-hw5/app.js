var express = require("express"); 
var app = express();              

app.use(express.bodyParser());



/*
 Serves files in the static directory.
 */
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});


app.listen(8889);