import Fastify from 'fastify'
import view from '@fastify/view'
import handlebars from 'handlebars'
import fs from "node:fs"

import { getData } from './api.js';

handlebars.registerPartial('header', fs.readFileSync("src/templates/header.hbs", "utf-8"));
handlebars.registerPartial('footer', fs.readFileSync("src/templates/footer.hbs", "utf-8"));

const app = Fastify()

app.register(view, {
    engine: {
        handlebars: handlebars,
    },
});

async function runServer(){
    const comicsData = await getData("https://gateway.marvel.com:443/v1/public/characters?apikey=a1300ede5d035aa6c05e527046c7f033");

    app.get('/', (req, res) => {
        return res.view('src/templates/index.hbs', {comics: comicsData})
    })

    app.listen({ port: 3000, host:"0.0.0.0"})
}

runServer()

