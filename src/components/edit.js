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
                .get(`https://project3-travelapp-backend.herokuapp.com/locations/${props.showLocation._id}`)
                .then((response) => {
                    props.setShowLocation(response.data)
                })
        })
    }

    return (
            <form className='pt-3' onSubmit={handleUpdateForm}>
                location: <input type="text" className="form-control" defaultValue={props.showLocation.location} onChange={handleLocationUpdate} /><br />
                city: <input type="text" className="form-control" defaultValue={props.showLocation.city} onChange={handleCityUpdate} /><br />
                zip: <input type="number" className="form-control" defaultValue={props.showLocation.zip} onChange={handleZipUpdate} /><br />
                description: <input type="text" className="form-control" defaultValue={props.showLocation.description} onChange={handleDescriptionUpdate} /><br />
                image: <input type="text" className="form-control" defaultValue={props.showLocation.image} onChange={handleImageUpdate} /><br />
                rating: <input type="range" className="form-range" defaultValue={props.showLocation.rating} min="0" max="5" onChange={handleRatingUpdate} /><br />
                tags: <input type="text" className="form-control" defaultValue={props.showLocation.tags} onChange={handleTagsUpdate} /><br />
                <button className='btn btn-primary' data-bs-toggle="collapse" href={`#UpdateForm${props.showLocation._id}`} type="submit">Update Location</button>
            </form>
    )
  }
  
  export default Edit