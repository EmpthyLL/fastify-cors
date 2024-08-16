function teamManager(app, opts, done) {
  app.get("/", {}, async (req, res) => {
    try {
      const [members] = await app.mysql.execute("SELECT * FROM members");
      res.send(members);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });

  app.post("/", {}, async (req, res) => {
    const { username, email, role, roleid, bgColor, status, statusid } =
      req.body;

    try {
      // Check if the email already exists
      const [existingMembers] = await app.mysql.execute(
        "SELECT * FROM members WHERE email = ?",
        [email]
      );
      if (existingMembers.length > 0) {
        return res.status(400).send({
          message: "Email already exists. Please use a different email.",
        });
      }

      // Insert new member if the email is unique
      await app.mysql.execute(
        "INSERT INTO members (username, email, role, roleid, bgColor, status, statusid) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, email, role, roleid, bgColor, status, statusid]
      );

      const [members] = await app.mysql.execute("SELECT * FROM members");
      res.send(members);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });

  done();
}

module.exports = { teamManager };
