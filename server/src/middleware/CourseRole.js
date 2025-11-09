export const verifyTeacher = (req, res, next) => {
  // If no authenticated user, return 401 Unauthorized
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  // If authenticated but not a teacher, return 403 Forbidden
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ success: false, message: 'Access denied. Teachers only!' });
  }

  console.log('verifyTeacher req.user =', req.user);

  next();
};
