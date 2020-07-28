require("dotenv").config();
const fetch = require("node-fetch");

const urlDiscogs = (search, key) => `https://api.discogs.com/database/search?q=${search}&token=${key}`;
const urlYoutube = (search, key) => `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&type=video&q=${search}`;
const urlMixesDB = (search, key) => `https://www.googleapis.com/customsearch/v1/siterestrict?&key=${key}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`;
const mixesDbTitles = data => data.map(el => el.link.slice(el.link.indexOf('/w/')+16).replace(/_/g, ' '));
const keys = {
  'keyDiscogs': process.env.keyDiscogs,
  'keyGoogleYoutube': process.env.keyGoogleYoutube,
  'keyGoogleMixesDb': process.env.keyGoogleMixesDb,
};

export const requestDYM = async (searchString) => {
  console.log('in req DYM')

  let discogsResults;
  let youtubeResult;
  let mixesDbReults;
  
  await fetch(urlDiscogs(searchString, keys.keyDiscogs))
  .then(data => data.json())
  .then(jsonData => { discogsResults = jsonData.results[0] })
  .catch(error => { discogsResults = error }); 
  
  await fetch(urlYoutube(searchString, keys.keyGoogleYoutube))
  .then((data) => data.json())
  .then(jsonData => { youtubeResult = jsonData.items[0].id.videoId})
  .catch(error => { youtubeResult = error });
  
  await fetch(urlMixesDB(searchString, keys.keyGoogleMixesDb))
  .then((data) => data.json())
  .then(jsonData => { mixesDbReults = mixesDbTitles(jsonData.items)})
  .catch(error => { mixesDbReults = error });

  return { discogsResults, youtubeResult, mixesDbReults }
} 