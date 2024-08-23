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
        res.render("dashboard", {logged_in:req.session.logged_in, username:userData.username, petCount:userData.petCount, pets: pets});
    } catch (error) {
        res.status(500).json(error);
    };
});

router.get('/explore', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect("/login");
            return;
        };

        const userId = req.session.user_id;

        const [usersData, userData] = await Promise.all([User.findAll(), User.findByPk(userId)]);

        const users = usersData.map((user) => user.get({plain: true}))

        res.render('explore', {logged_in: req.session.logged_in, users: users, username: userData.username});

    } catch (error) {
        res.status(500).json(error);
    };
});

router.get("/user/:id", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect("/login");
            return;
        };

        const actualUserId = req.session.user_id;
        const userId = req.params.id;

        const [userData, actualUserData, petData] = await Promise.all([
            User.findByPk(userId),
            User.findByPk(actualUserId),
            Pet.findAll({
                where: {
                    user_id: userId,
                },
            }),
        ]);

        if (!userData) {
            res.status(404).json({message: 'The user does not exist!'});
            return;
        };

        console.log(userData);

        const pets = petData.map((pet) => pet.get({ plain: true }));

        res.render("user", {logged_in: req.session.logged_in, username: actualUserData.username, user: userData.username, petCount:userData.petCount, pets: pets});
    } catch (error) {
        res.status(500).json(error);
    };
});

router.get("/store", async (req, res) => {
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
        res.render("store", {logged_in:req.session.logged_in, username:userData.username, petCount:userData.petCount, pets: pets});
    } catch (error) {
        res.status(500).json(error);
    };
});

module.exports = router;
