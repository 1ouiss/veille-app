import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormComment from "../components/FormComment";

const Article = () => {
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

    return ( 
        <div className="container">
            <div className={`article-img image-${id}`}></div>
            <div className="article-text">
                <div className="article-text-title">
                    <h1>{article.title}</h1>
                    <p className={`article-date color-${id}`}>Ecrit le {article.date} par {article.writeBy}</p>
                </div>
                <div className="article-text-content">
                    <p>{article.description}</p>
                </div>
            </div>
            <FormComment addComment={addComment}/>
        </div>

     );
}
 
export default Article;