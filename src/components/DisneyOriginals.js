import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function DisneyOriginals() { 
    const [originals, setOriginals] = useState([]);
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=2&sort_by=release_date.asc&language=en-US`
        )
            .then((res) => res.json())
            .then((data) => {
                const filtered = (data.results || []).filter(movie => movie.poster_path);
                setOriginals(filtered);
            })
            .catch(console.error);
    }, [apiKey]);

    return (
        <Container>
            <h4>Disney Originals</h4>
            <Content>
                {originals.map((movie) => (
                    <Wrap key={movie.id}>
                        <Link to={`/detail/${movie.id}`}>
                            <ImageWrap>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <TitleOverlay>{movie.title}</TitleOverlay>
                            </ImageWrap>
                        </Link>
                    </Wrap>
                ))}
            </Content>
        </Container>
    )
}

const Container = styled.div``;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const Wrap = styled.div`
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    border-color: rgba(249, 249, 249, 0.8);
  }
`
const ImageWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

const TitleOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    color: white;
    padding: 6px 8px;
    font-size: 14px; 
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;