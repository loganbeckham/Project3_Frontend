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

    /////////login////////
    const [newUser, setNewUser] = useState()
    const [newPassword, setNewPassword] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [showRegister, setShowRegister] = useState(true)
    ///////////////////////

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

    const cardDisplay = (props) => {
        setShowCard(!showCard)
        setShowLocation(props)
    }

    // GET ROUTE
    useEffect(() => {
        axios
            .get('https://project3-travelapp-backend.herokuapp.com/locations')
            .then((response) => {
                setLocations(response.data)
                setFilteredResults(response.data)
            })
        axios
            .get('https://project3-travelapp-backend.herokuapp.com/sessions/new', { withCredentials: true })
            .then((response) => {
                setCurrentUser(response.data.username)
                console.log(response);
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
                        setLocations(response.data)
                    })
                })
        cardDisplay()
    }


    ////////login/////////
    const handleNewUser = (event) => {
        setNewUser(event.target.value)
    }

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

    const createSession = (event)=>{
        event.preventDefault();
        axios.post('https://project3-travelapp-backend.herokuapp.com/sessions', {
            username: newUser,
            password: newPassword
        }, {withCredentials:true}).then(()=>{
            axios.get('https://project3-travelapp-backend.herokuapp.com/sessions/new', {withCredentials:true}).then((response) => {
                setCurrentUser(response.data.username)
                console.log(response.data)
            })
        })
    }

    const createUser = (event) => {
        event.preventDefault();
        axios.post('https://project3-travelapp-backend.herokuapp.com/users', {
            username: newUser,
            password: newPassword
        }, { withCredentials: true }).then((response) => {
            setCurrentUser(response.data)
            console.log(response.data);
            setShowRegister(false)
        })

    }

    const deleteSession = () => {
        axios.delete('https://project3-travelapp-backend.herokuapp.com/sessions', { withCredentials: true }).then(() => {
            axios.get('https://project3-travelapp-backend.herokuapp.com/sessions/new').then((response) => {
                // setCurrentUser(response.data)
                console.log(response)
            })

        })
    }

    useEffect(() => {

    }, [])

    //////////////////////    


    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container-fluid mt-4">
                    <div className='nav-logo'>
                        <a href='/'><img src={logo} className="logo ms-4"/></a>
                        <a href='/' className="navbar-brand ms-2">Traction</a>
                    </div>
                    <form className="d-flex me-4">
                        <input type="text" placeholder='Search' onChange={(event) => searchItems(event.target.value)}/>
                    </form>
                    <h1>{currentUser}</h1>
                    <form onSubmit={createUser}>
                        
                        <input type='username' placeholder='username' onChange={handleNewUser} />
                        <input type='password' placeholder='password' onChange={handleNewPassword} />
                        <input type='submit' value='Register' />
                    </form>
                    {/* : */}
                    <form onSubmit={createSession}>
                        <input type='username' placeholder='username' onChange={handleNewUser} />
                        <input type='password' placeholder='password' onChange={handleNewPassword} />
                        <input type='submit' value='Login' />
                    </form>
                    <form onSubmit={deleteSession}>
                        <input type='submit' value='Logout' />
                    </form>
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
                    <ShowCard showLocation={showLocation} setShowLocation={setShowLocation} cardDisplay={cardDisplay} handleDelete={handleDelete} setLocations={setLocations}/>
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
