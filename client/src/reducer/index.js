
const initialState = {
    dogs: [],
    detail: [],
    temperaments: [],
    allDogs: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_DOGS':
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
      case 'FILTER_BY_TEMPERAMENT':
        const allDogs = state.allDogs;
        const temperamentFiltered =
          action.payload === 'All'
            ? allDogs
            : allDogs.filter((el) => el.temperament === action.payload);
        return {
          ...state,
          dogs: temperamentFiltered,
        };
      case 'FILTER_CREATED':
        const createdFilter =
          action.payload === 'Bdd'
            ? state.allDogs.filter((el) => el.createdBd)
            : state.allDogs.filter((el) => !el.createdBd);
        return {
          ...state,
          dogs: createdFilter,
        };
      case 'GET_NAME_DOG':
        return {
          ...state,
          dogs: action.payload,
        };
      case 'GET_TEMPERAMENTS':
        return {
          ...state,
          temperaments: action.payload,
        };
      case 'ORDER_BY_NAME':
        let sortedArr =
          action.payload === 'asc'
            ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: sortedArr,
        };
      case 'GET_DETAILS':
        return {
          ...state,
          detail: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  