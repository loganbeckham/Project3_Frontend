import {useState} from 'react'
import Edit from './edit'

const DisplayCards = (props) => {

    return (
        <>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <div className="card p-5" style={{minWidth: '350px'}}>
                    <img className="card-img" src={props.location.image} alt="..." onClick={(event) => {props.cardDisplay(props.location)}}/>
                    <div className='card-body' onClick={(event) => {props.cardDisplay(props.location)}}>
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