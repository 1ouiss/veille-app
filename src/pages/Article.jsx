import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormComment from "../components/FormComment";

const Article = ({localStorageArticles, setLocalStorageArticles}) => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [click, setClick] = useState(false)
    const [clickLike, setClickLike] = useState(false)

    useEffect(() => {
        const fetchArticle = async () => {
            const res = await fetch(`https://629a00896f8c03a9784e867c.mockapi.io/articles/${id}`);
            const data = await res.json();
            setArticle(data);
        }
        fetchArticle();

    }, [id]);

    const addComment = (e, comment) => {
        e.preventDefault();
        const newComments = [...article.comments, comment];
        const res = fetch(`https://629a00896f8c03a9784e867c.mockapi.io/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ...article,
                comments: newComments
            })
        });
        setArticle({
            ...article,
            comments: newComments
        })
    }

    const handleClick = (id) => {
        setClick(true);
        if (localStorageArticles.length === 0) {
            setLocalStorageArticles([...localStorageArticles, article])
            const newLocalStorageArticles = localStorageArticles;
            localStorage.setItem('articles', JSON.stringify(newLocalStorageArticles));
        }else{
            for (let i = 0; i < localStorageArticles.length; i++) {
                if (localStorageArticles[i].id === id) {
                    console.log('article déjà enregistré');
                }else{
                    setLocalStorageArticles([...localStorageArticles, article])
                    const newLocalStorageArticles = localStorageArticles;
                    localStorage.setItem('articles', JSON.stringify(newLocalStorageArticles));
                }
            }
        }

    }

    const handleLike = (id) => {
        setClickLike(true);
        const newLike = article.likes + 1;
        console.log(newLike);
        const res = fetch(`https://629a00896f8c03a9784e867c.mockapi.io/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ...article,
                likes: newLike
            })
        });
        setArticle({...article, likes: newLike})
    }


    return ( 
        <div className="container">
            <div className={`article-img image-${article.id}`}>
                <img src={article.image} alt="" />
            </div>
            <div className="content-article">
                <div className="article-title">
                    <button className={click ? 'card-color-4' : 'download'} onClick={() => handleClick(article.id)}>
                        <i className={click ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i> Enregistrer
                    </button>

                    <button className="like" onClick={() => handleLike(article.id)}>
                        <i className={clickLike ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> {article.likes} like(s)
                    </button>
                </div>
                <div className="article-text">
                    <div className="article-text-title">
                        <h1>{article.title}</h1>
                        <p className={`article-date color-${article.id_color}`}>Ecrit le {article.date} par {article.author}</p>
                    </div>
                    <div className="article-text-content">
                        {
                            article.content && article.content.map(content => (
                                <p key={content.id}>{content.text}</p>
                            ))
                        }
                    </div>
                </div>
                <FormComment addComment={addComment}/>
                <div>
                    <h2>Commentaires</h2>
                    {
                        article.comments && article.comments.map(comment => (
                            <div key={comment.avatar} className="comment">
                                <div className="comment-avatar">
                                    <img src={comment.avatar} alt="" />
                                </div>
                                <div className="comment-text">
                                    <p className="comment-text-name">{comment.name}</p>
                                    <p className="comment-text-content">{comment.comment}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Article;