# Music, Mood and Fitness
The Music, Mood and Fitness project is a concept developed by Egde Consulting AS (https://www.egdeconsulting.no) as a student project for a team at the Univeristy in Agder (https://www.uia.no). 

We have released the code under the MIT license and welcome the community to further develop the proof of concept.

## Project Brief
The challenge for the team was to develop an App that can allow users to assess their mood and compare it to the type of music they have been listening to and the amount of exercise and quality of sleep. The brief:
-	Collect personal data from Fitbit, Garmin and Spotify;
-	Allow you to assess your mood for the day;
-	Analyse the music features such as danceability and tempo;
-	Display a graph of music attributes against training and sleep;
- Option to upload the data anonymously to a research database with full informed consent.

## Technologies used
### Digi.me
We recommended that the team use [Digi.me](https://developers.digi.me) as a one-stop source of fitness and music data. This allowed the team to retrieve a user’s fitness data (steps, training, and sleep patterns) into the app using Digi.me’s consent contract.
![Image of DigiMe consent](https://github.com/EgdeNorway/MMF/blob/master/images/mmf1.png)
### Spotify
The only other API call required was back to the Spotify API to retrieve the Audio Features of each track in the playlist.

### ReactNative and Google Firebase
The team used ReactNative to build a cross-platform app and has been run and partially tested on Android, not iOS (as of September 2019).

### Current Status (23.9.2019)
The App is very simple to use. You connect it to Digi.me (after downloading Digi.me and setting up an account if you don’t already have it). 

Digi.me allows you to collect your fitness and sleep information from Fitbit, Garmin and Google Fit. It also allows you to collect a history of your entertainment from Spotify and YouTube. You authorise the Music Mood and Fitness App to connect to your Digi.me account and collect the relevant data.

The home screen displays a summary of recent data.
![Image of home screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf2.png)

Registering a mood is a simple choice from 5 icons and the possibility to add a comment.
![Image of mood screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf3.png)
![Image of mood screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf4.png)

The App has graphs showing Nutrition (calories from the fitness device), Activity, Music and Sleep.
![Image of detail screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf5a.png)
![Image of detail screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf5b.png)
![Image of detail screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf5c.png)


A screen displays the music that corresponds to a registered mood (Happy, Neutral and Sad). This can then generate a playlist in Spotify that the user can save.
![Image of detail screen](https://github.com/EgdeNorway/MMF/blob/master/images/mmf6.png)
