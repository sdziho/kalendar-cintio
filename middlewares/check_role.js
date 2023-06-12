const adminRole = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden",
      success: false,
    });
  }
};

module.exports = {
  adminRole,
};
