import express from "express"
import bodyParser from "body-parser"
import {WebSocketServer, WebSocket} from "ws";
import cors from "cors"


const app = express();
const PORT = 10887;
app.use(cors());
app.use(bodyParser.json());

const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message)
        ws.send(message);
    });
    ws.on('close', () => {
        console.log('client disconnected');
    });
});
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// router 
app.post('/v1/notification/event', (req, res) => {
    console.log('received POST data:', req.body);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({content: req.body}));
        }
    });
    res.status(200).json({ message: 'Data received', receivedData: req.body });
});
