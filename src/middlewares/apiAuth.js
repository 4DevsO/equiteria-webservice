export default () => async (req, res, next) => {
  const authHeader = req.headers.apikey;

  if (!authHeader) {
    return res.status(403).send({ error: 'No API Key provided' });
  }

  if (authHeader !== process.env.API_KEY) {
    return res
      .status(403)
      .send({ error: 'Check if your API Key is correctly typed' });
  }

  return next();
};
