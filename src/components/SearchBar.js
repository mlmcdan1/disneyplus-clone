// src/components/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&with_companies=2`
        );
        const data = await res.json();
        const disneyResults = (data.results || []).filter(movie =>
          movie.poster_path && movie.backdrop_path
        );
        setResults(disneyResults);
      } catch (err) {
        console.error('Search error:', err);
      }
    };

    const debounce = setTimeout(() => fetchData(), 400);
    return () => clearTimeout(debounce);
  }, [query, apiKey]);

  return (
    <Container>
      <SearchBar
        type="text"
        placeholder="Search Disney movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Grid>
        {results.map((movie) => (
          <Card key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <Title>{movie.title}</Title>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default SearchPage;

// Styled components
const Container = styled.div`
  padding: 40px 5%;
  background: #0c0c0c;
  min-height: 100vh;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 14px 20px;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  margin-bottom: 30px;
  outline: none;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 8px;
  }

  color: white;
`;

const Title = styled.div`
  font-size: 14px;
  text-align: center;
`;
