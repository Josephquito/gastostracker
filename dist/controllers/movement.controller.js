import * as movementService from "../services/movement.service.js";
export const getAll = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const movements = await movementService.getMovements(userId);
        res.json(movements);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
