# RLSideswipeBot

This is the repository for the bot I'm creating for [r/RLSideswipe](https://www.reddit.com/r/RLSideswipe). It is made with Typescript and operates as a Node.js application that communicates directly with the Reddit API.

With the current setup, the bot uses the `dotenv` package to import environment variables from a `.env` file in the root directory. This file contains the values for `CLIENT_ID`, `CLIENT_SECRET`, `REDDIT_USERNAME`, and `REDDIT_PASSWORD` to authenticate the bot with Reddit's OAuth API. This approach does not provide a refresh token, and it may be necessary that the bot be reloaded occasionally based on the time online, which can be implemented using `<Client>#uptime`.
