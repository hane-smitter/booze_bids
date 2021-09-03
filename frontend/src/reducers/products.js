export default (products = [], action) => {
    // if(action.type === 'CREATE') {
    //     return ...
    // }
    switch (action.type) {
        case 'FETCH ALL':
            return action.payload;
        case 'CREATE':
            return products;
        default:
            return products;
    }
}