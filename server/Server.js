const WebSocket = require('ws');

const wss = new WebSocket.Server(
    { port: 1337 }, () => {
        console.log("ws startuje na porcie 1337")
    });

//reakcja na podłaczenie klienta i odesłanie komunikatu

wss.on('connection', (ws, req) => {

    //adres ip klienta

    const clientip = req.connection.remoteAddress;

    //reakcja na komunikat od klienta

    ws.on('message', (message) => {
        console.log('serwer odbiera z klienta ' + clientip + ": ", message);
        ws.send('serwer odsyła do klienta -> ' + message);
    });

});