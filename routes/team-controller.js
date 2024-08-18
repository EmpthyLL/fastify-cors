function teamManager(app, opts, done) {
  app.get("/", {}, async (req, res) => {
    const key = req.params.id;
    try {
      const [members] = await app.mysql.execute("SELECT * FROM members");
      res.send(members);
    } catch (error) {
      if (error) {
        res.status(400).send({
          message: error.message,
        });
      }
    }
  });
  app.post("/", {}, async (req, res) => {
    const { username, email, role, roleid, bgColor, status, statusid } =
      req.body;
    try {
      const [existingMembers] = await app.mysql.execute(
        "SELECT * FROM members WHERE email = ?",
        [email]
      );

      if (existingMembers.length > 0) {
        return res.status(400).send({
          message: "Email already exists",
        });
      }
      await app.mysql.execute(
        "INSERT INTO members (username, email, role, roleid, bgColor, status, statusid) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, email, role, roleid, bgColor, status, statusid]
      );
      const [members] = await app.mysql.execute("SELECT * FROM members");
      res.send({
        message: "Member has been added",
        members,
      });
    } catch (error) {
      if (error) {
        res.status(400).send({
          message: error.message,
        });
      }
    }
  });
  done();
}

module.exports = { teamManager };
