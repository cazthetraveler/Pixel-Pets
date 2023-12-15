const router = require("express").Router();
const {User} = require("../../models");

//login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.username}});
        if (!userData) {
            res.status(400).json({message: "Incorrect username or password!"});
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: "Incorrect username or password!"})
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({user: userData, message: "You are logged in!"});
        });
        console.log(req.session.logged_in);
    } catch (error) {
        res.status(400).json(error);
        return;
    };
});

//logout
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

//register
router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json(dbUserData);
        });
    } catch (error) {
        res.status(500).json(error);
    };
});

module.exports = router;