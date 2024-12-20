import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useSelector((state) => state.news);

  const article = articles.find((article) => article.source.id === id);

  if (!article) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <h2 className="text-danger mb-4">Article Not Found!</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center my-5">
      <div className="card shadow-lg w-100" style={{ maxWidth: "800px" }}>
        <img
          src={article.urlToImage}
          alt="news"
          className="card-img-top"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h1 className="card-title mb-4">{article.title}</h1>
          <p className="card-text text-muted">{article.description}</p>
          <p className="card-text">{article.content}</p>
          <p className="card-text">
            <strong>Author:</strong> {article.author || "Unknown"}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary me-2"
          >
            Read Full Article
          </a>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
