const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const axios = require('axios');

const router = Router();

const getApiDogs = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');

            const apiInfo = await apiUrl.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                image: el.image,
                life_span: el.life_span,
                weightMin: el.height.metric.split("-")[0],
                weightMax: el.height.metric.split("-")[1],
                heightMin: el.weight.metric.split("-")[0],
                heightMax: el.weight.metric.split("-")[1],
                temperament: el.temperament.map(el => el),
            };
        });
        return apiInfo;
    }

const getDbDogs = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiDogs();
    const dbInfo = await getDbDogs();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/dog', async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('No existe ese perro');
    } else {
        res.status(200).send(dogsTotal)
    }
})

router.get('/temperament', async (req, res) => {
    const temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    const temperaments = temperamentsApi.data.map(el => el.temperament)
    const tempEach = temperaments.map(el => {
        for (let i = 0; i < el.length; i++) return el[i]
    })
    // console.log(tempEach)
    tempEach.forEach(el => {
        Temperament.findOrCreate({
            where: { name: el }
        })
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})

router.post('/dog', async (req, res) => {
    let {
        id,
        name,
        image,
        life_span,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        createdBd,
        temperament,
    } = req.body

    let dogCreated = await Dog.create({
        id,
        name,
        image,
        life_span,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        createdBd,
    })

    let temperamentDb = await Temperament.findAll({
        where: { name: temperament }
    })
    dogCreated.addTemperament(temperamentDb)
    res.send('Perro creado con éxito')
})

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    const dogsTotal = await getAllDogs()
    if (id) {
        let dogId = await dogsTotal.filter(el => el.id == id)
        dogId.length ?
            res.status(200).json(dogId) :
            res.status(404).send(`No se encontró ese perro con ${id}`)
    }
})
