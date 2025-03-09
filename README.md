# Realm TTRPG web interface

A web interface for use with the associated [bot software][] and [API server][]
to facilitate the play and administration of [tabletop roleplaying games][]

![realm](https://raw.githubusercontent.com/realm-ttrpg/web-interface/assets/banner.jpg)

## Installing

First, make a `src/.env` file from the provided `src/.env.example` file,
replacing the placeholder values with your own Discord client ID and Realm API
server address.

You will need a `$HOME/.npmrc` file with credentials for `npm.pkg.githb.com` to
install some of the dependencies. (See:
[Authenticating with a personal access token][])

Using NodeJS 22 (or greater), install the project dependencies:

```shell
npm ci
```

Then, build the static site:

```shell
npm run build:local
```

## Running

Either serve the contents of the `html/` folder yourself or use the development
server:

```shell
npm run dev
```

[api server]: https://github.com/realm-ttrpg/api-server
[authenticating with a personal access token]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token
[bot software]: https://github.com/realm-ttrpg/discord-bot
[tabletop roleplaying games]: https://en.wikipedia.org/wiki/Tabletop_role-playing_game
