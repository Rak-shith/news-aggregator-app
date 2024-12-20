import { useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const NewsCard = ({
  id,
  title,
  image,
  description,
  url,
  author = "",
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  return (
    <div>
      <div
        className="card mb-3 my-3 mx-3 px-2 py-2"
        style={{ maxWidth: "345px" }}
      >
        {imageLoading && <Loader type="spinner" size="sm" isLoading={true} />}
        <img
          src={image}
          onLoad={handleImageLoad}
          className="card-img-top"
          alt="News Thumbnail"
          style={{ display: imageLoading ? "none" : "block" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 50)}</h5>
          <h6 className="card-title">Author: {author || "Unknown"}</h6>
          <p className="card-text">
            {description
              ? description.slice(0, 90)
              : "The firm discouraged injured workers from seeking outside medical care and ignored interna"}
          </p>
          <Link to={`/news/${encodeURIComponent(url)}`} className="btn btn-dark">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
