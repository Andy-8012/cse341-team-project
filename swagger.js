const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Blockbuster Media Store',
        description: 'A store where Movies, Books and CDs are sold.'
    },
    host: 'cse341-team-project-7569.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generage swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);