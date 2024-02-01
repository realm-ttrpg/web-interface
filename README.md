# Realm TTRPG web interface

A web interface for use with the associated [bot software][] to facilitate the
play and administration of [tabletop roleplaying games][]

![realm](https://raw.githubusercontent.com/realm-ttrpg/web-interface/assets/banner.jpg)

## Installing

```shell
npm login --scope @haliphax  # password is your GitHub auth token
npm ci
npm run build
```

## Running

Either serve the contents of the `html/` folder yourself or use the development
server:

```shell
npm run dev
```

[bot software]: https://github.com/realm-ttrpg/discord-bot
[tabletop roleplaying games]: https://en.wikipedia.org/wiki/Tabletop_role-playing_game
