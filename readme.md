# rcomp CLI

A CLI for generating React Components.

## Commands

- `rconf create component` or `rconf c component` will generate a component in the **components** folder of `src` by default
- `rconf create page` or `rconf c page` will generate a page / route in the **pages** folder of `src` by default

Currently this plugin supports 2 options:
1. Creating a function or class Component
2. Creating a scss or styled-component file

### Configuration options

- You can specify the following configuration in your `package.json` to customize the components and pages directories
```json
"rcomp": {
  "componentsDirectory": "customComponents",
  "pagesDirectory": "customPages"
}
```

Here the directory you specify will be the directories the components and pages will be generated in.

**Note**: The base directory will be `src` though.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

# License

MIT - see LICENSE

### Enhancements

- [ ] Write robust tests!
- [x] Read components and pages folder from project config (currently statically set to `components` and `pages`)
- [ ] Add support for .ts/.tsx
