const router = require("express").Router();
const {User, Pet} = require("../../models");

//create pet
router.post("/", async (req, res) => {
    try { 
        //limit the number of pets a user can have
        const userId = req.session.user_id;
        const user = await User.findByPk(userId);
        if (user.petCount >= 3) {
            return res.status(403).json({message: "You have reached the maximum number of pets."});
        };

        const dbPetData = await Pet.create({
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            user_id: req.session.user_id,
        });

        //add one to pets.
        user.petCount += 1;
        await user.save();

        console.log(user.username + " currently has " + user.petCount + " pets");

        res.status(200).json(dbPetData);
        console.log(dbPetData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
});

//delete pet

router.delete("/", async (req, res) => {
    const userId = req.session.user_id;
    const user = await User.findByPk(userId);

    const petId = req.body.id;
    console.log(petId);
    try {
        const pet = await Pet.findByPk(petId);
        if (!pet) {
            return res.status(404).json({message: "Pet not found!"});
        };

        user.petCount -= 1;
        await user.save();

        await pet.destroy();
        res.status(200).json({message: "Pet deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Failed to delete pet!"});
    };
});

router.post("/:id", async (req, res) => {
    try {
        const petId = req.params.id;
        const { action, hunger_level, energy_level, friendship_level } = req.body;

        console.log(action);

        let updatePet;

        switch (action) {
            case "feed":
                updatePet = await Pet.update(
                    { hunger_level },
                    { where: { id: petId } }
                );
                break;
            case "nap":
                updatePet = await Pet.update(
                    { hunger_level, energy_level },
                    { where: { id: petId } }
                );
                break;
            case "play":
                updatePet = await Pet.update(
                    { hunger_level, energy_level, friendship_level },
                    { where: { id: petId } }
                );
                break;
            default:
                return res.status(400).json({ message: "Invalid action specified." });
        }

        if (updatePet[0] > 0) {
            res.status(200).json({ message: "Pet updated successfully." });
        } else {
            res.status(404).json({ message: "Pet not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Oops! Something went wrong." });
    }
});


module.exports = router;