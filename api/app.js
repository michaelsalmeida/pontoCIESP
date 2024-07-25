import routes from './routes/rotas.js'
import express from 'express'
import cors from 'cors'


const app = express()

// CORS
const allowedOrigins = ['http://localhost:5500', 'http://localhost:5501', 'http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'http://localhost:3001', 'http://localhost:3000', 'http://192.168.0.153'];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    console.log('Cors funcionando!')
    // API só ira funcionar na porta localhost:5500
    if (allowedOrigins.includes(origin)) {  
        res.header('Access-Control-Allow-Origin', origin);
    }
    // configuração de compartilhamento de credenciais 
    res.header("Access-Control-Allow-Credentials", true);
    // Configuração do cabeçalho Content-Type permitido (application/json)
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    
    app.use(cors({
        origin: origin,
        credentials: true,
        methods: 'GET, POST, PUT, DELETE',
        allowedHeaders: 'Content-Type'  // Permite apenas o cabeçalho Content-Type
    }))
    next()
})
;

app.options('*', cors({
    origin: allowedOrigins
}));

app.use(express.json())

// ROTAS
app.use(routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API rodando na porta ${PORT}!`)
})
 
app.get('/', (req, res) => {
    res.send('Ta funfando aeeeeeeeeeeeeeeeee')
})
export default app;