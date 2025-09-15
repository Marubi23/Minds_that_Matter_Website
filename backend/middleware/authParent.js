const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // ✅ Remove "Bearer " from the token string
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.user?.role !== 'parent') {
      return res.status(403).json({ message: 'Access denied: Parents only' });
    }

    req.parent = decoded.user;
    next();
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
