const express = require('express');
const bodyParser = require('body-parser');

const LOCAL_PORT = process.env.PORT || 8080;
const PROXY_HOST = process.env.PROXY_HOST;
const PROXY_PORT = process.env.PROXY_PORT || 8080;
const INTERCEPT = process.argv.indexOf('--intercept') !== -1;

const app = express();
// require('express-ws')(app);

app.use(bodyParser.json({
  limit: '50mb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('etag', false);
app.set('port', (LOCAL_PORT));

const plugins = [];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

function plugIn(app, plugins) {
  plugins.forEach((pluginPath) => {
    try {
      const plugin = require(pluginPath);
      if (plugin && typeof plugin === 'function') {
        plugin(app);
      }
    } catch (e) {
      console.error(e);
    }
  })
}

if (PROXY_HOST && PROXY_PORT) {
  const target = `http://${PROXY_HOST}:${PROXY_PORT}`;
  const config = {
    proxyReqPathResolver: (req) => {
      console.log('Proxied: ' + target + require('url').parse(
          req.originalUrl).path + ` ${req.method}`);
      return target + require('url').parse(req.originalUrl).path;
    },
  };
  app.use('/api/*', proxy(target, config));
  console.log(`Proxied to ${PROXY_HOST}:${PROXY_PORT}`);
} else {
  plugIn(app, plugins);
}

if (INTERCEPT) {
  console.log('Intercept mode ON');
  plugIn(app, plugins);
}

app.listen(LOCAL_PORT, () => {
  console.log(`Listening on ${app.get('port')}`);
});