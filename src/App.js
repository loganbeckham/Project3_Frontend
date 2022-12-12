import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

    const [locations, setLocations] = useState([])
    //POST VARIABLES
    const [newLocation, setNewLocation] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newZip, setNewZip] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newRating, setNewRating] = useState('')
    const [newTags, setNewTags] = useState('')
    //PUT VARIABLES
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updatedLocation, setUpdatedLocation] = useState()
    const [updatedCity, setUpdatedCity] = useState()
    const [updatedZip, setUpdatedZip] = useState()
    const [updatedDescription, setUpdatedDescription] = useState()
    const [updatedImage, setUpdatedImage] = useState()
    const [updatedRating, setUpdatedRating] = useState()
    const [updatedTags, setUpdatedTags] = useState()


    // POST FORM FUNCTIONS
    const handleNewLocation = (event) => {
        setNewLocation(event.target.value)
    }

    const handleNewCity = (event) => {
        setNewCity(event.target.value)
    }

    const handleNewZip = (event) => {
        setNewZip(event.target.value)
    }

    const handleNewDescription = (event) => {
        setNewDescription(event.target.value)
    }

    const handleNewImage = (event) => {
        setNewImage(event.target.value)
    }

    const handleNewRating = (event) => {
        setNewRating(event.target.value)
    }

    const handleNewTags = (event) => {
        setNewTags(event.target.value)
    }

    // POST ROUTE
    const handleNewLocationForm = (event) => {
        event.preventDefault()
        axios.post(
            'https://project3-travelapp-backend.herokuapp.com/locations',
            {
                location: newLocation,
                city: newCity,
                zip: newZip,
                description: newDescription,
                image: newImage,
                rating: newRating,
                tags: newTags,
            }
        ).then(() => {
            axios   
                .get('https://project3-travelapp-backend.herokuapp.com/locations')
                .then((response) => {
                    setLocations(response.data)
                })
        })
        event.target.reset()
    }

    // GET ROUTE
    useEffect(() => {
        axios
            .get('https://project3-travelapp-backend.herokuapp.com/locations')
            .then((response) => {
                setLocations(response.data)
                console.log(response.data)
            })
    })

    // DELETE ROUTE
    const handleDelete = (locationData) => {
        axios
            .delete(`https://project3-travelapp-backend.herokuapp.com/locations/${locationData._id}`)
            .then(() => {
                axios
                    .get('https://project3-travelapp-backend.herokuapp.com/locations')
                    .then((response) => {
                        setLocations(response.data)
                    })
                })
    }

    // PUT FORM FUNCTIONS

    const showForm = () => {
        setShowUpdateForm(true)
    }

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
    const handleUpdateForm = (locationData) => {
        axios.put(
            `https://project3-travelapp-backend.herokuapp.com/locations/${locationData._id}`,
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
                    setLocations(response.data)
                })
        })
        setShowUpdateForm(false)
    }

    return (
        <>
        <h1> Travel App</h1>
            <div>
                {locations.map((location) => {
                    return (
                        <>
                        <h4>{location.location}</h4>
                        <p>{location.zip}</p>
                        <button onClick={ (event) => {handleDelete(location)}}>Delete Location</button>
                        
                        {showUpdateForm ?
                            <form onSubmit={(event) => {handleUpdateForm(location)}}>
                                location: <input type="text" defaultValue={location.location} onChange={handleLocationUpdate}/><br/>
                                city: <input type="text" defaultValue={location.city} onChange={handleCityUpdate}/><br/>
                                zip: <input type="number" defaultValue={location.zip} onChange={handleZipUpdate}/><br/>
                                description: <input type="text" defaultValue={location.description} onChange={handleDescriptionUpdate}/><br/>
                                image: <input type="text" defaultValue={location.image} onChange={handleImageUpdate}/><br/>
                                rating: <input type="number" defaultValue={location.rating} onChange={handleRatingUpdate}/><br/>
                                tags: <input type="text" defaultValue={location.tags} onChange={handleTagsUpdate}/><br/>
                                <input type="submit" value="Update Location"/>
                            </form>
                        :
                            <button onClick={showForm}>Edit</button>
                        }
                        </>
                    )
                })}
            </div>
            <div>
                <h1>Add New Location</h1>
                <section>
                    <form onSubmit={handleNewLocationForm}>
                        location: <input type="text" onChange={handleNewLocation}/><br/>
                        city: <input type="text" onChange={handleNewCity}/><br/>
                        zip: <input type="number" onChange={handleNewZip}/><br/>
                        description: <input type="text" onChange={handleNewDescription}/><br/>
                        image: <input type="text" onChange={handleNewImage}/><br/>
                        rating: <input type="number" onChange={handleNewRating}/><br/>
                        tags: <input type="text" onChange={handleNewTags}/><br/>
                        <input type="submit" value="Add Location"/>
                    </form>
                </section>
            </div>
        </>
    )
}

export default App;
