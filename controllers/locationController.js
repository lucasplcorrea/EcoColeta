const axios = require('axios');
const { Location } = require('../models');

const createLocation = async (req, res) => {
  const { name, description, number, complement, zip } = req.body;

  try {
    // Consulta ao OpenCep para obter os detalhes do endereço
    console.log(`Consultando CEP: ${zip}`);
    const cepResponse = await axios.get(`https://opencep.com/v1/${zip}`);
    if (cepResponse.data.error) {
      return res.status(400).json({ error: 'Invalid ZIP code' });
    }

    const { logradouro, bairro, localidade, uf } = cepResponse.data;

    // Consulta ao Nominatim para obter a latitude e longitude
    const address = `${logradouro}, ${number}, ${localidade}, ${uf}`;
    console.log(`Endereço enviado para Nominatim: ${address}`);

    const encodedAddress = encodeURIComponent(address);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=jsonv2&limit=1&addressdetails=1`;
    console.log(`URL de consulta ao Nominatim: ${nominatimUrl}`);

    const nominatimResponse = await axios.get(nominatimUrl);

    if (nominatimResponse.data.length === 0) {
      return res.status(400).json({ error: 'Could not retrieve coordinates' });
    }

    const { lat, lon } = nominatimResponse.data[0];
    const linkMaps = `https://maps.google.com/?q=${lat},${lon}`;

    // Criação do local de coleta
    const location = await Location.create({
      name,
      description,
      street: logradouro,
      number,
      complement,
      district: bairro,
      city: localidade,
      state: uf,
      zip,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      linkMaps,
      userId: req.user.id,
    });

    res.status(201).json(location);
  } catch (error) {
    console.error('Erro ao tentar criar localização:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error creating location' });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching locations" });
  }
};

const getLocation = async (req, res) => {
  try {
    const location = await Location.findOne({
      where: { id: req.params.location_id, userId: req.user.id },
    });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: "Error fetching location" });
  }
};

const updateLocation = async (req, res) => {
  const { name, description, number, complement, zip } = req.body;

  try {
    const location = await Location.findOne({
      where: { id: req.params.location_id, userId: req.user.id },
    });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Atualizar os campos
    location.name = name || location.name;
    location.description = description || location.description;
    location.number = number || location.number;
    location.complement = complement || location.complement;
    location.zip = zip || location.zip;

    await location.save();
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: "Error updating location" });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOne({
      where: { id: req.params.location_id, userId: req.user.id },
    });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    await location.destroy();
    res.status(200).json({ message: "Location deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting location" });
  }
};

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
