const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  titre: { type: String, required: true },
  entreprise: { type: String, required: true },
  dates: { type: String },
  description: { type: String }
}, { _id: true });

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: [ExperienceSchema],
  skills: [{ type: String }],
  information: {
    bio: { type: String },
    localisation: { type: String },
    site: { type: String }
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
});

module.exports = mongoose.model('Profile', ProfileSchema);
