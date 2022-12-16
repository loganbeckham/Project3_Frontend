import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import logo from './img/map-arrow-icon-614x460.png'

import DisplayCards from './components/DisplayCards'
import Add from './components/add';
import ShowCard from './components/ShowCard'

function App() {

    const [locations, setLocations] = useState([])

    const [showCard, setShowCard] = useState(false)
    const [showLocation, setShowLocation] = useState([])

    const [searchInput, setSearchInput] = useState('')
    const [filteredResults, setFilteredResults]  = useState([])


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchValue.length > 0) {
            const searchResults = locations.filter((results) => {
                return Object.values(results).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
        setFilteredResults(searchResults)
        } else {
        setFilteredResults(locations)
        }
    }

    const cardDisplay = (results) => {
        setShowCard(!showCard)
        setShowLocation(results)
    }

    // GET ROUTE
    useEffect(() => {
        axios
            .get('https://project3-travelapp-backend.herokuapp.com/locations')
            .then((response) => {
                setLocations(response.data)
                setFilteredResults(response.data)
            })
    }, [])

    // DELETE ROUTE
    const handleDelete = (locationData) => {
        console.log(locationData._id)
        axios
            .delete(`https://project3-travelapp-backend.herokuapp.com/locations/${locationData._id}`)
            .then(() => {
                axios
                    .get('https://project3-travelapp-backend.herokuapp.com/locations')
                    .then((response) => {
                        setFilteredResults(response.data)
                    })
                })
        cardDisplay()
    }


    return (
        <>
             <nav className="navbar navbar-light">
                <div className="container-fluid mt-4">
                    <div className='nav-logo'>
                        <a href='/'><img src={logo} className="logo ms-4"/></a>
                        <a href='/' className="navbar-brand ms-2">Traction</a>
                    </div>
                    <div className="d-flex me-4">
                        <button className="btn" type="submit">Sign In</button>
                    </div>
                </div>
            </nav>
            <div>
                <form>
                    <input type="text" onChange={(event) => searchItems(event.target.value)}/>
                </form>
            </div>
            <div>
                { showCard ?
                <>
                    <ShowCard filteredResults={filteredResults} setFilteredResults={setFilteredResults} locations={locations} showLocation={showLocation} setShowLocation={setShowLocation} cardDisplay={cardDisplay} handleDelete={handleDelete} setLocations={setLocations}/>
                </>
                :
                <>
                    <div className='row'>
                        {filteredResults.map((filteredResults) => {
                            return (
                                <>
                                    <DisplayCards filteredResults={filteredResults} setLocation={setLocations} handleDelete={handleDelete} cardDisplay={cardDisplay}/>
                                </>
                            )
                        })}
                    </div>
                    <button className="btn m-5" data-bs-toggle="collapse" href={`#formSection`} aria-expanded="false" aria-controls={`#formSection`}>
                        Add New Location
                    </button>
                    <Add setLocations={setLocations} setFilteredResults={setFilteredResults}/>
                </>
                }
            </div>
            
        </>
    )
}

export default App;
