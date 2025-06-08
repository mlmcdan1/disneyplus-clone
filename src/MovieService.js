const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export async function getDisneyMovies() {
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=2&sort_by=popularity.desc`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch Disney movies');
    }

    const data = await res.json();
    return data.results;
}