const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  pokeDetail: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_POKEMONS":
          return{
             ...state,
             pokemons: action.payload,
             allPokemons: action.payload,
        };

        case "GET_POKEMONS_QUERY":
          return{
             ...state,
             pokemons: [action.payload]
        };

        case "GET_POKEMONS_DETAIL":
          console.log("SOY REDUCERS GET_POKEMONS_DETAIL" + action.payload)
          return{
             ...state,
             pokeDetail: [action.payload]
        };
        
        case "GET_TYPES":
          return{
             ...state,
             types: action.payload
        };

        case "CREATE_POKEMON":
          return{
             ...state,
        };

        case "RESET_POKEMONS":
          return{
             ...state,
             pokemons: state.allPokemons
        };

        case "FILTER_BY_TYPE":
          let typeFilter = []
          if (action.payload === "all"){
            typeFilter = state.allPokemons;
          } else {
            for(let i=0;i<=state.allPokemons.length-1;i++){
              for(let j=0;j<=state.allPokemons[i].tipos.length-1;j++){
                  if(state.allPokemons[i].tipos[j]===action.payload){
                    typeFilter.push (state.allPokemons[i]);
              }
             }
            }
          }
          return{
            ...state,
            pokemons: typeFilter
          };

        case "FILTER_BY_CREATED":
          let createdFilter = []
          if (action.payload === "all"){
            createdFilter = state.allPokemons
          } 
          else if (action.payload === "cre"){
              createdFilter = state.allPokemons.filter(p =>p.createdInDb)
            }
          else if (action.payload === "exi"){
              createdFilter = state.allPokemons.filter(p =>!p.createdInDb)
            }
          return{
            ...state,
            pokemons: createdFilter
          };

          case "ORDER_BY_NAME":
          let nameResult = state.pokemons.map(p => {return p})
          if (action.payload === "ase"){
            nameResult.sort((a, b)=>{
              if (a.nombre > b.nombre){
                return 1;
              }
              if (a.nombre < b.nombre){
                return -1;
              }
              return 0
                }
              )}
          else if (action.payload === "des"){
            nameResult.sort((a, b)=>{
              if(a.nombre < b.nombre){
                return 1;
              }
              if(a.nombre > b.nombre){
                return -1;
              }
              return 0
                }
              )}
          return{
            ...state,
            pokemons: nameResult
          };

          case "ORDER_BY_ATACK":
            let atackResult = state.pokemons.map(p => {return p})
            if (action.payload === "ase"){
              atackResult.sort((a, b)=>{
                if(a.ataque > b.ataque){
                  return 1;
                }
                if(a.ataque < b.ataque){
                  return -1;
                }
                return 0
                  }
                )}
            else if (action.payload === "des"){
              atackResult.sort((a, b)=>{
                if(a.ataque < b.ataque){
                  return 1;
                }
                if(a.ataque > b.ataque){
                  return -1;
                }
                return 0
                  }
                )}
            return{
              ...state,
              pokemons: atackResult
            };
        default: return state;
    }
};

export default rootReducer;