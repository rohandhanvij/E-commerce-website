import Address from '../models/Address.js';

export const saveAddress = async (req, res) => {
try {
const address = await Address.create(req.body);
res.status(201).json({ message: 'Address saved successfully', address });
} catch (error) {
res.status(500).json({ message: 'Error saving address' });
}
};

export const getAddresses = async (req, res) => {
try {
const addresses = await Address.find({ user: req.params.userId });
res.status(200).json(addresses);
} catch (error) {
res.status(500).json({ message: 'Error fetching addresses' });
}
};