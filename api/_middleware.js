module.exports = function (req, res, next) {
  // Ensure JSON requests have body parsed in legacy runtime
  if (req.method === 'POST' && req.headers['content-type'] && req.headers['content-type'].includes('application/json') && typeof req.body === 'undefined') {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { req.body = JSON.parse(data || '{}'); } catch { req.body = {}; }
      next();
    });
  } else {
    next();
  }
};
