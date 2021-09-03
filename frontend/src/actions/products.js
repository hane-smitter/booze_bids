import * as api from '../api';

//Action creators
export const getProducts = () => async(dispatch) => {
    try {
        //fetch data
        const { data } = await api.fetchBidProducts();

        const action = { type: 'FETCH_ALL', payload: data }

        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }

}