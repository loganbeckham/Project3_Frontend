import React from 'react'

const Add = (props) => {
    return (
        <div>
            <form onSubmit={handleNewLocationForm}>
                location: <input type="text" onChange={handleNewLocation} /><br />
                city: <input type="text" onChange={handleNewCity} /><br />
                zip: <input type="number" onChange={handleNewZip} /><br />
                description: <input type="text" onChange={handleNewDescription} /><br />
                image: <input type="text" onChange={handleNewImage} /><br />
                rating: <input type="number" onChange={handleNewRating} /><br />
                tags: <input type="text" onChange={handleNewTags} /><br />
                <input type="submit" value="Add Location" />
            </form>
        </div>
    )
  }
  
  export default Add