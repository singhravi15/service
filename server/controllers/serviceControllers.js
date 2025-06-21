const Service = require('../models/Servicemodels.js');
const createService = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newService = new Service({ name, description, price });
        await newService.save();
        res.status(201).json({ message: 'Service created successfully', service: newService });
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
};
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};
module.exports = {
    createService,
    getAllServices
};