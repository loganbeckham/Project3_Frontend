import React from 'react'

const Edit = (props) => {
    return (
        <div>
            <form onSubmit={(event) => { handleUpdateForm(location) }}>
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