import { Link } from 'react-router-dom';

const ContentCreator = ({ id, name, url, description, imageURL }) => {
    return (
        <div className="content-creator">
            <img src={imageURL} alt={`${name}'s profile`} className="creator-image" />
            <h2 className="creator-name">{name}</h2>
            <p className="creator-description">{description}</p>
            <a href={url} className="creator-link" target="_blank" rel="noopener noreferrer">Visit Profile</a>
            <div className="creatorEdit">
                {id ? (
                    <Link to={`/edit/${id}`}>
                        <button type="button">Edit Creator</button>
                    </Link>
                ) : null}
            </div>
        </div>
    );
}

export default ContentCreator;