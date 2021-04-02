import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productsConstants';

export default function ProductListPage(props) {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: createLoading,
        error: createError,
        success: createSuccess,
        product: createdProduct
    } = productCreate;
    const dispatch = useDispatch()

    useEffect(() => {
        if (createSuccess) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        dispatch(listProducts())
    }, [dispatch, props.history, createdProduct, createSuccess]);

    const deleteHandler = () => {
        // prevent
    };
    const createHandler = () => {
        dispatch(createProduct())
    }
    return (
        <div className="bg-color">
            <div className="ow products-header">
                <h1>Product List</h1>
                <div className="button">
                    {/* <!-- Button trigger modal --> */}
                    <button type="button" className="btn btn-dark btn-block checkout-button mt-5 " onClick={createHandler}>
                        Post a Product
                    </button>
                </div>
            </div>
            {createLoading && <LoadingBox></LoadingBox>}
            {createError && <MessageBox variant="danger"> {createError} </MessageBox>}
            {
                loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger"> {error} </MessageBox>
                        :
                        // (
                        <>
                            <table className="table  table-container">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th className="border-left border-light p-4">ID</th>
                                        <th className="border-left border-light p-4">NAME</th>
                                        <th className="border-left border-light p-4">PRICE</th>
                                        <th className="border-left border-light p-4">CATEGORY</th>
                                        <th className="border-left border-light p-4">BRAND</th>
                                        <th className="border-left border-light p-4">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="p-4">{product._id}</td>
                                            <td className="border-left border-light p-4">{product.name}</td>
                                            <td className="border-left border-light font-weight-bold p-4">₦{product.price}</td>
                                            <td className="border-left border-light p-4">{product.category}</td>
                                            <td className="border-left border-light p-4">{product.brand}</td>
                                            <td className="border-left border-light p-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-info small mr-3"
                                                    onClick={() =>
                                                        props.history.push(`/product/${product._id}/edit`)
                                                    }
                                                >
                                                    <i className="fa fa-pencil" aria-hidden="true"> </i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger small"
                                                    onClick={() => deleteHandler(product)}
                                                >
                                                    <i className="fa fa-trash" aria-hidden="true"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                // )
            }
        </div>
    )
}
