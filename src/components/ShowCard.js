import {useState} from "react";
import Edit from './edit'


const ShowCard = (props) => {

    return (
        <>
        <div>
            <div className='location-header'>
                <h1 className='ms-5 mt-4'>{props.showLocation.location}</h1>
                <div className='location-subheading'>
                    <div>
                        <p className='ms-5'>{props.showLocation.city} • {props.showLocation.rating} Stars</p>
                    </div>
                    <div>
                        <p className='me-5'>Share • Save</p>
                    </div>
                </div>
            </div>
            <div className='location-body'>
                <div className='card' style={{width: '30vw'}}>
                    <div className='card-body m-5'>
                        <h5>Shared by ASDF</h5>
                        <p className='card-text'>{props.showLocation.description}</p>
                        
                    </div>
                    <p className='m-5'>{props.showLocation.tags}</p>        
                </div>
                <div className='location-image-container' >
                    <img className='location-image mt-3' style={{minHeight: '50vh'}} src={props.showLocation.image}/>
                </div>
            </div>
        </div>
        <div className="button-container">
            <div className="button-box">
                <button className="btn" data-bs-toggle="collapse" href={`#UpdateForm${props.showLocation._id}`} aria-expanded="false" aria-controls={`UpdateForm${props.showLocation._id}`}>
                                Edit
                </button>
                <button className='btn ms-5' onClick={props.cardDisplay}>Back To Browse</button>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <div className='collapse drop-form-div' id={`UpdateForm${props.showLocation._id}`}>
                    <Edit showLocation={props.showLocation} setLocations={props.setLocations} setShowLocation={props.setShowLocation}/>
                    <button className='btn btn-primary mt-3' data-bs-toggle="collapse" onClick={ (event) => {props.handleDelete(props.showLocation)}}>Delete Location</button> 
                </div>
            </div>
        </div>

        </>
    )
}

export default ShowCard
