const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

io.on('connection',(socket) => {

	socket.on('disconnect', () => {
		console.log(socket.id + ' disconnected');
	});	

	socket.on('msg', (data) => {
		io.emit('showmsg', data )
	});
});

app.get('/', (req, res) => {
	res.render('index');
});

http.listen(4001, () => {
	console.log("server runing");
});