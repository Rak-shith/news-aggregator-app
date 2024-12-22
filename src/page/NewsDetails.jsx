import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { articles, mediaStackArticles, nytArticles } = useSelector(
    (state) => state.news
  );

  const allArticles = [...articles, ...mediaStackArticles, ...nytArticles];

  const newsDetail = allArticles.find(
    (article) => article.url === decodeURIComponent(id)
  );

  if (!newsDetail) {
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
          src={newsDetail?.image}
          alt="news"
          className="card-img-top"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h1 className="card-title mb-4">{newsDetail?.title}</h1>
          <p className="card-text text-muted">{newsDetail?.description}</p>
          <p className="card-text">{newsDetail?.content}</p>
          <p className="card-text">
            <strong>Author:</strong> {newsDetail?.author || "Unknown"}
          </p>
          <p className="card-text">
            Published At: {newsDetail?.published_at || "2024-12-02"}
          </p>
          <a
            href={newsDetail?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark me-2"
          >
            Read Full Article
          </a>
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
