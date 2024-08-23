const router = require("express").Router();
const {User} = require("../../models");

//login
router.post("/login", async (req, res) => {
    try {

        console.log(req.body);
        const userData = await User.findOne({where: {username: req.body.username}});
        if (!userData) {
            res.status(400).json({message: "Incorrect username or password!"});
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);
        console.log(validPassword);
        if (!validPassword) {
            res.status(400).json({message: "Incorrect username or password!"});
            return;
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({user: userData, message: "You are logged in!"});
        });
        
    } catch (error) {
        res.status(500).json(error);
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

//check username availabilty

router.get('/check-availability', async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.query.username}});
        if (userData) {
            res.status(200).json({available: false});
        } else {
            res.status(200).json({available: true})
        }
    } catch (error) {
        res.status(500).json({message: 'An error occurred.'});
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
