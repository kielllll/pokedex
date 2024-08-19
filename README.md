# Pokedex

This is a web application that is built with [`Vite + React`](https://vitejs.dev/guide/), [`TypeScript`](https://www.typescriptlang.org/), and [`Chakra UI`](https://v2.chakra-ui.com/). It uses the [`PokeAPI`](https://pokeapi.co/docs/v2#info) to fetch and display Pokemon data on top with a local storage as a persistent data store using [`Jotai`](https://jotai.org/).

## Demo

You can see a demo of the application [here](https://dqp9yjms1imz2.cloudfront.net/).

## Installation

Before staring, you must have these requirements installed:

- pnpm
- node (at least v19)
- git

Start by cloning the repository:

```bash
git clone git@github.com:kielllll/pokedex.git
```

Change the directory to the project:

```bash
cd pokedex
```

If you are using `nvm`, you can use the following command to install the required node version:

```bash
nvm use
```

Then, install the dependencies:

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in the required values. The value used for `VITE_POKE_API_URL` is the URL of the PokeAPI `https://pokeapi.co/api/v2`.

```bash
cp .env.example .env
```

Finally, start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Tests

To run the tests, you can use the following command:

```bash
pnpm test
```
