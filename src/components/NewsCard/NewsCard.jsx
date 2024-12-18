const NewsCard = ({ title, image, description, url }) => {
  return (
    <div>
      <div className="card mb-3 my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px" }}>
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0,50)}</h5>
          <p className="card-text">{description?description.slice(0, 90):"The firm discouraged injured workers from seeking outside medical care and ignored interna"}</p>
          <a href={url} className="btn btn-dark" >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
