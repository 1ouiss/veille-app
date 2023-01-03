import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormComment from "../components/FormComment";

const Article = ({localStorageArticles, setLocalStorageArticles}) => {
    const { id } = useParams();
    const [article, setArticle] = useState({});

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
        console.log(res);
    }

    const handleClick = (id) => {


        for (let i = 0; i < localStorageArticles.length; i++) {
            if (localStorageArticles[i].id === id) {
                console.log('article déjà enregistré');
            }else{
                setLocalStorageArticles([...localStorageArticles, article])
                const newLocalStorageArticles = localStorageArticles;
                console.log(localStorageArticles);
                localStorage.setItem('articles', JSON.stringify(newLocalStorageArticles));
            }
            
        }

    }


    return ( 
        <div className="container">
            <div className={`article-img image-${article.id_color}`}></div>
            <div className="article-text">
                <div className="article-text-title">
                    <h1>{article.title}</h1>
                    <p className={`article-date color-${article.id_color}`}>Ecrit le {article.date} par {article.writeBy}</p>
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
                        <div key={comment.id}>
                            <p>{comment.name}</p>
                            <p>{comment.comment}</p>
                        </div>
                    ))
                }
            </div>

            <div onClick={() => handleClick(article.id)}>
                enregistrer
            </div>
        </div>
     );
}
 
export default Article;