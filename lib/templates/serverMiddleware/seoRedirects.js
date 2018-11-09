module.exports = function (req, res, next) {
  const url = req.url
  if (url.endsWith('/') && url.length > 1) {
    res.writeHead(301, { Location: url.replace(/\/$/, '') })
    res.end()
  } else if (url.endsWith('.html')) {
    res.writeHead(301, { Location: url.replace('.html', '') })
    res.end()
  } else if (url.match(/favicon.ico|logo.png|robots.txt|hot-update.json|zenObservable.js.map|.css.map/g)) {
    res.statusCode = 404
    res.statusMessage = 'Not found for sourcemaps'
    res.end()
  } else {
    if (process.env.NODE_ENV !== 'development' &&
      req.headers && (!req.headers.cookie ||
        (req.headers.cookie && !req.headers.cookie.includes('user_credentials') && !req.headers.cookie.includes('apollo-token')))) {
      // should be cached
      res.setHeader('Cache-Control', 'max-age=0,s-max-age=3600,public')
    } else {
      res.setHeader('Cache-Control', 'max-age=0,s-max-age=0,public,no-cache')
    }
    next()
  }
}
