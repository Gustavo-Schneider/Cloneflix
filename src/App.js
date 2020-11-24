import React, { useEffect, useState }  from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/index';
import FeatureMovie from './components/FeatureMovie/index';
import Header from './components/Header/index';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setfeatureData] = useState(null);
    const [blackHeader, setblackHeader] = useState(false);

    useEffect (()=>{ 
        const loadAll = async () => {
            //pegando lista de filmes
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pegando o feature
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setfeatureData(chosenInfo);
        }


        loadAll();
    }, []);


        useEffect(()=>{
            const scrollListener = () => {
                if(window.scrollY > 10) {
                    setblackHeader(true);
                } else {
                    setblackHeader(false);
                }
            }

            window.addEventListener('scroll', scrollListener);

            return () => {
                window.removeEventListener('scroll', scrollListener);
            }
        }, []);

    return (
        <div className="page">
            <Header black={blackHeader}/>
            
            {featureData &&
                <FeatureMovie item={featureData}/>
            }

            <section className="lists">
                {movieList.map((item, key)=> (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>

            <footer>
                <div>
                    Handmade by  Gustavo Schneider<br/>
                    Direitos de imagem para Netflix<br/>
                    Fonte de dados themoviedb.org<br/>
                </div>
            </footer>
            <footer>
            <a href="https://github.com/guxmtt" target="_blank">
                        <img className="github--logo" src="https://stagewp.sharethis.com/wp-content/uploads/2018/02/github.png"></img></a>
            <a href="https://www.linkedin.com/in/gustavo-de-mattos-schneider-4326a7153/" target="_blank">          
                        <img className="linkedin--logo" src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/linkedin_circle-512.png"></img></a>         
                    
            </footer>

            {movieList <= 0 &&

            <div className="loading">
                <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/Netflix_LoadTime-scaled.gif" alt="Carregando"/>
            </div>
            }
        </div>
    )
}