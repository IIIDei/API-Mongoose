const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Routes CRUD pour les profils
router.get('/', controller.getAllProfiles);
router.get('/:id', controller.getProfileById);
router.post('/', controller.createProfile);
router.put('/:id', controller.updateProfile);
router.delete('/:id', controller.deleteProfile);

// Routes pour l'expérience
router.post('/:id/experience', controller.addExperience);
router.delete('/:id/experience/:exp', controller.deleteExperience);

// Routes pour les compétences
router.post('/:id/skills', controller.addSkill);
router.delete('/:id/skills/:skill', controller.deleteSkill);

// Route pour mettre à jour les informations
router.put('/:id/information', controller.updateInformation);

// Bonus: Routes pour la gestion des amis
router.post('/:id/friends', controller.addFriend); // attend dans le body { friendId }
router.delete('/:id/friends/:friendId', controller.removeFriend);

module.exports = router;
