import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import DisplayCards from './components/DisplayCards'

function App() {

    const [locations, setLocations] = useState([])

    const [showCard, setShowCard] = useState(false)
    const [showLocation, setShowLocation] = useState([])
    
    //POST VARIABLES
    const [newLocation, setNewLocation] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newZip, setNewZip] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newRating, setNewRating] = useState('')
    const [newTags, setNewTags] = useState('')

    const cardDisplay = (props) => {
        setShowCard(!showCard)
        setShowLocation(props)
    }

    const loggy = () => {
        console.log(showLocation)
    }


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
            })
    })

    // SHOW ROUTE
    // const getShowLocation = () => {
    //     axios
    //         .get(`https://project3-travelapp-backend.herokuapp.com/locations${}`)
    // }
    

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


    return (
        <>
            <nav class="navbar navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand">Traction</a>
                    <form class="d-flex">
                    <button class="btn btn-outline-success" type="submit">Sign In</button>
                    </form>
                </div>
            </nav>
            <div>
                { showCard ?
                <>
                <div>
                    <div className='location-header'>
                        <h1 className='ms-5 mt-4'>{showLocation.location}</h1>
                        <div className='location-subheading'>
                            <div>
                                <p className='ms-5'>{showLocation.city} • {showLocation.rating} Stars</p>
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
                                <p className='card-text'>{showLocation.description}</p>
                                
                            </div>
                            <p className='m-5'>{showLocation.tags}</p>        
                        </div>
                        <div className='location-image-container' >
                            <img className='location-image ms-5 mt-3' style={{minHeight: '50vh'}} src={showLocation.image}/>
                        </div>
                    </div>
                </div>

                <button onClick={loggy}>
                    loggy
                </button>
                <button onClick={cardDisplay}>back</button>
                </>
                :
                <div className='row'>
                    {locations.map((location) => {
                        return (
                            <>
                                <DisplayCards location={location} setLocation={setLocations} handleDelete={handleDelete} cardDisplay={cardDisplay}/>
                            </>
                        )
                    })}
                </div>
                }
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
                        rating: <input type="range" min="0" max='5' onChange={handleNewRating}/><br/>
                        tags: <input type="text" onChange={handleNewTags}/><br/>
                        <input type="submit" value="Add Location"/>
                    </form>
                </section>
            </div>
        </>
    )
}

export default App;
