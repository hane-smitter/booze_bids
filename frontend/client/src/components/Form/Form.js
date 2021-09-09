import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createProduct } from '../../actions/products';
import { unsetErr } from '../../actions/errors';

const Form = () => {
    const initialState = {
        name: '',
        brand: '',
        cost: '',
        productimg: ''
    }
    const [formval, setFormval] = React.useState(initialState);
    const dispatch = useDispatch();
    const err = useSelector((state) => state.app.err);
    const classes = useStyles();

    useEffect(() => {
        return () => {
            dispatch(unsetErr());
        }
    }, []);

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
            
            {err.length > 0 ? (
                <div className={classes.errorBox}>
                    <ul>
                        {err.map((error) => (
                            <li>{error.msg}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

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