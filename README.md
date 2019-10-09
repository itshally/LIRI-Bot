
# Liri Bot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and then responses with the data back to the user.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

This app retrieves the data by sending requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You can find these Node packages crucial below.

**Project Requirements:**

:white_check_mark: LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

:white_check_mark: Send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for this project:

- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
- [Axios](https://www.npmjs.com/package/axios)
- [Moment](https://www.npmjs.com/package/moment)
- [DotEnv](https://www.npmjs.com/package/dotenv)

## :open_file_folder: Files
```
liri-node-app
├─ .git
│ ├─ config
│ ├─ description
│ ├─ FETCH_HEAD
│ ├─ HEAD
│ ├─ hooks
│ │ ├─ applypatch-msg.sample
│ │ ├─ commit-msg.sample
│ │ ├─ fsmonitor-watchman.sample
│ │ ├─ post-update.sample
│ │ ├─ pre-applypatch.sample
│ │ ├─ pre-commit.sample
│ │ ├─ pre-push.sample
│ │ ├─ pre-rebase.sample
│ │ ├─ pre-receive.sample
│ │ ├─ prepare-commit-msg.sample
│ │ └─ update.sample
│ ├─ index
│ ├─ info
│ │ └─ exclude
│ ├─ logs
│ │ ├─ HEAD
│ │ └─ refs
│ │ ├─ heads
│ │ │ └─ master
│ │ └─ remotes
│ │ └─ origin
│ │ └─ HEAD
│ ├─ objects
│ │ ├─ info
│ │ └─ pack
│ │ ├─ pack-d2e4e15d6ee8c452264c15c894e9fea4cec3d97a.idx
│ │ └─ pack-d2e4e15d6ee8c452264c15c894e9fea4cec3d97a.pack
│ ├─ packed-refs
│ └─ refs
│ ├─ heads
│ │ └─ master
│ ├─ remotes
│ │ └─ origin
│ │ └─ HEAD
│ └─ tags
├─ .gitignore
├─ keys.js
├─ liri.js
├─ package-lock.json
├─ package.json
├─ random.txt
├─ README.md
└─ screenshot
├─ img-1.PNG
├─ img-2.PNG
├─ img-3.PNG
├─ img-4.PNG
├─ img-5.PNG
├─ img-6.PNG
├─ img-7.PNG
├─ img-8.PNG
└─ img-9.PNG
```

## Technologies
- JavaScript
  - jQuery
  - Momentjs
  - Axios
  - Nodejs
  - JSON
  - chalk
- APIs
	- Spotify
	- OMDB
	- Bands In Town

## Install
To clone this project to your device, type the `code` below to your git bash:
```bash
git clone https://github.com/itshally/liri-node-app.git
```

Then, type the code to run the project:
```bash
cd liri-node-app
npm install
```

You must add a `.env` file and type in the following:
```
SPOTIFY_ID=[insert key code here]
SPOTIFY_SECRET=[insert key code here]

REACT_APP_API_KEY=[insert key code here]
```
**:pencil: Note: Do the following to get your API keys**

**Spotify API**
- Make sure you have a Spotify account. Go to this link if you have :point_right: [Spotify for Developers](https://developer.spotify.com/dashboard/). Then, login with your Spotify account.
- In your Spotify **Dashboard** tab, click **Create an app** and then complete the required input fields.
- Afterwards, click the app that you just created to view your keys.
  - `SPOTIFY_ID` is your Spotify **Client ID**
  - `SPOTIFY_SECRET` is your **Client Secret**

**OMDB API**
- To claim your API key, go to this link :point_right: [OMDB API](http://www.omdbapi.com/apikey.aspx)
- Click the **FREE! (1,000 daily limit)** as your account type and complete the required input fields.
- You will receive an email with your API key

Save those 3 keys in your `.env` file.

## Usage
:pencil: **App Commands:**
- `concert-this`
- `spotify-this-song`
- `movie-this`
- `do-what-it-says`

To start this project, type the code below to your git console:
```bash
node liri [app command] [query of your search]
```

Example: `node liri movie-this mission impossible`

## Screenshots

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


## Author

[@itshally](https://github.com/itshally)  
