import React from 'react';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createProduct } from '../../actions/products';

const Form = () => {
    const initialState = {
        name: '',
        brand: '',
        cost: '',
        productimg: ''
    }
    const [formval, setFormval] = React.useState(initialState);
    const dispatch = useDispatch();

    const classes = useStyles();
    const onChangeFileHandler = event => {
        setFormval({...formval, productimg: event.target.files[0]});
    }
    const handleSubmit = event => {
        event.preventDefault();
        let formData = new FormData();
        for(let key in formval) {
            formData.append(key, formval[key]);
        }
        dispatch(createProduct(formData));
        
    }
    return (
        <>
        <div>
        <form onSubmit={handleSubmit} style={{ marginInline: 'auto', width: 'fit-content' }} encType="multipart/form-data">
            <h3>Product Upload</h3>
            <label>product name</label>
            <input type="text" name="name" value={formval.name} onChange={event => setFormval({...formval, name: event.target.value})}/>
            <br/>
            <label>product brand</label>
            <input type="text" name="brand" value={formval.brand} onChange={event => setFormval({...formval, brand: event.target.value})}/>
            <br/>
            <label>cost</label>
            <input type="number" name="cost" value={formval.cost} onChange={event => setFormval({...formval, cost: event.target.value})}/>
            <br/>
            <label>choose product image</label>
            <input type="file" name="productimg" onChange={onChangeFileHandler}/>
            <br/>

            <button type="submit">upload product</button>
        </form>
        </div>
        </>
    );
}

export default Form;