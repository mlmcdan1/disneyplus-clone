import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from "react-router-dom";
import db from '../firebase';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUserName } from '../features/user/userSlice';

function Detail() {
    const { id } = useParams();
    const [ movie, setMovie ] = useState({});
    const [trailerKey, setTrailerKey] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const typeParam = queryParams.get('type');

    const userName = useSelector(selectUserName);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    const apiKey = process.env.REACT_APP_TMDB_API_KEY;

    const addToWatchlist = async () => {
        if (!userName) return alert('Please log in to save to watchlist.');

        try {
            const movieRef = doc(
                collection(
                    doc(collection(db, 'watchlist'), userName),
                    'movies'
                ),
                movie.id?.toString()
            );
            
                await setDoc(movieRef, {
                    id: movie.id,
                    title: movie.title || movie.name,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview
                });

                setIsInWatchlist(true);
                alert(`${movie.title || movie.name} added to your watchlist!`);
        } catch (err) {
            console.error('Error adding to watchlist:', err);
            alert('Something went wrong. Try again later.');
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try { 
                const res = await fetch(
                    `https://api.themoviedb.org/3/${typeParam || 'movie'}/${id}?api_key=${apiKey}`
                );
                const data = await res.json();
                setMovie(data);

                if (userName && data.id) {
                    const movieRef = doc(
                        collection(
                            doc(collection(db, 'watchlist'), userName),
                            'movies'
                        ),
                        data.id.toString()
                    );

                    const docSnap = await getDoc(movieRef);
                    setIsInWatchlist(docSnap.exists());
                }

                const videoRes = await fetch(
                    `https://api.themoviedb.org/3/${typeParam || 'movie'}/${id}/videos?api_key=${apiKey}`
                );
                const videoData = await videoRes.json();

                const trailer = videoData.results.find(
                    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
                );
                if (trailer) setTrailerKey(trailer.key);            
            } catch (err) {
                console.error('Failed to fetch detail or trailer:', err);
            }
        };

        fetchData();    
    }, [id, typeParam, userName, apiKey]);

  return (
    <Container>
        <Background>
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title || movie.name}
            />
        </Background>
        
        <Content>
            <Poster>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                />
            </Poster>

            <TextInfo>
                <h1>{movie.title || movie.name}</h1>
                <SubTitle>
                    {movie.release_date || movie.first_air_date} • ⭐ {movie.vote_average}/10
                </SubTitle>
                <Description>{movie.overview}</Description>

                {!isInWatchlist && (
                    <WatchlistButton onClick={addToWatchlist}>
                        + Add to Watchlist
                    </WatchlistButton>
                )}

                {isInWatchlist && (
                    <WatchlistButton disabled>
                        ✅ Already in Watchlist
                    </WatchlistButton>
                )}


                {trailerKey && (
                    <Trailer>
                        <iframe
                            width="100%"
                            height="360"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Trailer>
                )}
            </TextInfo>
        </Content>
    </Container>
  )
}

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    height: 100vh;

    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.25));
    z-index: 1;
  }

    img{
        width:100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 0;
    }
`;

const Content = styled.div`
    display: flex;
    gap: 40px;
    align-items: flex-start;
    padding-top: 120px;
    z-index: 1;
`;

const Poster = styled.div`
    min-width: 200px;
    img {
        width: 100%;
        border-radius: 12px;
    }
`

const TextInfo = styled.div`
    color: white;
    max-width: 700px;

    h1 {
        font-size: 40px;
        margin-bottom: 10px;
    }
`;

const SubTitle = styled.div`
     color: #bbb;
     font-size: 16px;
     margin-bottom: 20px;
`;

const Description = styled.div`
     line-height: 1.6;
     font-size: 18px;
`;

const Trailer = styled.div`
    margin-top: 24px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    iframe {
        border-radius: 8px;
    }
`;

const WatchlistButton = styled.div`
    margin-top: 20px;
    background-color: #1f80e0;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #0e66c2;
    }

    &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;

export default Detail