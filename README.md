# tcpsim-ui

### Install dependencies.
This step is needed in order to run other 'npm' commands.

```sh
npm install
```

### How to get a pure HTML webpage ready for use
The site is going to be created in the "dist/" folder.

```sh
npm run build
```

### Sync dependencies with logic package
This is only needed for the development of both logic and ui at the same time. It's not needed if you don't make changes to the repositories.

```sh
npm update tcpsim-logic
```

