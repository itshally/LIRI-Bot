require('dotenv').config();

//required npm packages
const keys = require('./keys'),
      chalk = require('chalk'),
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
            console.log(chalk.cyan("  __  __  _____     _____ _____   ___ _   _ _____ ___  ____  __  __    _  _____ ___ ___  _   _ "));
            console.log(chalk.cyan(" |  \\/  |/ _ \\ \\   / /_ _| ____| |_ _| \\ | |  ___/ _ \\|  _ \\|  \\/  |  / \\|_   _|_ _/ _ \\| \\ | |"));
            console.log(chalk.cyan(" | |\\/| | | | \\ \\ / / | ||  _|    | ||  \\| | |_ | | | | |_) | |\\/| | / _ \\ | |  | | | | |  \\| |"));
            console.log(chalk.cyan(" | |  | | |_| |\\ V /  | || |___   | || |\\  |  _|| |_| |  _ <| |  | |/ ___ \\| |  | | |_| | |\\  |"));
            console.log(chalk.cyan(" |_|  |_|\\___/  \\_/  |___|_____| |___|_| \\_|_|   \\___/|_| \\_\\_|  |_/_/   \\_\\_| |___\\___/|_| \\_|"));
            console.log("                                                                                               ");
            console.log("================================================================================\n");
            console.log(chalk.green("\t> LIRI: ") + "You searched for '" + chalk.bgBlue.white(info) + "'. Here are the information.\n");
            console.log("================================================================================\n\n");
            console.log(chalk.cyan("   Title\t\t\t: ") + movieData.Title);
            console.log(chalk.cyan("   Year\t\t\t\t: ") + movieData.Year);
            for(var i = 0; i < movieData.Ratings.length; i++){
                if(movieData.Ratings[i].Source == "Internet Movie Database"){
                    console.log(chalk.cyan("   " + movieData.Ratings[i].Source + " \t: ") + movieData.Ratings[i].Value)
                }

                if(movieData.Ratings[i].Source == "Rotten Tomatoes"){
                    console.log(chalk.cyan("   " + movieData.Ratings[i].Source + "\t\t: ") + movieData.Ratings[i].Value)
                }
            }
            console.log(chalk.cyan("   Country\t\t\t: ") + movieData.Country);
            console.log(chalk.cyan("   Language\t\t\t: ") + movieData.Language);
            console.log(chalk.cyan("   Cast\t\t\t\t: ") + movieData.Actors);
            console.log(chalk.cyan("   Plot\t\t\t\t: ") + movieData.Plot);
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
}

//a function that gets song's information
function ShowSongTrackInformation(info){
    if(info == "" || info == null || info.length == 0){
        info = "The Sign"
    }
    spotify.search({ type: 'track', query: info}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songDetails = data.tracks.items;
        console.log(chalk.green("  ____  ____   ___ _____ ___ _______   __"));
        console.log(chalk.green(" / ___||  _ \\ / _ \\_   _|_ _|  ___\\ \\ / /"));
        console.log(chalk.green(" \\___ \\| |_) | | | || |  | || |_   \\ V / "));
        console.log(chalk.green("  ___) |  __/| |_| || |  | ||  _|   | |  "));
        console.log(chalk.green(" |____/|_|    \\___/ |_| |___|_|     |_|  "));
        console.log("                                         ");
        console.log("================================================================================\n");
        console.log(chalk.green("\tSpotify This Song's Information: ") +"\n");
        console.log("\t> "+ chalk.green('LIRI:') + " You are searching for '" + chalk.bgBlue.white(info) + "'\n");  
        console.log(chalk.bgWhite.black("\t\t\tL O A D I N G  . . . 100%\n"));
        console.log("================================================================================\n");
        console.log("\t> " + chalk.green('LIRI:') + " I found " + chalk.red(songDetails.length) + " results for you\n\n");

        for(var i = 0; i < songDetails.length; i++){
            console.log("============================== Track Result #" + (i+1) + " =================================");
            console.log(chalk.green("\n\tSong Title \t: ") + songDetails[i].name);
            console.log(chalk.green("\n\tArtist \t\t: ") + songDetails[i].album.artists[0].name);
            console.log(chalk.green("\n\tAlbum \t\t: ") + songDetails[i].album.name);
            console.log(chalk.green("\n\tSong URL \t: ") + chalk.blue(songDetails[i].preview_url) + "\n");
        }
      });
}

//a function that gets the band's/artist's concert information
function ShowBandsInTownInformation(info){
    if(info == "" || info == null || info.length == 0){
        console.log(chalk.yellow("  ____    _    _   _ ____  ____    ___ _   _   _____ _____        ___   _ "));
        console.log(chalk.yellow(" | __ )  / \\  | \\ | |  _ \\/ ___|  |_ _| \\ | | |_   _/ _ \\ \\      / / \\ | |"));
        console.log(chalk.yellow(" |  _ \\ / _ \\ |  \\| | | | \\___ \\   | ||  \\| |   | || | | \\ \\ /\\ / /|  \\| |"));
        console.log(chalk.yellow(" | |_) / ___ \\| |\\  | |_| |___) |  | || |\\  |   | || |_| |\\ \V  V / | |\\  |"));
        console.log(chalk.yellow(" |____/_/   \\_\\_| \\_|____/|____/  |___|_| \\_|   |_| \\___/  \\_/\\_/  |_| \\_|"));
        console.log("                                                                          ");
        console.log("================================================================================\n");
        console.log(chalk.green("\t> LIRI:") + " You're searching for an empty query. Please type something.");
        console.log("\n================================================================================\n");
    }else{    
        axios
            .get("https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp")
            .then(function(response) {

                console.log(chalk.yellow("  ____    _    _   _ ____  ____    ___ _   _   _____ _____        ___   _ "));
                console.log(chalk.yellow(" | __ )  / \\  | \\ | |  _ \\/ ___|  |_ _| \\ | | |_   _/ _ \\ \\      / / \\ | |"));
                console.log(chalk.yellow(" |  _ \\ / _ \\ |  \\| | | | \\___ \\   | ||  \\| |   | || | | \\ \\ /\\ / /|  \\| |"));
                console.log(chalk.yellow(" | |_) / ___ \\| |\\  | |_| |___) |  | || |\\  |   | || |_| |\\ \V  V / | |\\  |"));
                console.log(chalk.yellow(" |____/_/   \\_\\_| \\_|____/|____/  |___|_| \\_|   |_| \\___/  \\_/\\_/  |_| \\_|"));
                console.log("                                                                          ");
                console.log("================================================================================\n");
                console.log(chalk.green("\t> LIRI:") + " You searched for '" + chalk.bgBlue.white(info) + "'. Please wait until I get the " + "\n\t\tinformation you need.\n");
                console.log(chalk.bgWhite.black("\t\t\tL O A D I N G  . . . 100%\n"));
                console.log("\n================================================================================\n");
                
                var data = response.data;
                if(data == null || data == 0 || data == ""){
                    console.log(chalk.green("\t> LIRI:") + " I'm sorry, but concert data 404");
                }else 
                    if(data.length == 1){
                        console.log(chalk.green("\t> LIRI:") + " I have " + chalk.red(data.length) + " result for you\n");       
                    }else{
                        console.log(chalk.green("\t> LIRI:") + " I have " + chalk.red(data.length) + " results for you\n");
                    }
                
                for(var i = 0; i < data.length; i++){
                    if(moment(moment()).isBefore(data[i].datetime, 'week')){
                        var eventNumber = 1;
                        eventNumber+=eventNumber;
                        console.log("============================= EVENT INFORMATION ================================")
                        console.log(chalk.yellow("\n\tArtist/Band Name: ") + data[i].lineup);
                        console.log(chalk.yellow("\n\ttVenue Name\t: ") + data[i].venue.name);
                        console.log(chalk.yellow("\n\tLocation  \t: ") + data[i].venue.city + ", " +
                                        data[i].venue.region + ", " + data[i].venue.country);
                        console.log(chalk.yellow("\n\tDate  \t\t: ") + moment(data[i].datetime).format("MM/DD/YYYY") + "\n\n");
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
    console.log(chalk.red("\n\n\t ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗     ██╗  ██╗ ██████╗ ██╗  ██╗"));
    console.log(chalk.red("\t██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗    ██║  ██║██╔═████╗██║  ██║"));
    console.log(chalk.red("\t██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║    ███████║██║██╔██║███████║"));
    console.log(chalk.red("\t██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║    ╚════██║████╔╝██║╚════██║"));
    console.log(chalk.red("\t╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝         ██║╚██████╔╝     ██║"));
    console.log(chalk.red("\t ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝          ╚═╝ ╚═════╝      ╚═╝"));
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