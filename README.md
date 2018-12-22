# Awesome Polls

Awesome Polls is a sample Node.js app that implements Auth0 authentication. Read the full tutorial [here]().

## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` with your Auth0 credentials. If you don't yet have an Auth0 account, [sign up](https://auth0.com/signuo) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

Run the app.

```bash
node app
```

The app will be served at `localhost:3000`.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

## Known Warnings with 10.X 

$ npm install
npm WARN deprecated jade@1.11.0: Jade has been renamed to pug, please install the latest version of pug instead of jade
npm WARN deprecated constantinople@3.0.2: Please update to at least constantinople 3.1.1
npm WARN deprecated transformers@2.1.0: Deprecated, use jstransformer
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN awesome-polls@1.0.0 No repository field.
npm WARN awesome-polls@1.0.0 No license field.

added 184 packages from 206 contributors and audited 301 packages in 6.854s
found 6 vulnerabilities (5 low, 1 moderate)
  run `npm audit fix` to fix them, or `npm audit` for details

## INFO this comes from

https://auth0.com/blog/building-and-authenticating-nodejs-apps/

https://community.auth0.com/t/cors-error-despite-correct-settings-in-newly-created-tenant/9151/19

Anny
Auth0 Employee
Feb 5
As explained here https://auth0.com/docs/migrations#summary-of-endpoint-migrations 117

We’re continually improving the security of our service. As part of this, we are deprecating a set of APIs (/usernamepassword/login, /ssodata, tokeninfo, /delegation) used by Lock.js v8, v9, and v10 and and auth0.js, v6, v7, and v8. You should update your applications by April 1, 2018.

Currently, new tenants don’t have the ability to use older versions of Lock in embedded form and they also don’t have access to old legacy grant flows. This is one of the possible causes of the CORS error that you’re noticing.

As explained in the migration document 117, it’s recommended that you move towards a centralized login experience 26 by using our Hosted Login Page 28. You can find migration guides to move from Embedded login to Centralized login in this document 39.

If you decide you need to continue using embedded login, here are the migration guides for Auth0.js 9 35 and Lock 11 55.

Please take into consideration that the Hosted Login Page is currently the only way to implement Passwordless authentication on native platforms, as explained here 14