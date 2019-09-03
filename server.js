const net = require('net')
const path = require('path')

// const namedPipePath = '\\\\?\\pipe'

var server = net.createServer()
server.on('connection', handleConnection);

server.listen(9000, () => {
    let serverDetails = server.address()
    console.log(
        `server listening on port ${serverDetails.port}, ` + 
        `family ${serverDetails.family}, ` + 
        `address ${serverDetails.address}`);
})

function handleConnection(conn) {  
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    conn.setEncoding('utf8');
    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
    function onConnData(d) {
        console.log('connection data from %s: %j', remoteAddress, d);
        conn.write(d.toUpperCase());
    }
    function onConnClose() {
        console.log('connection from %s closed', remoteAddress);
    }
    function onConnError(err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
    }
}