import { useState, useEffect } from "react";
import CardArticle from "../components/CardArticle";

const Home = ({localStorageArticles}) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('https://629a00896f8c03a9784e867c.mockapi.io/articles');
            const data = await res.json();
            setArticles(data);
        }
        fetchArticles();
    }, []);

    return ( 
        <div className="container">
            <div className="home-title">
                <img src="./logo.svg" alt="" />
                <h1>L'ACTUALITÉ SUR LES START-UP</h1>
            </div>
            <div className="card-container">
                <h3>NOS DERNIÈRES ACTUS</h3>
                {
                    articles && articles.map(article => (
                        <CardArticle key={article.id} article={article}/>
                    ))
                }
            </div>

            <div className="card-container">
                <h3>MES ENREGISTREMENTS</h3>
                {
                    localStorageArticles.length > 0 ? localStorageArticles.map(article => (
                        <CardArticle key={article.id} article={article}/>
                    ))
                    : <p>Vous n'avez pas encore enregistré d'articles</p>
                }
            </div>
        </div>
    );
}
 
export default Home;