const token = require("../middlware/token");

module.exports = (fastify, opts, next) => {
  fastify.post("/login", async (req, res) => {
    const user = fastify.db
      .get("users")
      .find({ email: req.body.email })
      .value();

    if (user === undefined) {
      res.status(404).send({ msg: "User doesn't exist" });
    } else if (
      user.email === req.body.email &&
      user.password === req.body.password
    ) {
      const generatedToken = token.generateToken(user.email, user.password)
      res.status(200).send({
        msg: "Authentication successfull",
        token: `${generatedToken}`
      });
    } else if (
      user.email !== req.body.email ||
      user.password !== req.body.password
    ) {
      res.status(400).send({ mgs: "Incorrect e-mail or password" });
    }
  });

  next();
};
