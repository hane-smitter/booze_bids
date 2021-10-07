import Mpesa from '../../models/Mpesa.js';

export const callback = (req, res) => {
    try {
        res.status(200).json('success');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}