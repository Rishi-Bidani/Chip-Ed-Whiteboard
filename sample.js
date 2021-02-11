const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

// const knex = require('knex')({
//   client: 'pg',
//   version: '7.2',
//   connection: {
//     host : 'localhost',
//     user : 'postgres',
//     password : 'r123',
//     database : 'first'
//   }
// });
const knex = require('knex')({
  client: 'pg',
  version: '13.1',
  connection: {
    host : 'ec2-34-239-33-57.compute-1.amazonaws.com',
    user : 'wusyhqnblbukvh',
    password : '4c72dd2323fdfd3e28ffb99b077253ac9191906d5a61e13bf96ea9af4d7dbee1',
    database : 'd9savauu9e2it3',
  	connectionString: process.env.DATABASE_URL,
  	ssl: {
    	rejectUnauthorized: false
  		}
  	}
});

knex.select('xpos', 'ypos').from('test').then((data)=>{
	console.log(data)
})
// knex('test').insert(
// 	[
// 	{'xpos':"0.6", 
// 	'ypos':"0.8",
// 	'tool':'hi', 
//     'size':"6"
//     }
//     ]).then()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    socket.on('hello', (msg) => {
    	// for (let i=0; i<= msg.length; i++) {
    	// 	console.log(msg[i])
    	// }
    	console.log(msg);
    	msg.forEach((msg1)=>{
    		knex('test').insert(
    			[
	    			{
	    				'xpos':msg1['x-position'],
	    				'ypos':msg1['y-position'],
	    				'tool':msg1['tool'],
	    				'size':msg1['cursor-size']
	    			}
    			]).then().catch((err)=>{
    				console.log(err)
    			})
    	})
    });
  });
  
http.listen(process.env.PORT || 3000, () => {
    console.log('listening on port');
  });
