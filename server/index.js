const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/rescue', (req, res) => {
    const location = req.body;
    console.log('Received location:', location);

    const shelters = [
        {name: 'Shelter A', distance: 2.1, contact: '7456383394', lat: 28.670, lon: 77.452},
        {name: 'Shelter B', distance: 3.2, contact: '6572843975', lat: 28.671, lon: 77.455}
    ];

    res.json(shelters);
})

app.listen(5000, () => console.log('Server running on port 5000'));