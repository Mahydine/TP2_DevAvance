import { createHash } from 'node:crypto';

import dotenv from 'dotenv';
dotenv.config();

const publicKey = process.env.MARVEL_API_PUBLIC_KEY.toString()
const privateKey = process.env.MARVEL_API_PRIVATE_KEY.toString()

console.log(publicKey, '\n', privateKey)

const url = "https://gateway.marvel.com:443/v1/public/characters?apikey=a1300ede5d035aa6c05e527046c7f033"

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const ts = new Date().getTime();
    url += "&hash=" + await getHash(ts, privateKey, publicKey);
    url += "&ts=" + ts;

    const response = await fetch(url);
    const rawData = await response.json();

    // Filtrer les résultats selon les conditions spécifiées
    const filteredResults = []

    rawData.data.results.forEach((e) => {
        if(!e.thumbnail.path.toString().includes("image_not_available")){
            filteredResults.push({name : e.name ,description: e.description, img : e.thumbnail.path +"."+ e.thumbnail.extension})
        }
    });

    // Retourner les résultats filtrés
    return filteredResults;
};


/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */

export const getHash = async (timestamp , privateKey, publicKey) => {
    return createHash('md5').update(timestamp + privateKey + publicKey).digest("hex")
}

//console.log(await getData(url))
