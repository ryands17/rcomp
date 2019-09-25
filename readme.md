# rcomp CLI

A CLI for generating React Components.

## Commands

- `rconf create component` or `rconf c component` will generate a component in the **components** folder of `src` by default
- `rconf create page` or `rconf c page` will generate a page / route in the **pages** folder of `src` by default

Currently this plugin supports 2 options:
1. Creating a function or class Component
2. Creating a scss or styled-component file

### Configuration options

- You can specify the following configuration in your `package.json`. Default values for all are shown below

```json
"rcomp": {
  "componentsDirectory": "components",
  "pagesDirectory": "pages",
  "createStories": false,
  "outputExtension": "js"
}
```

- `componentsDirectory`: The custom folder for components
- `pagesDirectory`: The custom folder for pages
- `createStories`: If you want to generate stories for your component (if using Storybook)
- `outputExtension`: The generated extension for your project (.js or .ts)

**Note**: The base directory will be `src` though.

# License

MIT - see LICENSE

### Enhancements

- [ ] Write robust tests!
- [x] ~~Read components and pages folder from project config (currently statically set to `components` and `pages`)~~
- [x] ~~Add support for .ts/.tsx~~

### Changelog

**Version 1.0.4**
- Fix an issue where the users' custom config was not imported

**Version 1.0.3**
- Add support for generating stories for components (if using Storybook)

**Version 1.0.2**
- Add support for the .ts/.tsx extension
