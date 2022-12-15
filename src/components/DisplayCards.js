import {useState} from 'react'
import Edit from './edit'

const DisplayCards = (props) => {

    return (
        <>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 display-card-container">
                <div className="card px-5 pt-5 h-100" style={{minWidth: '350px'}}>
                    <img className="card-img" src={props.filteredResults.image} alt="..." onClick={(event) => {props.cardDisplay(props.filteredResults)}}/>
                    <div className='card-body' onClick={(event) => {props.cardDisplay(props.filteredResults)}}>
                        <h5 className='card-title'>{props.filteredResults.location}</h5>
                        <p className='card-text'>{props.filteredResults.city}</p>
                        <p className='card-text'>{props.filteredResults.rating} Stars</p>
                    </div>                                       
                </div>
            </div>
        </>
    )
}

export default DisplayCards