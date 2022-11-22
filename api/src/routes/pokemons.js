const { Router } = require('express'); // A CHEQUEAR EXPRESS
const router = Router();
const axios = require ('axios'); // instalo e importo axios
const {Pokemon, Tipo } = require ('../db.js');

const extraerDetalle = async (pokeDetail) => {
    const fPokeDetail = {}
    try{
      fPokeDetail.nombre = pokeDetail.name;
      fPokeDetail.id = pokeDetail.id;
      fPokeDetail.peso = pokeDetail.weight;
      fPokeDetail.altura = pokeDetail.height;
      fPokeDetail.tipos = pokeDetail.types.map(t => {return t.type.name})
      const preImg = await axios.get (pokeDetail.forms[0].url)
      fPokeDetail.imagen = preImg.data.sprites.front_default;
      for(let i = 0; i<=pokeDetail.stats.length-1; i++){
        switch(pokeDetail.stats[i].stat.name){
          case 'hp':
            fPokeDetail.vida = pokeDetail.stats[i].base_stat
            break;
          case 'attack':
            fPokeDetail.ataque = pokeDetail.stats[i].base_stat
            break;
          case 'defense':
            fPokeDetail.defensa = pokeDetail.stats[i].base_stat
            break;
          case 'speed':
            fPokeDetail.velocidad = pokeDetail.stats[i].base_stat
            break;
          default:
            break;
        }
      }
    } catch(e) {console.log(`ERROR ERROR ERROR AL EXTRAER DETALLE!! ....... ${e}`)}
    return fPokeDetail;
  }
  
  const getDataApi = async () => {
    try{
      const pokemonsArr = []
      const info1 = await axios.get ('https://pokeapi.co/api/v2/pokemon');
      for(let i=0; i<=info1.data.results.length-1;i++){
        const infoUrl = await axios.get (info1.data.results[i].url);
        const pokeDetail = await extraerDetalle (infoUrl.data)
        const mainPageInfo = {
          nombre: pokeDetail.nombre,
          imagen: pokeDetail.imagen,
          tipos: pokeDetail.tipos,
          id: pokeDetail.id,
          ataque: pokeDetail.ataque
        }
        pokemonsArr.push(mainPageInfo)
      }
      const info2 = await axios.get (info1.data.next);
      for(let j=0; j<=info2.data.results.length-1;j++){
        const infoUrl = await axios.get (info2.data.results[j].url);
        const pokeDetail = await extraerDetalle (infoUrl.data)
        const mainPageInfo = {
          nombre: pokeDetail.nombre,
          imagen: pokeDetail.imagen,
          tipos: pokeDetail.tipos,
          id: pokeDetail.id,
          ataque: pokeDetail.ataque
        }
        pokemonsArr.push(mainPageInfo)
      }
      console.log('POKEINFO DE LA APIIIIII: ', pokemonsArr);
      return pokemonsArr;
    }
    catch (e) { 
    return console.log("ERROR ERROR EN DATA!! .......", e)
    }
  }
  
  const getDataDb = async () => {
    const dbData = await Pokemon.findAll({
      include:[{
        model: Tipo,
        attributes: ['nombre'],
        through: {
          attributes: [],
        }
            }]
    })
    const mainPageInfo = dbData.map(p=>{
      return{
      nombre: p.nombre,
      imagen: p.imagen,
      id: p.id,
      peso: p.peso,
      altura: p.altura,
      vida: p.vida,
      ataque: p.ataque,
      defensa: p.defensa,
      velocidad: p.velocidad,
      createdInDb: p.createdInDb,
      tipos: p.Tipos.map(t=>{return t.nombre})
      }
      })
    return mainPageInfo;
    }
  
  const getPokemons = async () => {
    const dataApi = await getDataApi ();
    const preDataDb = await getDataDb ();
    const dataDb = preDataDb.map(p=>{
      return{
      nombre: p.nombre,
      imagen: p.imagen,
      createdInDb: p.createdInDb,
      id: p.id,
      tipos: p.tipos,
      ataque: p.ataque
      }
      })
    const dataTotal = [...dataApi, ...dataDb];
    return dataTotal;
  }
  
  router.get("/", async (req,res) => {
    try{
    const allPokemons = await getPokemons ();
    if(req.query.name){
      const name = req.query.name.slice(1,req.query.name.length-1)
      console.log(name)
      //que coincida exactamente
      const resQuery = []
      for(let i=0;i<=allPokemons.length-1;i++){
        if (allPokemons[i].nombre.toLowerCase() === name.toLowerCase()){
          resQuery.push(allPokemons[i])
        }
      }
      //const resQuery = allPokemons.filter(p => p.nombre.toLowerCase()==name.toLowerCase());
      if(resQuery.length>=1){
        
        const response = {
          nombre: resQuery[0].nombre,
          imagen: resQuery[0].imagen,
          createdInDb: resQuery[0].createdInDb,
          tipos: resQuery[0].tipos,
          id: resQuery[0].id
        }
        res.status(200).send(response);
      } else res.status(404).send('Pokemon aún no capturado')
    }
    else{
    res.status(200).send(allPokemons);
    }
    } catch(e){res.send(`ERROR EN POKEMONS!!! ..... ${e}`)}
    })
  
  router.get("/:id", async (req,res) =>{
    let {id} = req.params
    try{
      console.log(id)
      if(parseInt(id)<41&&parseInt(id)>0){
        const infoApi = await axios.get (`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(infoApi.data);
        const detailApi = await extraerDetalle (infoApi.data);
        console.log(detailApi);
        if(detailApi){
          console.log("POKEINFO DE LA API");
          res.status(200).json(detailApi);
        }
      }
      else {
      const infoDb = await getDataDb();
      const detailDb = infoDb.filter(p => p.id === id);
      if(detailDb.length){
        console.log("POKEINFO DE LA DATABASE");
        res.status(200).json(detailDb[0]);
      }
      else{
        res.status(404).send("NOT FOUND IN API NOR DATABASE");
      }
      }
    }
    catch(e){
      res.status(404).send(`ERROR MAIN DE POKEMONS/ID!! ... ${e}`)
    }
  })
  
  // ---------------------------------- START POST POKEMONS ------------------------------------
  
  router.post("/", async (req,res)=>{
    try{
      let {nombre,imagen,tipos,vida,ataque,defensa,velocidad,peso,altura} = req.body;
      let pokemonCreate = await Pokemon.create({
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        peso,
        altura
      })
      let tipoDb = await Tipo.findAll({
        where: {nombre:tipos}
      })
      pokemonCreate.addTipo(tipoDb);
      res.send('Personaje creado con exito');
    } catch(e){res.send(`ERROR EN POSTEO DE POKEMONS!!! ........ ${e}`)}
  });

module.exports = router;