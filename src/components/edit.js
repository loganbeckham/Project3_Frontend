import {useState} from 'react'
import axios from 'axios'

const Edit = (props) => {

    const [updatedLocation, setUpdatedLocation] = useState()
    const [updatedCity, setUpdatedCity] = useState()
    const [updatedZip, setUpdatedZip] = useState()
    const [updatedDescription, setUpdatedDescription] = useState()
    const [updatedImage, setUpdatedImage] = useState()
    const [updatedRating, setUpdatedRating] = useState()
    const [updatedTags, setUpdatedTags] = useState()

    const handleLocationUpdate = (event) => {   
        setUpdatedLocation(event.target.value)
    }

    const handleCityUpdate = (event) => {  
        setUpdatedCity(event.target.value) 
    }

    const handleZipUpdate = (event) => {   
        setUpdatedZip(event.target.value)
    }

    const handleDescriptionUpdate = (event) => {
        setUpdatedDescription(event.target.value)
    }

    const handleImageUpdate = (event) => {
        setUpdatedImage(event.target.value)
    }

    const handleRatingUpdate = (event) => {
        setUpdatedRating(event.target.value)
    }

    const handleTagsUpdate = (event) => {
        setUpdatedTags(event.target.value)
    }

    // PUT ROUTE
    const handleUpdateForm = (event) => {
        event.preventDefault();

        axios.put(
            `https://project3-travelapp-backend.herokuapp.com/locations/${props.showLocation._id}`,
            {
                location: updatedLocation,
                city: updatedCity,
                zip: updatedZip,
                description: updatedDescription,
                image: updatedImage,
                rating: updatedRating,
                tags: updatedTags,
            }
        ).then(() => {
            axios   
                .get(`https://project3-travelapp-backend.herokuapp.com/locations`)
                .then((response) => {
                    props.setLocations(response.data)
                })
        })
    }

    return (
            <form className='pt-3 drop-form' onSubmit={handleUpdateForm}>
                <div className='form-input'>
                location: <input type="text" className="form-control" defaultValue={props.showLocation.location} onChange={handleLocationUpdate} />
                </div>
                <div className='form-input'>
                city: <input type="text" className="form-control" defaultValue={props.showLocation.city} onChange={handleCityUpdate} /><br />
                </div>
                <div className='form-input'>
                zip: <input type="number" className="form-control" defaultValue={props.showLocation.zip} onChange={handleZipUpdate} /><br />
                </div>
                <div className='form-input'>
                description: <input type="text" className="form-control" defaultValue={props.showLocation.description} onChange={handleDescriptionUpdate} /><br />
                </div>
                <div className='form-input'>
                image: <input type="text" className="form-control" defaultValue={props.showLocation.image} onChange={handleImageUpdate} /><br />
                </div>
                <div className='form-input'>
                rating: <input type="range" className="form-range" defaultValue={props.showLocation.rating} min="0" max="5" onChange={handleRatingUpdate} /><br />
                </div>
                <div className='form-input'>
                tags: <input type="text" className="form-control" defaultValue={props.showLocation.tags} onChange={handleTagsUpdate} /><br />
                </div>
                
                <button className='btn btn-primary submit-drop-form' data-bs-toggle="collapse" href={`#UpdateForm${props.showLocation._id}`} type="submit">Update Location</button>
            </form>
    )
  }
  
  export default Edit