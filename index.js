


const http = require('http');
const fs = require('fs');
const url = require('url');
const db = require("./fulltable.js");
const ejs = require('ejs');


var server = http.createServer(function(request, response){
    console.log('Request URL-->', request.url)
    if(request.url == "/home"){
        fs.readFile("./home.html", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                response.writeHead(200,{'content-type':'text/html'});
                response.write(data);
            }
            // response.end();
        });
    }
    else if(request.url.indexOf('createUser') > 0){
        var y = url.parse(request.url, true);
        console.log(y.query);
        db.insertUser(y.query);
        fs.readFile("./list.html", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                response.writeHead(200,{'content-type':'text/html'});
                response.write(data);
            }   
        });
    }

    
    // else if(request.url=="/usersList"){
    //     var prom = db.usersList();
    //     prom.then(function(data){
    //     console.log(data);
    //     var details = JSON.stringify(data);
    //     response.writeHead(200,{'content-type':'application/json'});
    //     response.write(details);
    // }).catch(function(err){
    //     response.writeHead(500,{'content-type':'application/json'});
    //     response.write(err);
    // })
    // console.log("end of userListFunction");
    // }
// ------------------------------------------------------------------------------------------------ 
    // else if(request.url =="/deletepage"){ 
    //     // var Id = regnant.rows[0].Id; 
    //     fs.readFile('./delete.html',function (error, data){
    //         if(error){
    //             response.writeHead(404);
    //             response.write('Error found');
    //         }
    //         else{
    //             response.writeHead(200,{'content-type':'text/html'});
    //             response.write(data);
    //         }
    //     }); 
    // }

//     else if(request.url.indexOf('deleteUser') > 0){
//         var y = url.parse(request.url, true);
//         console.log(y.query);
//         db.delete(y.query);
//         fs.readFile("./list.html", function(error, data){
//             if(error){
//                 response.writeHead(404);
//                 response.write('Error found');
//             }
//             else{
//                 response.writeHead(200,{'content-type':'text/html'});
//                 response.write(data);
//             }   
//         });
//  }

// ----------------------------------
if(request.url=="/list"){
    console.log("request came ")
    db.usersList(function(list)
    {
        console.log("data base reasponse came")
        console.log(list);
        var htmlContent = fs.readFileSync(__dirname+'/table.ejs','utf8');
        var htmlRender = ejs.render(htmlContent,{data:list});
        response.write(htmlRender);
    })
}

else if (request.url == "/delete") {
    fs.readFile('./delete.html', function (error, data) {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(data);
    });
}


else if (request.url.indexOf('deleteUser') > 0) 
{
    var remove = url.parse(request.url, true);
    console.log(remove.query);
    db.delete(remove.query);
    console.log('testing');
    fs.readFile("./list.html", function (error, data) {
        console.log('running');
        response.write(data);
    });
}


});

                                                                                                                                                                                                                                                  
server.listen(5436);
console.log("http://localhost:5436/home");
console.log("http://localhost:5436/delete");    
console.log("http://localhost:5436/list");