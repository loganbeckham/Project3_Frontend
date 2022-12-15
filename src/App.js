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
    const [search, setSearch] = useState('')


    const searchItems = (searchValue) => {
        setSearch(searchValue)
        }

    const cardDisplay = (props) => {
        setShowCard(!showCard)
        setShowLocation(props)
    }

    // GET ROUTE
    useEffect(() => {
        const getAllLocations = async () => {
            try {
                const url = `https://project3-travelapp-backend.herokuapp.com/locations?search=${search}`
                const {data} = await axios.get(url)
                setFilteredResults(data);
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        // axios
        //     .get('https://project3-travelapp-backend.herokuapp.com/locations')
        //     .then((response) => {
        //         setLocations(response.data)
        //         setFilteredResults(response.data)
        //     })
        getAllLocations();
    }, [search])


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
                <form className='d-flex justify-content-center'>
                    <div className='input-group w-50 mt-3'>
                        <input className="form-control" placeholder='search by name, city, or keywords' type="text" onChange={(event) => searchItems(event.target.value)}/>
                    </div>
                </form>
            </div>
            <div>
                { showCard ?
                <>
                    <ShowCard showLocation={showLocation} setShowLocation={setShowLocation} cardDisplay={cardDisplay} handleDelete={handleDelete}/>
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
                    <Add setLocation={setLocations} />
                </>
                }
            </div>
            
        </>
    )
}

export default App;
