const router = require("express").Router();
const {User, Pet} = require("../models");

router.get("/", async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect("/dashboard");
            return;
        };
        
        res.render("homepage");
    } catch (error) {
        res.status(500).json(error);
    };
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    };

    res.render("login");
});

router.get("/dashboard", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect("/login");
            return;
        };

        const userId = req.session.user_id;

        const [userData, petData] = await Promise.all([
            User.findByPk(userId),
            Pet.findAll({
                where: {
                    user_id: userId,
                },
            }),
        ]);

        const pets = petData.map((pet) => pet.get({ plain: true }));
        res.render("dashboard", {logged_in:req.session.logged_in, username:userData.username, pets: pets});
    } catch (error) {
        res.status(500).json(error);
    };
});

module.exports = router;