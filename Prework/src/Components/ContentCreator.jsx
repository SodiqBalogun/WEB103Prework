const ContentCreator = ( {name, url, description, imageURL} = props ) => {
    return (
        <div className="content-creator">
            <img src={imageURL} alt={`${name}'s profile`} className="creator-image" />
            <h2 className="creator-name">{name}</h2>
            <p className="creator-description">{description}</p>
            <a href={url} className="creator-link" target="_blank" rel="noopener noreferrer">Visit Profile</a>
        </div>
    )
}

export default ContentCreator;