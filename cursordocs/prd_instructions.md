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

### Step 2 - Model

- Create a model for the channel named 'PodcastChannel' with the following fields:
  - name
  - description
  - imageURL
  - email
  - explicit (boolean)
  - language
  - copyright
  - owner
  - category
  - explicit
- Create a model for the podcast episodes named 'PodcastEpisode' with the following fields:
  - title
  - description
  - image
  - url
  - audio_file
  - duration
  - published_at
  - tags (an episode can have multiple tags)
- Create a model for the audio files named 'PodcastAudioFile' with the following fields:
  - path
  - filename
  - size
  - duration
  - mime_type
  - created_at
  - updated_at

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

Profile page to set user info and channel required info for iTunes (/profile)

#### Toast Notifications

- All pages MUST USE toast for notifications of events (success, error, info, warning) when interacting with the app for:

- managing channel info (add, update)
- managing episodes (add, delete, edit)

#### Channel Page

Channel page to list all episodes (/channel)

- The page must list all episodes in a grid of cards, showing a max number of 4 cards per row.
- In the channel page, the user must be able to add a new episode (/channel/new).

  - To mock the data we will first use a form to add a new episode and then we will use the Youtube API to get the data from a Youtube video url.

- The cards must have a title, a description, a thumbnail, the tags, date created and a link to the episode details page
- Cards should be modern looking with tags having vivid colors and a link to the podcast details page
- Cards should scale on hover to create a nice effect

#### Home Page

Home page to show a list of recently added episodes and recently modified episodes (/)

- Create basic Home Page to show two sections:

1.  with a list of 5 most recently added episodes
2.  with alist of the 5 most recently modified episodes

- Episodes must be displayed in a row of cards, showing a max number of 5 cards per row
- The cards must have a title, a thumbnail, the tags, date created and a link to the episode details page. They should be smaller than the cards in the channel page
- Cards should be modern looking with tags having vivid colors and a link to the podcast details page
- Cards should scale on hover to create a nice effect

#### Episode Details Page

Episode Details page to show details of an episode (/episode/:id)

The page must have a centered big image of the episode thumbnail, the title, the description, the tags in vivid colors, the date created and last edited, and a audio component to listen to the episode on the browser link to the audio file.

The page must have the following features:

- the user must be able to delete an episode
- the user must be able to edit an episode
- the user must be able to reproduce an audio episode in the browser

#### Stats Page

Stats page to show stats of the channel (/stats)

Section 1:

- The page must have a centered graph to show the number of episodes with a 'tag'.
- When the user clicks on a tag, a grid below the graph will show the episodes with that 'tag'
- the User must be able to clear the filter and clear the list of viedos of the selected tag

Section 2:

- The page must have a centered graph to show the number of episodes created by month.
- When the user clicks on a column (representing a month), a grid below the graph will show the episodes for that month
- the User must be able to clear the filter and clear the list of viedos of the selected month

#### Dark Mode Toggle

Add Dark Mode Toggle

#### Public Page

Personal Public page to show the data about the channel: sometimes required to have a public page to show the data about the channel (/public/:name)

#### Podcast XML Feed for iTunes

Podcast XML Feed for iTunes (/public/feed.xml)

### Step 4 - Donwload audio from Youtube

- use Javascript library to download audio from Youtube video
- use ffmpeg to convert the audio to m4a format if needed
- publish audio files as static files in nextjs app
- use nextjs server actions to save the audio files into the DB

## Step 5 - iTunes Integration

- Use Podcast Generator Library to create/update/delete the XML file for iTunes

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