const express = require('express');
const router = express.Router();

let inventory = [
    { id: 1, name: "Laptop", quantity: 10 },
    { id: 2, name: "Mouse", quantity: 50 }
];


router.get('/', (req, res) => {
    res.json(inventory);
});

router.post('/', (req, res) => {
    const newItem = {
        id: inventory.length + 1,
        name: req.body.name,
        quantity: req.body.quantity
    };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
    const item = inventory.find(i => i.id == req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity;

    res.json(item);
});

router.delete('/:id', (req, res) => {
    inventory = inventory.filter(i => i.id != req.params.id);
    res.json({ message: "Deleted successfully" });
});

module.exports = router;