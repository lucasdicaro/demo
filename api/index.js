const express = require('express');
const morgan = require ('morgan')
const app = express();
const axios = require ('axios').default;
const cors = require('cors') //sistema de seguridad 
const Sequelize = require ('sequelize')

const db = new Sequelize('postgres://postgres:example@localhost:5432/henryblog')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  }
})

 app.use(cors())
 app.use(express.json());
app.use(morgan('dev'))


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
  let remoteUsers;
axios.get('https://jsonplaceholder.typicode.com/users')
.then(response => { 
  remoteUsers = response.data
   return User.findAll()
})
.then(users => {
return res.json([...remoteUsers, ...users])
})
.catch(error => res.status(500).json({error: 'error'}))
})

app.get('/users/:id', async (req, res) => {
try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
    res.json(response.data)
} catch(error) {
        if(error.response?.status === 404) { //me ahorro un if 
          User.findByPk(req.params.id).then(user =>{ //BUSCO POR EL ID
            if(user) return res.json(user)
            return res.sendStatus(404)
          })
    } else {
      res.status(500).json({error: 'error'})
    }
}
    })
    
db.sync({force: true}).then(() =>{
  app.listen(3001, () => {
    console.log('Servidor corriendo en puerto 3001')
  })
  User.create({
    id:99,
    name: 'Lucas Di Caro'
  })
  User.create({
    id:100,
    name: 'Juan Kaunitz'
  })
})
