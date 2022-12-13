import {useState} from 'react'
import axios from 'axios'

const Add = (props) => {

    const [newLocation, setNewLocation] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newZip, setNewZip] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newRating, setNewRating] = useState('')
    const [newTags, setNewTags] = useState('')

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
                    props.setLocations(response.data)
                })
        })
        event.target.reset()
    }

    return (
        <div>
            <section className="collapse" id="formSection">
                <form onSubmit={handleNewLocationForm}>
                    location: <input type="text" className="form-control" onChange={handleNewLocation} /><br />
                    city: <input type="text" className="form-control" onChange={handleNewCity} /><br />
                    zip: <input type="number" className="form-control" onChange={handleNewZip} /><br />
                    description: <input type="text" className="form-control" onChange={handleNewDescription} /><br />
                    image: <input type="text" className="form-control" onChange={handleNewImage} /><br />
                    rating: <input type="range" className="form-range" min="0" max="5" onChange={handleNewRating} /><br />
                    tags: <input type="text" className="form-control" onChange={handleNewTags} /><br />
                    <button className='btn btn-primary' data-bs-toggle="collapse" href={`#formSection`} type="submit">Submit Attraction</button>
                </form>
            </section>
        </div>
    )
  }
  
  export default Add