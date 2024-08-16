function teamManager(app, opts, done){
    app.get('/', {}, async (req, res) => {
        const key = req.params.id
        try {
            const [members] = await app.mysql.execute("SELECT * FROM members")
            res.send(members)
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })    
    app.post('/', {}, async (req, res) => {
        const {username,email,role,roleid,bgColor,status,statusid} = req.body
        try {
            await app.mysql.execute('INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?)', [username,email,role,roleid,bgColor,status,statusid]);
            const [members] = await app.mysql.execute("SELECT * FROM members");
            res.send(members);
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })
    done()
}

module.exports = {teamManager}