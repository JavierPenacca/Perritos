import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/dogs');
            return dispatch({
                type: 'GET_DOGS',
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getNameDog(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: 'GET_NAME_DOG',
                payload: response.data[0],
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload,
    };
}

export function orderByWeightMax(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload,
    };
}

export function filterDogsByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload,
    };
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload,
    };
}

export function getTemperaments() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/temperament');
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function postDog(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/dogs', payload);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: response.data[0],
            });
        } catch (error) {
            console.log(error);
        }
    };
}
