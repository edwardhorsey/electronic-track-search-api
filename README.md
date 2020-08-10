# Electronic Track Search API

An API built in nodeJS. Created for my Electronic Track Search project. Link here => https://github.com/edwardhorsey/electronic-track-search

The API performs two searches:
1. Receives an artist name and track name and returns:
    * Track release details from Discogs
    * A youtube link to the track
    * Titles for 10 mixes featuring the track, found at Mixesdb
2. Receives the titles of 10 mixes and searches for Soundcloud links for those mixes

The API is hosted on Heroku. If your first search takes longer than 10 seconds, hit search again.

Issues:

* 429 Errors - When running Google Custom Searches I would sometimes reach the daily limit of query results. I am currently researching alternative options to overcome this. In the meantime if one is to receive a 429 error on this app and thus receive less than 1 DJ Mix result back it will pull from a list of my favourite mixes and render those to the page instead.

## Update 10/08/20
I have transfered this API onto Amazon API Gateway and AWS Lambda.
