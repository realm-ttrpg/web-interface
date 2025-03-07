# Realm TTRPG web interface

A web interface for use with the associated [bot software][] and [API server][]
to facilitate the play and administration of [tabletop roleplaying games][]

![realm](https://raw.githubusercontent.com/realm-ttrpg/web-interface/assets/banner.jpg)

## Installing

First, make a `src/.env` file from the provided `src/.env.example` file,
replacing the placeholder values with your own Discord client ID and Realm API
server address.

Using NodeJS 22 (or greater), install the project dependencies:

```shell
npm login --scope @haliphax  # password is your GitHub auth token
npm ci
```

Then, build the static site:

```shell
npm run build
```

## Running

Either serve the contents of the `html/` folder yourself or use the development
server:

```shell
npm run dev
```

[api server]: https://github.com/realm-ttrpg/api-server
[bot software]: https://github.com/realm-ttrpg/discord-bot
[tabletop roleplaying games]: https://en.wikipedia.org/wiki/Tabletop_role-playing_game
