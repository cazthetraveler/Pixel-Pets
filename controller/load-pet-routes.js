const router = require("express").Router();
const {User, Pet} = require("../models");

//view pet
router.get("/:id", async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("/login");
        return;
    };

    const userId = req.session.user_id;
    const petId = req.params.id;

    const [userData, petData] = await Promise.all([
        User.findByPk(userId),
        Pet.findByPk(petId),
    ]);

    if (!petData || petData.user_id !== userId) {
        res.status(403).json({message: "Unauthorized access to pet that's not yours! Shame on you."});
        return;
    }; //if user tries to change pet id to another one that doesnt belong to them, error message hahaha!! soo dont even tryyy. well you can try lol but you'll get an error...

    res.render("pet", {logged_in:req.session.logged_in, username:userData.username, pet:petData.get({plain:true})});
});

module.exports = router;