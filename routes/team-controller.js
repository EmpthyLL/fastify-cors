function teamManager(app, opts, done){
    app.get('/',{},(req,res) => {
        res.send({
            message:'HI!'
        })
    })
    done()
}

module.exports = {teamManager}