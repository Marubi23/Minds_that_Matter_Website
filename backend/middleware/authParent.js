// backend/middleware/authParent.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if the token contains a user with role 'parent'
    if (decoded.user?.role !== 'parent') {
      return res.status(403).json({ message: 'Access denied: Parents only' });
    }

    // ✅ Attach parent info to the request
    req.parent = decoded.user; // Now you can use req.parent._id
    next();
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
