import {useState} from 'react'
import Edit from './edit'

const DisplayCards = (props) => {

    return (
        <>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <div className="card p-5" style={{minWidth: '350px'}}>
                    <img className="card-img" src={props.location.image} alt="..."/>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.location.location}</h5>
                        <p className='card-text'>{props.location.city}</p>
                        <p className='card-text'>{props.location.rating} Stars</p>
                    </div>
                    
                    <button className="btn btn-primary" data-bs-toggle="collapse" href={`#UpdateForm${props.location._id}`} aria-expanded="false" aria-controls={`${props.location._id}UpdateForm`}>
                        Options
                    </button>
                    <div className='row'>
                        <div className='col'>
                            <div className='collapse' id={`UpdateForm${props.location._id}`}>
                                <Edit location={props.location} setLocation={props.setLocation}/>
                                <button className='btn btn-primary mt-3' data-bs-toggle="collapse" onClick={ (event) => {props.handleDelete(props.location)}}>Delete Location</button> 
                            </div>
                        </div>
                    </div>
                                       
                </div>
            </div>
        </>
    )
}

export default DisplayCards