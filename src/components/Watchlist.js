import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserName } from '../features/user/userSlice';
import db from '../firebase';
import { Link } from 'react-router-dom';

export default function Watchlist() {
    const userName = useSelector(selectUserName);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (!userName) return;

        const fetchWatchlist = async () => {
            try {
                const snapshot = await db
                    .collection('watchlist')
                    .doc(userName)
                    .collection('movies')
                    .get();

                const movies = snapshot.docs.map(doc => doc.data());
                setWatchlist(movies);
            } catch (err) {
                console.error('Failed to fetch watchlist:', err);
            }
        };
        fetchWatchlist();
    }, [userName]);

    return (
        <Container>
            <h4>Your Watchlist</h4>
            <Content>
                {watchlist.length === 0 ? (
                    <p>No movies added yet.</p>
                ) : (
                    watchlist.map((movie) => (
                        <Wrap key={movie.id}>
                            <Link to={`/detail/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </Link>
                        </Wrap>
                    ))
                )}
            </Content>
        </Container>
    );
}

const Container = styled.div`
    padding: 0 calc(3.5vw + 5px);
`;

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const Wrap = styled.div`
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;

    img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 8px;
    }

    &:hover {
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`;