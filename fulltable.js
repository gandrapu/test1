const pg = require('pg');

const connectionString = "postgres://postgres:1234@localhost:5432/postgres";
const client = new pg.Client(connectionString);

client.connect(function (error, result) {
    if (error) {
        return console.error('could not connect to postgres', error);
    }
    else {
        return console.log("Successfully connected to PostgreSQL DB")
    }
});

function insertUser(user) {
    let insertQuery = `INSERT INTO regnant.regnant (name, age, id, email, password) VALUES ('${user.name}','${user.age}','${user.id}','${user.email}','${user.password}')`;
    console.log('insertQuery-->', insertQuery);
    client.query(insertQuery, function (error, result) {
        if (error) {
            return console.error('error while exicuting the query', error);
        } else {
            console.log('User Details Inserted successfully...', result.rows);
        }
    });
}

function usersListUsingPromise(){
    let selectQuery = `SELECT * FROM regnant.regnant`;
    console.log('selectQuery-->', selectQuery);
    var prom = new Promise(function(resolve,reject){ // creating Promise object
        client.query(selectQuery, function(error, result){
            if(error){
                reject({'error':"error"});
            }
            else{
                resolve(result.rows)
            }
        });
    })
    return prom;
}
 
function deleteUser(user) {
    let deleteQuery = `DELETE from regnant.regnant WHERE name = '${user.name}'`;
    client.query(deleteQuery, function (error, result) {
        if (error) {
            return console.error('error running query', error);
        }
        else {
            console.log('Delete result-->', result);
        }
    });
}

module.exports = {insertUser:insertUser,usersList:usersListUsingPromise, delete:deleteUser};
// delete: deleteEmp