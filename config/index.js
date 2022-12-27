module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb://localhost/node-react-user-discussion-forum",
  JWT_SECRET: process.env.JWT_SECRET || "thisisjstsecret",
};
