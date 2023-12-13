import * as http from 'http';
import * as fs from 'fs';

const requestListener: http.RequestListener = (req, response) => {

    
    if ((req.url === '/notes' || req.url === '/') && req.method === 'GET') {
        console.log("Petición GET recibida!");

        const path = "./src/notes.json";
        fs.readFile(path, "utf8", (err, content) => {
            if (err) {
                console.error(err);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error al leer el archivo");
                return;
            }

            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(content);
        });
    }

    if (req.url?.startsWith('/notes/') && req.method === 'GET') {
        console.log("Petición GET recibida!");
    
        const match = req.url.match(/\/notes\/(\d+)$/);
        if (match) {
            const id = parseInt(match[1]);
            const path = "./src/notes.json";
    
            fs.readFile(path, "utf8", (err, content) => {
                if (err) {
                    console.error(err);
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.end("Error al leer el archivo");
                    return;
                }
            
                const notes: { id: number, content: string }[] = JSON.parse(content);
                const note = notes.find((note: { id: number, content: string }) => note.id === id);
            
                if (note) {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(note));
                } else {
                    response.writeHead(404, { "Content-Type": "text/plain" });
                    response.end("Nota no encontrada");
                }
            });
        }
    }

}




const server = http.createServer(requestListener);
 server.listen(5500);