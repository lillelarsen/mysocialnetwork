module.exports = async function(app) {
  try {
    app.listen(PORT);
    console.info(`Your app is running on http://${DOMAIN}:${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
