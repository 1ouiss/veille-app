import { useState, useEffect } from "react";
import CardArticle from "../components/CardArticle";

const Home = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('https://629a00896f8c03a9784e867c.mockapi.io/articles');
            const data = await res.json();
            setArticles(data);
        }
        fetchArticles();
    }, []);
    
    const redirectTo = (id) => {
        window.location.href = `/${id}`;
    }

    return ( 
        <div className="container">
            <div className="home-title">
                <img src="./logo.svg" alt="" />
                <h1>L'ACTUALITÉ SUR LES START-UP</h1>
            </div>
            <div className="card-container">
                <h3>NOS DERNIÈRES ACTUS</h3>
                {articles.map(article => (
                    <CardArticle key={article.id} article={article}/>
                ))}
            </div>
        </div>
     );
}
 
export default Home;