require("dotenv").config();
const fetch = require("node-fetch");

const soundcloudKeys = [
  process.env.keyGoogleSc1,
  process.env.keyGoogleSc2,
  process.env.keyGoogleSc3,
  process.env.keyGoogleSc4,
  process.env.keyGoogleSc5,
  process.env.keyGoogleSc6,
  process.env.keyGoogleSc7,
  process.env.keyGoogleSc8,
  process.env.keyGoogleSc9,
  process.env.keyGoogleSc10,
]

const getRequests = (array, keys) => {
  return array.map((el, index) => {
    return {
      title: el,
      url: `https://www.googleapis.com/customsearch/v1?siterequest?&key=${keys[index]}&cx=011544546440637270403%3Aqlxjbhczn6i&q=${el}`
    }
  });
}

const findLink = (result) => {
  let link = result.items.find(el => el.link.includes('https://soundcloud.com/')).link
  return link.match(/\//g).length === 4 ? link : null
}

const getSoundcloudLinkRequest = async (link) => {
  return await fetch(link.url)
    .then(data => data.json())
    .then(jsonData => {
      console.log(jsonData)
      let output = { title: link.title, url: findLink(jsonData) }
      return output
    })
    .catch(error => error);
  }
  
const runSearch = async (array) => {
  let searches = [];
  for (let i=0; i < array.length; i++) {
    let search = await getSoundcloudLinkRequest(array[i]);
    searches.push(search)
  }
  return searches
}

// request soundcloud links
export const requestSC = async (reqArray) => {
  const arrayOfTitles = JSON.parse(reqArray);
  const arrayOfSearches = getRequests(arrayOfTitles, soundcloudKeys);
  const links = await runSearch(arrayOfSearches);
  return links
}