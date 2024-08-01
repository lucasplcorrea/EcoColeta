const { Location } = require('../models');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ where: { userId: req.user.id } });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' });
  }
};

const getLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ where: { id: req.params.location_id, userId: req.user.id } });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location' });
  }
};

const createLocation = async (req, res) => {
  const { name, description, locality, coordinates } = req.body;

  try {
    const location = await Location.create({
      name,
      description,
      locality,
      coordinates,
      userId: req.user.id,
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error creating location' });
  }
};

const updateLocation = async (req, res) => {
  const { name, description, locality, coordinates } = req.body;

  try {
    const location = await Location.findOne({ where: { id: req.params.location_id, userId: req.user.id } });
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    location.name = name || location.name;
    location.description = description || location.description;
    location.locality = locality || location.locality;
    location.coordinates = coordinates || location.coordinates;

    await location.save();
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error updating location' });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ where: { id: req.params.location_id, userId: req.user.id } });
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    await location.destroy();
    res.status(200).json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting location' });
  }
};

module.exports = { getLocations, getLocation, createLocation, updateLocation, deleteLocation };
