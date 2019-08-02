require('dotenv').config();

//required npm packages
const keys = require('./keys'),
      axios = require('axios'),
      Spotify = require('node-spotify-api'),
      moment = require('moment'),
      dotenv = require('dotenv'),
      fs = require("fs");

//syntax to use for getting the command line arguments
var command = process.argv[2];
    query = process.argv.slice(3).join(" ");

//setting the Spotify's keys to access the api
var spotify = new Spotify({ 
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
});

//switching with commands
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
            EmptyCommand();
}


//a function that gets movie's information
function ShowMovieInformation(info){
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if(info == "" || info == null || info.length == 0){
        info = "Mr.Nobody"
    }
    axios
        .get("http://www.omdbapi.com/?t=" + info + "&apikey=" + keys.omdbAPIKey)
        .then(function(response) {
            var movieData = response.data;
            // If the axios was successful...
            // Then log the body from the site!
            console.log("  __  __  _____     _____ _____   ___ _   _ _____ ___  ____  __  __    _  _____ ___ ___  _   _ ");
            console.log(" |  \\/  |/ _ \\ \\   / /_ _| ____| |_ _| \\ | |  ___/ _ \\|  _ \\|  \\/  |  / \\|_   _|_ _/ _ \\| \\ | |");
            console.log(" | |\\/| | | | \\ \\ / / | ||  _|    | ||  \\| | |_ | | | | |_) | |\\/| | / _ \\ | |  | | | | |  \\| |");
            console.log(" | |  | | |_| |\\ V /  | || |___   | || |\\  |  _|| |_| |  _ <| |  | |/ ___ \\| |  | | |_| | |\\  |");
            console.log(" |_|  |_|\\___/  \\_/  |___|_____| |___|_| \\_|_|   \\___/|_| \\_\\_|  |_/_/   \\_\\_| |___\\___/|_| \\_|");
            console.log("                                                                                               ");
            console.log("================================================================================\n");
            console.log("\t> LIRI: You searched for '" + info + "'. Here are the information.\n");
            console.log("================================================================================\n\n");
            console.log("   Title\t\t\t: " + movieData.Title);
            console.log("   Year\t\t\t\t: " + movieData.Year);
            for(var i = 0; i < movieData.Ratings.length; i++){
                if(movieData.Ratings[i].Source == "Internet Movie Database"){
                    console.log("   " + movieData.Ratings[i].Source + " \t: " + movieData.Ratings[i].Value)
                }

                if(movieData.Ratings[i].Source == "Rotten Tomatoes"){
                    console.log("   " + movieData.Ratings[i].Source + "\t\t: " + movieData.Ratings[i].Value)
                }
            }
            console.log("   Country\t\t\t: " + movieData.Country);
            console.log("   Language\t\t\t: " + movieData.Language);
            console.log("   Cast\t\t\t\t: " + movieData.Actors);
            console.log("   Plot\t\t\t\t: " + movieData.Plot);
            console.log("\n\n================================================================================");
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
        }
    );
}//end of ShowMovieInformation function

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
        console.log("================================================================================\n");
        console.log("\tSpotify This Song's Information: \n");
        console.log("\t> LIRI: You are searching for '" + info + "'\n");  
        console.log("\t\t\tL O A D I N G  . . . 100%\n");
        console.log("================================================================================\n");
        console.log("\t> LIRI: I found " + songDetails.length + " results for you\n\n");

        for(var i = 0; i < songDetails.length; i++){
            console.log("============================== Track Result #" + (i+1) + " ==============================");
            console.log("\n\tSong Title \t: " + songDetails[i].name);
            console.log("\n\tArtist \t\t: " + songDetails[i].album.artists[0].name);
            console.log("\n\tAlbum \t\t: " + songDetails[i].album.name);
            console.log("\n\tSong URL \t: " + songDetails[i].preview_url + "\n");
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
            console.log("================================================================================\n");
            console.log("\t> LIRI: You searched for " + info + ". Please wait until I get the " + "\n\t\tinformation you need.\n");
            console.log("\t\t\tL O A D I N G  . . . 100%");
            console.log("\n================================================================================\n");
            
            var data = response.data;
            if(data == null || data == 0 || data == ""){
                console.log("\t> LIRI: I'm sorry, but concert data 404");
            }else 
                if(data.length == 1){
                    console.log("\t> LIRI: I have " + data.length + " result for you\n");       
                }else{
                    console.log("\t> LIRI: I have " + data.length + " results for you\n");
                }
                
            for(var i = 0; i < data.length; i++){
                if(moment(moment()).isBefore(data[i].datetime, 'week')){
                    var eventNumber = 1;
                    eventNumber+=eventNumber;
                    console.log("============================= EVENT INFORMATION =============================")
                    console.log("\n\tArtist/Band Name: " + data[i].lineup);
                    console.log("\n\ttVenue Name\t: " + data[i].venue.name);
                    console.log("\n\tLocation  \t: " + data[i].venue.city + ", " +
                                    data[i].venue.region + ", " + data[i].venue.country);
                    console.log("\n\tDate  \t\t: " + moment(data[i].datetime).format("MM/DD/YYYY") + "\n\n");
                }
            }
        }
    )
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

//a function for an empty command
function EmptyCommand(){
    console.log("\n\n\t ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗     ██╗  ██╗ ██████╗ ██╗  ██╗");
    console.log("\t██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗    ██║  ██║██╔═████╗██║  ██║");
    console.log("\t██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║    ███████║██║██╔██║███████║");
    console.log("\t██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║    ╚════██║████╔╝██║╚════██║");
    console.log("\t╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝         ██║╚██████╔╝     ██║");
    console.log("\t ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝          ╚═╝ ╚═════╝      ╚═╝");
    console.log("                                                                                              ");
    console.log("\t\t\t\t _____________________________");
    console.log("\t\t\t\t|                             |")
    console.log("\t\t\t\t| It looks like you submitted |");
    console.log("\t\t\t\t|      an empty command!      |");
    console.log("\t\t\t\t|_____________________________|");
    console.log("\t\t\t\t        \\   ^__^");
    console.log("\t\t\t\t         \\  (oo)\\_______");
    console.log("\t\t\t\t            (__)\\       )\\/\\");
    console.log("\t\t\t\t                ||----w |");
    console.log("\t\t\t\t                ||     ||");
}