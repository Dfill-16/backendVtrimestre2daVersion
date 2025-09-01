const mysql = require("mysql2/promise");

let connection;

const getConnection = async () => {
   if (!connection) {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "backendblogs",
        });

        console.log("Conectado a mysql exitosamente");
   }

   return connection;
}

module.exports = getConnection;
