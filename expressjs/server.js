const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use(express.json());
app.use(logger);

app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
    res.send("Express API is running ");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});