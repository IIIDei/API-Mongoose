const Profile = require('./model');

// Récupérer tous les profils avec possibilité de filtres (ex: par localisation ou compétences)
exports.getAllProfiles = async (req, res) => {
  try {
    const filters = {};
    // Exemple : filtre par localisation
    if (req.query.localisation) {
      filters['information.localisation'] = req.query.localisation;
    }
    // Exemple : filtre par compétence
    if (req.query.skill) {
      filters.skills = req.query.skill;
    }
    const profiles = await Profile.find(filters).populate('friends', 'name email');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('friends', 'name email');
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newProfile = new Profile({ name, email });
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json({ message: 'Profil supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    profile.experience.push(req.body); // le body doit contenir { titre, entreprise, dates, description }
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { skill } = req.body; // attend { "skill": "nom de la compétence" }
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    profile.skills.push(skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    profile.skills = profile.skills.filter(s => s !== req.params.skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInformation = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    profile.information = req.body; // attend { bio, localisation, site }
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bonus: Gestion de la liste d'amis
exports.addFriend = async (req, res) => {
  try {
    const { friendId } = req.body; // attend { "friendId": "id de l'ami" }
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    if (!profile.friends.includes(friendId)) {
      profile.friends.push(friendId);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    profile.friends = profile.friends.filter(fid => fid.toString() !== req.params.friendId);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
