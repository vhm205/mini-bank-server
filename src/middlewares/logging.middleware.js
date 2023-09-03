const LoggingMiddleware = (req, res, next) => {
  const { method, originalUrl } = req;

  console.log({ method, originalUrl, time: new Date() });

  res.on('finish', () => {
    console.log(`${method} ${originalUrl} ${new Date()} finished`);
  })

  next();
}

module.exports = LoggingMiddleware;
