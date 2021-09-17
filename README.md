# Dumbbell Plot Data Studio Community Visualization


```bash
gcloud auth activate-service-account --key-file service.json;
npm run start;
```

### Local development workflow

To develop locally:

1.  Change `const LOCAL` to `true` in `src/index.js`.
1.  Run `npm run start` to start a local server. A browser tab should open with
    the visualization you just deployed in Data Studio.
1.  Make changes in `src/index.js` and `src/index.css`, save the changes, and
    see them reflected in the browser tab.

### Deployment workflow

You should have two deployments of your visualization: a "dev" version, where
[caching] is disabled and where you normally develop, and a "prod" version,
where caching is enabled and you only push "finished" visualizations.

To deploy:

1.  Change `const LOCAL` to `false` in `src/index.js`
1.  Run the appropriate build and push command (see below)
1.  Load your viz in Data Studio

### Key commands:

To update the message:

```bash
npm run update_message
```

Note: The message update script uses the `object` format by default. To update
the message with the `table` format, change the `-f` parameter `update_message`
script in `package.json` from `object` to `table`.

Build the "dev" (devMode is true) visualization

```bash
npm run build:dev
```

Deploy the "dev" (devMode is true) visualization

```bash
npm run push:dev
```

Build the "prod" (devMode is false) visualization

```bash
npm run build:prod
```

Deploy the "prod" (devMode is false) visualization

```bash
npm run push:prod
```

