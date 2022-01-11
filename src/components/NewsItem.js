import React from 'react'

const NewsItem = ({urlToImage, url, title, description}) => {
    return (
        <div className="newslist">
            <img src={urlToImage} className="newslist-img" alt=""/>
            <h3><a href={url} className="newslist-link">{title}</a></h3>
            <p className="newslist-text">{description}</p>
        </div>
    )
}

export default NewsItem;
