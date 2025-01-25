const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const productoRoter = require('./router/productoRoter');
const userRouter = require('./router/userRouter');
const cors = require('cors');
require("dotenv").config({ path: "./properties.env" });

// Configurar CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://192.168.100.7')) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//+++INICIO CONFIGURACION DEL BACKEND+++//
// Configuración para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
// Configuración para analizar el cuerpo de las solicitudes URL codificado
app.use(express.urlencoded({ extended: true }));
// Rutas para cada API
app.use("/api", productoRoter);
app.use("/api", userRouter);

// Ruta para manejar la petición GET a /api
app.get('/api', (req, res) => {
    res.json({ mensaje: "Bienvenido a la API del proyecto. Usa /api/producto o /api/user para más información." });
});

//+++FIN CONFIGURACION DEL BACKEND+++//

//+++INICIO CONFIGURACION DEL SWAGGER+++//
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API PROYECTO FINAL',
            description: 'Documentación de la API con Swagger',
            version: '1.0.0',
        },
    },
    apis: ['./contract/productoContract.js', './contract/userContract.js'],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
    res.redirect('/api-docs/');
});
//+++FIN CONFIGURACION DEL SWAGGER+++//

// Configuración del servidor
const port = process.env.PORT || 4000;
const host = process.env.HOST || '192.168.100.7'; // Asegúrate de que el host sea accesible desde la red local
app.listen(port, host, () => {
    console.log(`Servidor en ejecución en http://${host}:${port}`);
});
