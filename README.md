<p align="center"><img src="https://remotearchitects.club/_nuxt/d2004f6d12c9c8aa37d0247cd452318c.svg"/></p>
<br/><br/>
<p align="center">Codebase of the website [remotearchitects.club](https://remotearchitects.club), a platform for architecture professionals to share their experiences working remotely.</p>
<br/><br/>
<p align="center">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fremotearchitects.club"/> 
  <img src="https://img.shields.io/netlify/f68af0c0-ac42-4fd6-baa9-35cf187b02e8"/> 
  <img src="https://img.shields.io/github/last-commit/danrocha/remote-architects-club"/> 
  <img src="https://img.shields.io/github/languages/count/danrocha/remote-architects-club"/> 
  <img src="https://img.shields.io/github/languages/top/danrocha/remote-architects-club"/> 
</p>

## Built With

* [Nuxt.js](https://nuxtjs.org) - Vue.js framework
* [Tailwind CSS](https://tailwindcss.com/) - CSS framework
* [XState](https://xstate.js.org/) - state management
* [Apollo GraphQL](https://www.apollographql.com/) - pulling from a [Hasura](https://hasura.io/) GraphQL API
* [Jest](https://jestjs.io/) - unit testing
* [Cypress.io](https://www.cypress.io/) - integration tests
* [Travis CI](https://travis-ci.org/) - CI/CD

## Hosted on

* [Netlify](https://www.netlify.com/) - front end, static hosting (this repo)
* [Heroku](https://www.heroku.com/) (with Postgres addon) - Hasura back end

## Other integrations

* [Metabase](https://metabase.com) - database intelligence
* [Forest Admin](https://www.forestadmin.com/) - administration dashboard
* [Mailchimp](https://mailchimp.com) - mailing list, fed by a Netlify Function

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# run unit tests
$ yarn test

# run integration tests
$ yarn cy:run
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Git branching system

I follow the "[3-flow](https://www.nomachetejuggling.com/2017/04/09/a-different-branching-strategy/)" branching system:

* There are three branches in origin: `master`, `candidate`, `release`
* Normal development happens on `master`. All new commits are rebased.
* Features that are incomplete are put behind feature toggles, ideally dynamic toggles that can be changed without a redeploy
* To cut a release, `master` is merged into `candidate` with a `--no-ff` merge commit
* Any bugs found during a `candidate`’s QA phase are fixed in `candidate` and then merged into `master` with a `--no-ff` merge commit
* When a candidate is released to production, it’s `push --force`d to the tip of `release`
* Any production hotfixes happen in `release` and are then merged into `candidate` which is then merged into `master`.

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Author

* **Daniel da Rocha** - *Creator and Full-stack Developer* - [danrocha](https://github.com/danrocha)

## License

This project is licensed under the MIT License.




