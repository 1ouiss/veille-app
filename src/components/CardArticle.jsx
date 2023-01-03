import {Link } from 'react-router-dom';

const CardArticle = (props) => {
    const { article } = props;
    return ( 
        <div className={`card-article card-color-${article.id_color}`} key={article.id}>
            <div className="card-article-image">
                <img src={article.image} alt={article.title} />
            </div>
            <div className="card-article-text">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <button>
                    <Link to={`/${article.id}`}>Read More</Link>
                </button>
            </div>

        </div>
     );
}
 
export default CardArticle;