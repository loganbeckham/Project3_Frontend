import React from 'react'
import { RepeatWrapping } from 'three'

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
                </div>
            </div>
        </>
    )
}

export default DisplayCards