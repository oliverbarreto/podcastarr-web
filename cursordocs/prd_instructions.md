## Roadmap

#### General and Technical Stack Requirements:

- Use TailwindCSS for styling
- Use Shadcn UI for components
- Use Lucide React icons for icons
- Use NextJS routing, server actions, and server components
- Use Prisma as ORM
- Use SQLite as data base
- Use Zustand for state management
- Use recharts library to create graphs
- Use ytdl-core to download audio from Youtube
- Use ffmpeg to convert audio to m4a format
- Use a XML Podcast Generator Library to create/update/delete the XML file for iTunes

### Step 1 - Create Project Skeleton

- Create a new NextJS project with App Router
- Incorporate Prisma to project to use with SQLite
- Incorporate Shadcn UI to project
- Create basic Profile Page to set user info and channel required info for iTunes

### Step 2 - Initial Model (Not sure this is going to be modified later)

- Create a model for the channel named 'PodcastChannel' with the following fields:
- Create a first version model for the podcast episodes named 'PodcastEpisode' with the following fields:

model PodcastChannel {
id Int @id @default(autoincrement())
title String
description String
userName String
userEmail String
ownerName String @default("")
ownerEmail String @default("")
language String @default("English")
imageUrl String?
explicitContent Boolean @default(false)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model PodcastEpisode {
id Int @id @default(autoincrement())
title String
description String
imageUrl String?
audioFileUrl String?
duration Int?
publishedAt DateTime @default(now())
tags String // We'll store as comma-separated string
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

### Step 3 - Basic Features

#### Layout (DONE)

Create basic Layout with Navbar and Footer

- the navbar must have a link to the home page, the channel page, the stats page and the profile page
- the footer must have a link to the privacy policy page and the terms of service page
- the navbar must have a link to the dark mode toggle, only dark and light mode are allowed (it must be a switch, and do not add an option for system mode)
- the navbar must have a search input to filter episodes in the channel page.
- the search must be a magnifying glass icon that when hovered over it expands into a search box to enable text input, and when the user clicks outside the search box or presses escape it collapses into the magnifying glass icon
- The search must be a simple search, and the results must be shown in the same grid of cards with the same style as the cards in the channel page, but filtered

#### Profile Page (DONE)

Profile page to set user info and channel required info for iTunes (/channelinfo)

#### Toast Notifications (DONE)

- All pages MUST USE toast for notifications of events (success, error, info, warning) when interacting with the app for:

- (DONE) managing channel info (add, update)
- (DONE) managing episodes (add, delete, edit)

#### Channel Page (DONE)

Channel page to list all episodes (/channel)

- The page must list all episodes in a grid of cards, showing a max number of 4 cards per row.
- In the channel page, the user must be able to add a new episode (/channel/new).

  - To mock the data we will first use a form to add a new episode and then we will use the Youtube API to get the data from a Youtube video url.

- The cards must have a title, a description, a thumbnail, the tags, date created and a link to the episode details page
- Cards should be modern looking with tags having vivid colors and a link to the podcast details page
- Cards should scale on hover to create a nice effect

#### Add Shadcn theme colors to the project (DONE)

change default theme to use purple colors

#### Home Page (DONE)

Home page to show a list of recently added episodes and recently modified episodes (/)

- Create basic Home Page to show two sections:

1.  with a list of 5 most recently added episodes
2.  with alist of the 5 most recently modified episodes

- Episodes must be displayed in a row of cards, showing a max number of 5 cards per row
- The cards must have a title, a thumbnail, the tags, date created and a link to the episode details page. They should be smaller than the cards in the channel page
- Cards should be modern looking with tags having vivid colors and a link to the podcast details page
- Cards should scale on hover to create a nice effect

#### Episode Details Page (DONE)

Episode Details page to show details of an episode (/episode/:id)

The page must have a centered big image of the episode thumbnail, the title, the description, the tags in vivid colors, the date created and last edited, and a audio component to listen to the episode on the browser link to the audio file.

The page must have the following features:

- the user must be able to delete an episode
- the user must be able to edit an episode
- the user must be able to reproduce an audio episode in the browser

#### Stats Page (DONE)

Stats page to show stats of the channel (/stats)

Section 1:

- The page must have a centered graph to show the number of episodes with a 'tag'.
- When the user clicks on a tag, a grid below the graph will show the episodes with that 'tag'
- the User must be able to clear the filter and clear the list of viedos of the selected tag

Section 2:

- The page must have a centered graph to show the number of episodes created by month.
- When the user clicks on a column (representing a month), a grid below the graph will show the episodes for that month
- the User must be able to clear the filter and clear the list of viedos of the selected month

#### Dark Mode Toggle (DONE)

Add Dark Mode Toggle

#### Refactor folder structure (DONE)

- Create folder for (root) inside app folder
- Create folder for public (public) page inside app folder for the public page necesary for iTunes

#### Public Page (TODO)

Personal Public page to show the data about the channel: sometimes required to have a public page to show the data about the channel (/public/:name)

### Step 4 - Connect CHANNEL to Backend API (TODO)

We need to connect the frontend to the backend API to get data about the channel and the episodes.The backend is reseponsible for donwloading audio from Youtube and convert it to m4a format. The backend API is made with Python FastAPI

Create or update channel info with an api call like this:

```
curl -X 'PUT' \
  'http://127.0.0.1:8000/channel' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d ' {
     "name": "Oliver'\''s Podcast Channel",
     "description": "I Publish Things ⭐️",
     "website_url": "https://podcastarr.oliverbarreto.com",
     "explicit": true,
     "image_url": "https://www.oliverbarreto.com/images/site-logo.png",
     "language": "en",
     "category": "Technology",
     "authors": "Oliver Barreto",
     "authors_email": "oliver.barreto.online@gmail.com",
     "owner": "Oliver Barreto",
     "owner_email": "oliver.barreto.online@gmail.com"
   }'
```

Get the channel info with an api call like this:

```
curl -X 'GET' \
  'http://127.0.0.1:8000/channel' \
  -H 'accept: application/json'
```

if there is no channel on the database it will error out with status_code=404, detail="Channel not found".

### Step 5 - Connect EPISODES to Backend API (TODO)

To access information about the episodes we need to use the API endpoints:

#### Create an episode

- The Espisodes are created throught the API "/api/download" endpoint with is a POST request that takes the youtube video url as the only parameter and are saved in the DB with the audio file url.

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/download?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DlUbobOf9uqM' \
  -H 'accept: application/json' \
  -d ''
```

Response:

```json
{
  "id": "b53599b5-92da-44bd-bcaf-4f91e962f8ec",
  "url": "https://www.youtube.com/watch?v=lUbobOf9uqM",
  "created_at": "2025-01-19T13:32:54.573832",
  "updated_at": "2025-01-19T13:32:54.573832",
  "status": "pending",
  "tags": null,
  "count": 0,
  "last_accessed_at": null,
  "video_id": "lUbobOf9uqM",
  "title": "Así fue el regreso de Jaime Fernández, 300 días después de su lesión",
  "subtitle": "INSIDE CBC | Sound 🔛\n\nSube el volumen y emociónate con Jaime Fernández...",
  "summary": "INSIDE CBC | Sound 🔛\n\nSube el volumen y emociónate con Jaime Fernández",
  "position": 0,
  "image_url": "https://i.ytimg.com/vi/lUbobOf9uqM/maxresdefault.jpg",
  "published_at": "2025-01-19T00:00:00",
  "explicit": false,
  "media_url": null,
  "media_size": null,
  "author": "La Laguna Tenerife",
  "keywords": "Baloncesto, CB Canarias, La Laguna Tenerife, Liga Endesa, ACB, Jaime Fernández",
  "media_duration": 139,
  "media_length": null
}
```

#### Get all episodes

- The episodes are available with the route GET "/api/downloads":

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/api/downloads?limit=100&offset=0' \
  -H 'accept: application/json'
```

Response:

```json
[
  {
    "id": "b53599b5-92da-44bd-bcaf-4f91e962f8ec",
    "url": "https://www.youtube.com/watch?v=lUbobOf9uqM",
    "created_at": "2025-01-19T13:32:54.573832",
    "updated_at": "2025-01-19T13:32:57.509783",
    "status": "downloaded",
    "tags": null,
    "count": 0,
    "last_accessed_at": null,
    "video_id": "lUbobOf9uqM",
    "title": "Así fue el regreso de Jaime Fernández, 300 días después de su lesión",
    "subtitle": "INSIDE CBC | Sound 🔛\n\nSube el volumen y emociónate con Jaime Fernández...",
    "summary": "INSIDE CBC | Sound 🔛\n\nSube el volumen y emociónate con Jaime Fernández",
    "position": 0,
    "image_url": "https://i.ytimg.com/vi/lUbobOf9uqM/maxresdefault.jpg",
    "published_at": "2025-01-19T00:00:00",
    "explicit": false,
    "media_url": "./downloads/lUbobOf9uqM.m4a",
    "media_size": 2249761,
    "author": "La Laguna Tenerife",
    "keywords": "Baloncesto, CB Canarias, La Laguna Tenerife, Liga Endesa, ACB, Jaime Fernández",
    "media_duration": 139,
    "media_length": 2249761
  },
  {
    "id": "4e437cf9-26c6-42f5-82f6-22bb6c58ae14",
    "url": "https://www.youtube.com/watch?v=gCiY-een7dY",
    "created_at": "2025-01-19T00:52:40.869591",
    "updated_at": "2025-01-19T00:52:48.143272",
    "status": "downloaded",
    "tags": null,
    "count": 0,
    "last_accessed_at": null,
    "video_id": "gCiY-een7dY",
    "title": "How To Reset AirPods So They Can't Be Tracked",
    "subtitle": "Let's reset your AirPods or AirPods Pro if you want to make sure they can't be tracked by the previo...",
    "summary": "Let's reset your AirPods or AirPods Pro if you want to make sure they can't be tracked by the previous owner.\n\nIf this video helped you, please consider subscribing to my channel, it really helps me out. Thanks guys :)\n\nIf you have any questions about what you saw or unresolved issues, leave them in the comments below. Alternatively, you can send me an email by heading to my channel page, tapping on About, and tapping on View email address. I look forward to hearing from you. Have a great day!",
    "position": 0,
    "image_url": "https://i.ytimg.com/vi/gCiY-een7dY/maxresdefault.jpg",
    "published_at": "2023-06-05T00:00:00",
    "explicit": false,
    "media_url": "./downloads/gCiY-een7dY.m4a",
    "media_size": 2080497,
    "author": "Trevor Nace",
    "keywords": "apps, iPhone, android, ios",
    "media_duration": 129,
    "media_length": 2080497
  }
]
```

#### Get a specific episode

- To get the information of a specific episode we need to use the route GET "/api/downloads/{video_id}"

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/api/downloads/lUbobOf9uqM' \
  -H 'accept: application/json'
```

Response:

```json
{
  "id": "b53599b5-92da-44bd-bcaf-4f91e962f8ec",
  "url": "https://www.youtube.com/watch?v=lUbobOf9uqM",
  "created_at": "2025-01-19T13:32:54.573832",
  "updated_at": "2025-01-19T13:47:55.991155",
  "status": "downloaded",
  "tags": null,
  "count": 1,
  "last_accessed_at": "2025-01-19T13:47:55.991150",
  "video_id": "lUbobOf9uqM",
  "title": "Así fue el regreso de Jaime Fernández, 300 días después de su lesión",
  "subtitle": "INSIDE CBC | Sound 🔛\n\nSube el volumen y emociónate con Jaime Fernández...",
  "summary": "INSIDE CBC | Sound 🔛\n\nSube el volumen y emociónate con Jaime Fernández",
  "position": 0,
  "image_url": "https://i.ytimg.com/vi/lUbobOf9uqM/maxresdefault.jpg",
  "published_at": "2025-01-19T00:00:00",
  "explicit": false,
  "media_url": "./downloads/lUbobOf9uqM.m4a",
  "media_size": 2249761,
  "author": "La Laguna Tenerife",
  "keywords": "Baloncesto, CB Canarias, La Laguna Tenerife, Liga Endesa, ACB, Jaime Fernández",
  "media_duration": 139,
  "media_length": 2249761
}
```

#### PLAYBACK a specific episode

- To play a specific episode we need to use the route GET "/api/audio/{video_id}". This will provide the audio file to play in the browser so it can be used with the multimedia element.

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/audio/lUbobOf9uqM' \
  -H 'accept: application/json'
```

## Discarded Features for now

DO NOT IMPLEMENT THE FOLLOWING FEATURES YET !!!

Video Downloader -[x] Extract información from video object (title, media url, length, description (text/html), etc.) -[x] Allow using different libraries to download audio file (Pafy, Pytubefix, Pytube, Youtube_dl, etc.) via creating an Interface that defines required functionality and an implementation that provides that using one or another library -[x] Download audio file from Youtube video from url (save by default audio with )

File Manager: Save, Delete, check if already exists

Podcast Manager:

- Podcast Channel information
- Episode information (title, description, media url, length, etc.)
- Files information (path, filename, size, etc.)
- Create & Update XML for iTunes (Use External Podcast Generator Library) with DB info

DB Manager: save into DB (sqlite3):

- Podcast Channel information
- Episode information (title, description, media url, length, etc.)
- Files information (path, filename, size, etc.)

Podcast XML Server (for iTunes)

- publish xml file for iTunes (must be https)
- Options:
  - use Github pages to publish xml file
  - use local API server to publish xml file (must be behind a NGINX proxy with SSL)

FastAPI -[x] Serve /static/media files (.m4a & .xml) -[x] Create episode from Youtube video url: use audio file and use media from Youtube video
-[] save info into DB

- List all episodes
- Delete episode
  -[] and save into DB
- Create & Publish xml file for iTunes (Podcast XML Server)
