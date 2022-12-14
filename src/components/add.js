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
            <section className="collapse drop-form-div" id="formSection">
                <form className='drop-form' onSubmit={handleNewLocationForm}>
                    <div className='form-input'>
                        location: <input type="text" className="form-control" onChange={handleNewLocation} />
                    </div>
                    <div className='form-input'>
                    city: <input type="text" className="form-control" onChange={handleNewCity} />
                    </div>
                    <div className='form-input'>
                    zip: <input type="number" className="form-control" onChange={handleNewZip} />
                    </div>
                    <div className='form-input'>
                    description: <input type="text" className="form-control" onChange={handleNewDescription} />
                    </div>
                    <div className='form-input'>
                    image: <input type="text" className="form-control" onChange={handleNewImage} />
                    </div>
                    <div className='form-input'>
                    rating: <input type="range" className="form-range" min="0" max="5" onChange={handleNewRating} />
                    </div>
                    <div className='form-input'>
                    tags: <input type="text" className="form-control" onChange={handleNewTags} />
                    </div>
                    
                    <button className='btn btn-primary submit-drop-form' data-bs-toggle="collapse" href={`#formSection`} type="submit">Submit Attraction</button>
                </form>
            </section>
        </div>
    )
  }
  
  export default Add