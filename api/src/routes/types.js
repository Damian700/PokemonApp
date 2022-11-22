const {express, Router } = require('express'); // A CHEQUEAR EXPRESS
const router = Router();
const axios = require ('axios'); // instalo e importo axios
const {Pokemon, Tipo, Pokemon_Tipo} = require ('../db.js');
const {Op} = require ('sequelize');

const getApiTypes = async () => {
    const info = await axios.get ('https://pokeapi.co/api/v2/type');
    const types = info.data.results.map (t => {return t.name});
    types.forEach(t => {
      Tipo.findOrCreate({where: {nombre:t}})
    })
    return types;
    }
  
  const getDbTypes = async () => {
    const dbTypes = await Tipo.findAll();
    const typeNames = dbTypes.map(t => {return t.nombre});
    return typeNames;
  }
  
  router.get("/", async (req,res)=>{
    const dbTypes = await getDbTypes ()
    if(dbTypes.length>1){
      console.log("Fetching it from the DataBase!")
      res.status(200).send(dbTypes)
    }
    else {
      const apiTypes = await getApiTypes ()
      console.log("Fetching it from the PokeApi and filling the DB!")
      res.status(200).send(apiTypes)
    }
  })

  module.exports = router;