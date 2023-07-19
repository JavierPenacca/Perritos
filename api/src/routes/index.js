const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const axios = require('axios');

const router = Router();

const getApiDogs = async () => {
    // try {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');

        const apiInfo = await apiUrl.data.map(el => {
            (console.log(el.temperament))
            return {
                id: el.id,
                name: el.name,
                image: el.image.url,
                life_span: el.life_span,
                weightMin: el.height.metric.split("-")[0],
                weightMax: el.height.metric.split("-")[1],
                heightMin: el.weight.metric.split("-")[0],
                heightMax: el.weight.metric.split("-")[1],
                temperament: el.temperament ? el.temperament.split(',').map(el => el.trim()) : [],

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

router.get('/dogs', async (req, res) => {
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
    try {
      const temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
      const temperaments = temperamentsApi.data.reduce((acc, el) => {
        if (el.temperament) {
          const individualTemperaments = el.temperament.split(',').map(temp => temp.trim());
          acc.push(...individualTemperaments);
        }
        return acc;
      }, []);
  
      const temperamentSet = new Set(temperaments);
  
      for (const temperament of temperamentSet) {
        const existingTemperament = await Temperament.findOne({ where: { name: temperament } });
        if (!existingTemperament) {
          await Temperament.create({ name: temperament });
        }
      }
  
      const allTemperaments = await Temperament.findAll();
      res.send(allTemperaments);
    } catch (error) {
      console.error('Error saving temperaments:', error);
      res.status(500).send('Error saving temperaments');
    }
  });
  
  

  router.post('/dogs', async (req, res) => {
    try {
      const {
        name,
        image,
        life_span,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        createdBd,
        temperament,
      } = req.body;
      // Verificar si el perro ya existe en la base de datos local
      const existingDog = await Dog.findOne({ where: { name: name } });
      if (existingDog) {
        return res.status(400).send('El perro ya existe');
      }
  
      // Crear el perro en la base de datos local
      const newDog = await Dog.create({
        name,
        image,
        life_span,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        createdBd,
      });
  
      // Asociar los temperamentos al perro
      const temperaments = await Temperament.findAll({ where: { name: temperament } });
      await newDog.setTemperaments(temperaments);
  
      res.status(201).send('Perro creado con éxito');
    } catch (error) {
      console.error('Error creating dog:', error);
      res.status(500).send('Error creating dog');
    }
  });

  router.get('/dogs/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      const dog = await Dog.findOne({
        where: { id: id },
        include: { model: Temperament, attributes: ['name'], through: { attributes: [] } },
      });
  
      if (!dog) {
        return res.status(404).send(`No se encontró un perro con el ID ${id}`);
      }
  
      res.status(200).json(dog);
    } catch (error) {
      console.error('Error retrieving dog:', error);
      res.status(500).send('Error retrieving dog');
    }
  });
  


module.exports = router;