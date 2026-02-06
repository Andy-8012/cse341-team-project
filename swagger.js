const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Blockbuster Media Store',
        description: 'A store where Movies, Books and CDs are sold.'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generage swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);