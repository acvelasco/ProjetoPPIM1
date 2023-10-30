import http from 'http';
import url, {URLSearchParams} from 'url';

const host = 'localhost';
const porta = 3000;

function responderRequisicao(requisicao, resposta){
    if(requisicao.method === "GET"){

        const dados = new URLSearchParams(url.parse(requisicao.url).query);
        const numero = dados.get('tabuada');
    
        resposta.setHeader('Content-type','text/html');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8"/>');
        resposta.write('<title>Tabuada</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<h1>Tabuada</h1>');
        resposta.write('<h3">Se estiver com dificuldade acesse -> /?tabuada=1</h3>');
        
        if(numero){
            resposta.write(`<h1>Tabuada do ${numero}</h1>`);
            resposta.write('<table>');
            for (let i = 1; i <= 10; i++) {
                resposta.write(`<tr><td> ${numero} x  ${i}</td><td>=</td><td>${numero * i}</td></tr>`);
            }
            resposta.write('</table>');
            resposta.write('</body>');
            resposta.write('</html>');
            resposta.end();  
        }
    }
}

const servidor = http.createServer(responderRequisicao);

servidor.listen(porta, host, () => {
    console.log('Executando');
});