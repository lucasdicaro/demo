const express = require('express');
const morgan = require ('morgan')
const app = express();
const axios = require ('axios').default;

 
app.use(morgan('dev'))

// app.use(express.json());

const users = [
    {
        "id": 99,
        "name": "Lucas Di Caro",
        "username": "Lucas",
        "email": "lucas@lucas.com",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
]

app.get('/users', (req, res) => {
axios.get('https://jsonplaceholder.typicode.com/users')
.then(response => { 
    res.json([...response.data, ...users])
})
.catch(error => res.status(500).json({error: 'error'}))
})

app.get('/users/:id', async (req, res) => {
try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
    res.json(response.data)
} catch(error) {
        if(error.response?.status === 404) { //me ahorro un if 
        const user = users.find(user => user.id == parseInt(req.params.id)) //parse int lo busca como nro // o uso == y listo lo parsea solo
        if(user) return res.json(user)
        return res.sendStatus(404)
    }
    res.status(500).json({error: 'error'})
}
    })
    

app.listen(3001, () => {console.log('Servidor corriendo en puerto 3001')})
