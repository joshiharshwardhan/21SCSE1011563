const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const thirdPartyApiUrl = 'http://20.244.56.144/test/'; // Replace with the actual API URL

app.get('/numbers/:numberId', (req, res) => {
    const numberId = req.params.numberId;
    let apiEndpoint;

    switch (numberId) {
        case 'p':
            apiEndpoint = 'primes';
            break;
        case 'f':
            apiEndpoint = 'fibo';
            break;
        case 'e':
            apiEndpoint = 'even';
            break;
        case 'r':
            apiEndpoint = 'rand';
            break;
        default:
            res.status(400).json({ error: 'Invalid number ID' });
            return;
    }

    axios.get(thirdPartyApiUrl + apiEndpoint)
      .then(response => {
            const numbers = response.data.numbers;
            res.json({ numbers });
        })
      .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error fetching numbers' });
        });
});

app.listen(9876, () => {
    console.log('Server listening on port 9876');
});
