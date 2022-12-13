import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import DisplayCards from './components/DisplayCards'
import Add from './components/add';
import ShowCard from './components/ShowCard'

function App() {

    const [locations, setLocations] = useState([])

    const [showCard, setShowCard] = useState(false)
    const [showLocation, setShowLocation] = useState([])

    const cardDisplay = (props) => {
        setShowCard(!showCard)
        setShowLocation(props)
    }

    const loggy = () => {
        console.log(showLocation)
    }

    // GET ROUTE
    useEffect(() => {
        axios
            .get('https://project3-travelapp-backend.herokuapp.com/locations')
            .then((response) => {
                setLocations(response.data)
            })
    })


    // DELETE ROUTE
    const handleDelete = (locationData) => {
        console.log(locationData._id)
        axios
            .delete(`https://project3-travelapp-backend.herokuapp.com/locations/${locationData._id}`)
            .then(() => {
                axios
                    .get('https://project3-travelapp-backend.herokuapp.com/locations')
                    .then((response) => {
                        setLocations(response.data)
                    })
                })
        cardDisplay()
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
                    <ShowCard showLocation={showLocation} setShowLocation={setShowLocation} cardDisplay={cardDisplay} handleDelete={handleDelete}/>
                </>
                :
                <>
                    <div className='row'>
                        {locations.map((location) => {
                            return (
                                <>
                                    <DisplayCards location={location} setLocation={setLocations} handleDelete={handleDelete} cardDisplay={cardDisplay}/>
                                </>
                            )
                        })}
                    </div>
                    <button className="btn btn-primary m-5" data-bs-toggle="collapse" href={`#formSection`} aria-expanded="false" aria-controls={`#formSection`}>
                        Add New Location
                    </button>
                    <Add setLocation={setLocations} />
                </>
                }
            </div>
            
        </>
    )
}

export default App;
