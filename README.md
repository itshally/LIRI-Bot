# LIRI-Bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and then responses with the data back to the user.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

This app retrieves the data by sending requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You can find these Node packages crucial below.

- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
- [Axios](https://www.npmjs.com/package/axios)
  - You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com/) and the [Bands In Town API](https://www.artists.bandsintown.com/bandsintown-api)
- [Moment](https://www.npmjs.com/package/moment)
- [DotEnv](https://www.npmjs.com/package/dotenv)

---

## How to Run this App
#### Requirements
- This entire repository
- The required APIs
- Git Bash

#### Direction
1. Run your Git Bash console. Type `cd` command and then the directory path where you cloned this repository.

    Example:` cd Desktop/folder1/subfolder/liri-node-app` and then press `ENTER` key

2. Once you are done, type in `node liri <command here> <parameter>` to the console.
- For the `<command here>`, here are the list of commands you can use:
  - `concert-this`
  - `spotify-this-song`
  - `movie-this`
  - `do-what-it-says`
- Then you can type in the `<parameter>` whatever you want to search

---
### Preview
- This will be the output if the user didn't type any command or left it empty
![](https://github.com/itshally/liri-node-app/blob/master/screenshot/img-1.PNG)

- For the "`movie-this`" command
  - This will be the default result
  ~ ![](https://github.com/itshally/liri-node-app/blob/master/screenshot/img-2.PNG)

- For the "`spotify-this-song`" command
  - This will be the output
  ~ ![](https://github.com/itshally/liri-node-app/blob/master/screenshot/img-5.PNG)
  
- For the "`concert-this`" command
  - This will be the output
  ~ ![](https://github.com/itshally/liri-node-app/blob/master/screenshot/img-7.PNG)
  
- For the "`do-what-it-says`" command
  - This will be the output
  ~ ![](https://github.com/itshally/liri-node-app/blob/master/screenshot/img-9.PNG)
---
#### Technologies  
1.  Git Bash
2.  VS Code
3.  npm
4.  Node.js

#### Languages
1. Javascript





Author and Developer: **Hally**
