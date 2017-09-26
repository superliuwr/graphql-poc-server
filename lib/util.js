module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',

  slug: str => {
    return str.toLowerCase().replace(/[\s\W-]+/, '-');
  }
};
