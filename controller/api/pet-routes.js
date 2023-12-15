const router = require("express").Router();
const {User, Pet} = require("../../models");

//create pet
router.post("/", async (req, res) => {
    try {
        const dbPetData = await Pet.create({
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            user_id: req.session.user_id,
        });

        res.status(200).json(dbPetData);
        console.log(dbPetData);
    } catch (error) {
        res.status(500).json(error);
    };
});

//delete pet

// // //feed pet

// router.post("/:id", async (req, res) => {
//     try {
//         const petId = req.params.id;
//         const {hunger_level} = req.body;

//         const updatePetHunger = await Pet.update(
//             {hunger_level},
//             {where: {
//                 id: petId,
//             }},
//         );

//         if (updatePetHunger[0] === 1) {
//             res.status(200).json({message: "hunger updated!!"});
//         }

//         console.log(updatePetHunger);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: "oop"});
//     };
// });

// //nap pet
// router.post("/:id", async (req, res) => {
//     try {
//         const petId = req.params.id;
//         const {hunger_level, energy_level} = req.body;

//         const updatePetEnergy = await Pet.update(
//             {hunger_level, energy_level},
//             {where: {
//                 id: petId,
//             }},
//         );

//         if (updatePetEnergy) {
//             res.status(200).json({message: "energy updated!!"});
//         };

//         console.log(updatePetEnergy);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: "oop"});
//     };
// });

// //play pet
// router.post("/:id", async (req, res) => {
//     try {
//         const petId = req.params.id;
//         const {hunger_level, energy_level, friendship_level} = req.body;

//         const updatePet = await Pet.update(
//             {hunger_level, energy_level, friendship_level},
//             {where: {
//                 id: petId,
//             }},
//         );

//         if (updatePet[0] > 0) {
//             res.status(200).json({message: "hunger, energy, friendship updated!!"});
//         } else {
//             res.status(404).json({message: "Pet not found :("});
//         };
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: "oop"});
//     };
// });

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