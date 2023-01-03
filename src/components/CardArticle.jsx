import {Link } from 'react-router-dom';

const CardArticle = ({article}) => {
    return ( 
        <div className={`card-article card-color-${article.id_color}`} key={article.id}>
            <div className="card-article-image">
                <img src={article.image} alt={article.title} />
            </div>
            <div className="card-article-text">
                <div>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                </div>
                <div>
                    <Link to={`/${article.id}`}>
                        <div class="container__hover">
                            <ul>
                                <li>
                                    <p class="text">Découvrir 
                                        <div class="plus__top"></div>
                                        <div class="plus__left"></div>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default CardArticle;