const mysql = require('mysql')
const {databaseOptions} = require('../jest-mysql-config')
const bcrypt = require('bcryptjs')

describe('login', function() {
    let connection
    beforeAll(function() {
        connection = mysql.createConnection(databaseOptions)
        connection.connect()
    })
    afterAll(function() {
        connection.end()
    })
    it('should run success', function(done) {
        const password = bcrypt.hashSync('12345', 10);
        connection.query(`INSERT INTO employees(fname,lname,email,password,createdAt,updatedAt) 
            VALUES('Super', 'Admin', 'noreply@dental.com', '${password}', now(), now())`, function(error, results) {
            connection.query('SELECT * FROM employees', function(error, results, fields) {
                if(error) {
                    throw error
                }               
                expect(results).toHaveLength(1)
                done()
            })
        })
    })
})