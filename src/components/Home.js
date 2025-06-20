import React , {useEffect} from 'react';
import styled from 'styled-components';
import db from '../firebase';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommended from './Recommended';
import DisneyMovies from './DisneyMovies';
import DisneyShows from './DisneyShows';
import { useDispatch} from "react-redux";
import { setMovies } from "../features/movie/movieSlice";

 
function Home() {
    const dispatch = useDispatch();

    useEffect(()=> {
        db.collection("movies").onSnapshot((snapshot)=>{
            console.log(snapshot);
            let tempMovies = snapshot.docs.map((doc)=>{
                return { id: doc.id, ...doc.data()}

            })
            dispatch(setMovies(tempMovies));
        })
    }, [dispatch])


    return (  
        <Container>
            <ImgSlider/>
            <Viewers/>
            <Recommended/>
            <DisneyMovies/>
            <DisneyShows/>
        </Container>
    )
}

export default Home

const Container =  styled.main`
    min-height: calc(100vh - 70px); 
    padding: 0 calc(3.5vw + 5px);
    position: relative; 
    overflow-x: hidden;
    
    &:before {
        background: url("home-background.png") center center / cover
        no-repeat fixed; 
        content: "";
        position: absolute; 
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`