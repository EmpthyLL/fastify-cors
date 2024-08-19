function teamManager(app, opts, done) {
  app.get("/", {}, async (req, res) => {
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
  app.get("/:id", {}, async (req, res) => {
    const key = req.params.id;
    try {
      const [members] = await app.mysql.execute(
        "SELECT * FROM members WHERE id = ?",
        [key]
      );
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
        const [members] = await app.mysql.execute("SELECT * FROM members");
        res.send({
          message: "MEmail already exists",
          members,
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
  app.delete("/:id", {}, async (req, res) => {
    const key = req.params.id;
    try {
      await app.mysql.execute("DELETE FROM members WHERE id = ?", [key]);
      const [members] = await app.mysql.execute("SELECT * FROM members");
      res.send({
        message: "Member has been deleted",
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
  app.put("/:id", {}, async (req, res) => {
    const key = req.params.id;
    const change = req.body;
    try {
      const field = Object.entries(change)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(", ");
      await app.mysql.execute(`UPDATE members SET ${field} WHERE id = ?`, [
        key,
      ]);
      const [members] = await app.mysql.execute("SELECT * FROM members");
      res.send({
        message: "Member has been updated",
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
