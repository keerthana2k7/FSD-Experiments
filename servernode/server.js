
const http = require('http');

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/user') {
        const user = {
            name: "Keerthana",
            age: 20,
            role: "Student"
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "User details fetched successfully",
            data: user
        }));
    }

    else if (req.method === 'POST' && req.url === '/user') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const userData = JSON.parse(body);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "User data received successfully",
                receivedData: userData
            }));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});