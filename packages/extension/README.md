# @dxos/extension

> DXOS devtools extension.

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

## Install

1. Clone this repo then install dependencies and build:

```
yarn && yarn build
```

2. Open the __extensions__ manager in your browser: 

- [brave://extensions](brave://extensions)
- [chrome://extensions](chrome://extensions)
- Firefox (Not Supported Yet)
- Edge (Not Supported Yet)
- Safari (Not Supported Yet)

3. Make sure you have the `developer` toggle __on__ and click on `Load Unpacked Extension` button.
4. Search for the extension __dist__ folder (`<repo-root>/packages/extension/dist`) and select it.

## Design

The content script attempts to detect the an object exposed by the SDK's client (window.__DXOS__).
It then sets-up a bridge that enables the devtools (and other components) to access the client via `crx-bridge` module.

## References

- Anatomy of an extension: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_pages
- This package is loosely based on the [Apollo DevTools](https://github.com/apollographql/apollo-client-devtools).

## Development

Run the `yarn build:watch` for both `extension` and `devtools` and open the devtools in your browser.

## Contributing

PRs accepted.

## License

GPL-3.0 © DXOS.org
