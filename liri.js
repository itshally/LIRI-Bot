require('dotenv').config();

const keys = require('./keys');

const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');
const dotenv = require('dotenv')
var fs = require("fs");


var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

var spotify = new Spotify({ //this only worked when I input the keys
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

switch(command){
    case "movie-this":
            ShowMovieInformation(`${query}`);
            break;
            
    case "concert-this":
            ShowBandsInTownInformation(`${query}`);
            break;

    case "spotify-this-song":
            ShowSongTrackInformation(`${query}`)
            break;

    case "do-what-it-says":
            ExecuteFile();
            break;

    default:
        console.log("Command 404");
}


//a function that gets movie's information
function ShowMovieInformation(info){
    axios
        .get("http://www.omdbapi.com/?t=" + info + "&apikey=" + keys.omdbAPIKey)
        .then(function(response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log("  __  __  _____     _____ _____   ___ _   _ _____ ___  ____  __  __    _  _____ ___ ___  _   _ ");
        console.log(" |  \\/  |/ _ \\ \\   / /_ _| ____| |_ _| \\ | |  ___/ _ \\|  _ \\|  \\/  |  / \\|_   _|_ _/ _ \\| \\ | |");
        console.log(" | |\\/| | | | \\ \\ / / | ||  _|    | ||  \\| | |_ | | | | |_) | |\\/| | / _ \\ | |  | | | | |  \\| |");
        console.log(" | |  | | |_| |\\ V /  | || |___   | || |\\  |  _|| |_| |  _ <| |  | |/ ___ \\| |  | | |_| | |\\  |");
        console.log(" |_|  |_|\\___/  \\_/  |___|_____| |___|_| \\_|_|   \\___/|_| \\_\\_|  |_/_/   \\_\\_| |___\\___/|_| \\_|");
        console.log("                                                                                               ");
        console.log("================================================================================");
        console.log("LIRI: You searched for " + info + ". Here are the information.");
        console.log("================================================================================");
        //   console.log(response.data);
        console.log("TITLE: " + response.data.Title);
        console.log("YEAR: " + response.data.Year);
        console.log("IMDB - RATING: " + response.data.Ratings[0].Value);
        console.log("ROTTEN TOMATOES - RATING: " + response.data.Ratings[1].Value);
        console.log("COUNTRY: " + response.data.Country);
        console.log("LANGUAGE: " + response.data.Language);
        console.log("PLOT: " + response.data.Plot);
        console.log("CAST: " + response.data.Actors);
        console.log("================================================================================");
        })
        .catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
        });
}

//a function that gets song's information
function ShowSongTrackInformation(info){
    spotify.search({ type: 'track', query: info}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var songDetails = data.tracks.items;
        console.log("  ____  ____   ___ _____ ___ _______   __");
        console.log(" / ___||  _ \\ / _ \\_   _|_ _|  ___\\ \\ / /");
        console.log(" \\___ \\| |_) | | | || |  | || |_   \\ V / ");
        console.log("  ___) |  __/| |_| || |  | ||  _|   | |  ");
        console.log(" |____/|_|    \\___/ |_| |___|_|     |_|  ");
        console.log("                                         ");
        console.log("\nSpotify This Song's Information: ");
        console.log("I found " + songDetails.length + " results for you\n\n");
        for(var i = 0; i < songDetails.length; i++){
            console.log("Track Result #" + (i+1));
            console.log("Song Title: " + songDetails[i].name);
            console.log("Artist: " + songDetails[i].album.artists[0].name);
            console.log("Album: " + songDetails[i].album.name);
            console.log("Song URL: " + songDetails[i].preview_url + "\n\n");
        }
      });
}

//a function that gets the band's/artist's concert information
function ShowBandsInTownInformation(info){
    axios
    .get("https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp")
    .then(function(response) {

        console.log("  ____    _    _   _ ____  ____    ___ _   _   _____ _____        ___   _ ");
        console.log(" | __ )  / \\  | \\ | |  _ \\/ ___|  |_ _| \\ | | |_   _/ _ \\ \\      / / \\ | |");
        console.log(" |  _ \\ / _ \\ |  \\| | | | \\___ \\   | ||  \\| |   | || | | \\ \\ /\\ / /|  \\| |");
        console.log(" | |_) / ___ \\| |\\  | |_| |___) |  | || |\\  |   | || |_| |\ \V  V / | |\\  |");
        console.log(" |____/_/   \\_\\_| \\_|____/|____/  |___|_| \\_|   |_| \\___/  \\_/\\_/  |_| \\_|");
        console.log("                                                                          ");
        // If the axios was successful...
        // Then log the body from the site!
        console.log("================================================================================");
        console.log("LIRI: You searched for " + info + ". Here are the information.");
        console.log("================================================================================");
        
        console.log("S E A R C H I N G  . . . 100%");
        var data = response.data;
        console.log("================================================================================");
        if(data == null || data == 0 || data == ""){
            console.log("LIRI: I'm sorry, but information 404");
        }else{
            for(var i = 0; i < data.length; i++){

                if(data.length == 1){
                    console.log("LIRI: I have " + data.length + " result for you");
                    BandData(i);    
                }else{
                    console.log("LIRI: I have " + data.length + " results for you");
                    BandData(i);
                }
            }
        }
        console.log("================================================================================");
        
        function BandData(index){
            console.log("#" + index + "-------------------------------------------------------")
            console.log("Artist/Band Name: " + data[index].lineup);
            console.log("Venue Name: " + data[index].venue.name);
            console.log("Location: " + data[index].venue.city + ", " +
                            data[index].venue.region + ", " + data[index].venue.country);
            console.log("Date: " + moment(data[index].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------------------------------------------")
        }
    })
    .catch(function(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
    });
}

//a function that reads the external file
function ExecuteFile(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

      
        ShowSongTrackInformation(dataArr[1]);
      
      });
      
}