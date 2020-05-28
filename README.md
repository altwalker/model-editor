# ModelEditor

A web based editor for AltWalker and GraphWalker models.

https://altom.gitlab.io/altwalker/model-editor

![Screenshot](/public/assets/screenshots/screenshot.png)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://gitlab.com/altom/altwalker/model-editor.git`
* `cd model-editor`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

Make sure to use the new ember octaine components:

```bash
# -gc stands for glimmer component
$ ember generate component my-component -gc
```

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Check the [.gitlab-ci.yml](.gitlab-ci.yml) file.

## Support

Join our Gitter chat room [here](https://gitter.im/altwalker/community) to chat with us or with other members of the community.

## License

Model-Editor is licensed under the GNU General Public License v3.0.

## Further Reading/Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
