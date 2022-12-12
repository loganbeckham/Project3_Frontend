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
            `https://project3-travelapp-backend.herokuapp.com/locations/${props.location._id}`,
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
                .get('https://project3-travelapp-backend.herokuapp.com/locations')
                .then((response) => {
                    props.setLocation(response.data)
                })
        })
        props.setShowUpdateForm(false)
    }

    return (
        <div>
            <form onSubmit={handleUpdateForm}>
                location: <input type="text" defaultValue={props.location.location} onChange={handleLocationUpdate} /><br />
                city: <input type="text" defaultValue={props.location.city} onChange={handleCityUpdate} /><br />
                zip: <input type="number" defaultValue={props.location.zip} onChange={handleZipUpdate} /><br />
                description: <input type="text" defaultValue={props.location.description} onChange={handleDescriptionUpdate} /><br />
                image: <input type="text" defaultValue={props.location.image} onChange={handleImageUpdate} /><br />
                rating: <input type="number" defaultValue={props.location.rating} onChange={handleRatingUpdate} /><br />
                tags: <input type="text" defaultValue={props.location.tags} onChange={handleTagsUpdate} /><br />
                <input type="submit" value="Update Location" />
            </form>
        </div>
    )
  }
  
  export default Edit