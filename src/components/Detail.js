import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import db from '../firebase';



function Detail() {

    const { id } = useParams();
    const [ movie, setMovie ] = useState({});

    useEffect(() => {
        //Grab the movie info from db
        db.collection("movies")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists){
                // save the movie data
                setMovie(doc.data());
            } else {
                // redirect to homepage
            }
        }
        )
    })

  return (

    


    <Container>

        
        <Background>
            <img src={movie.backgroundImg}/>
        </Background>
        <ImageTitle>
            <img src={movie.titleImg}/>
        </ImageTitle>
        <Controls>

            <PlayButton>
                <img src="/play-icon-black.png" alt='playbtn'/>
                <span>PLAY</span>
            </PlayButton>

            <TrailorButton>
            <img src="/play-icon-white.png" alt='trailorbtn'/>
                <span>TRAILOR</span>
            </TrailorButton>

            <AddButton>
                <span>+</span>
            </AddButton>

            <GroupWatchButton>
                <img src="/group-icon.png" alt='group'/>
            </GroupWatchButton>

        </Controls>
        <SubTitle>
            {movie.subTitle}
        </SubTitle>
        <Description>
            {movie.description}
        </Description>
    </Container>
  )
}

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;


`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img{
        width:100%;
        height: 100%;
        object-fit: cover;

    }


`

const ImageTitle = styled.div`
    height:30vh;
    min-height: 170px;
    min-width: 200px;
    width: 35vw;
    margin-top: 60px;

     img {
        width: 100%;
        height: 100%;
        object-fit: contain;
     }


`

const Controls = styled.button`
     display: flex;
     align-items: center;
     background: none;
     border: none;


`
const PlayButton =styled.button`
    radius: 4px;
    font-size: 15px;
    padding: 0px 24px;
    margin-right: 22px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

     &:hover {
        background: rgb(198, 198, 198);
     }

`

const TrailorButton = styled(PlayButton)`
     background: rgba(0, 0, 0, 0.3);
     border: 1px solid rgb(249, 249, 249);
     color: rgb(249, 249, 249);
     text-transform: uppercase;

`

const AddButton = styled.button`
     margin-right: 16px;
     width: 44px;
     height: 44px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     border: 2px solid white;
     background-color: rgba(0, 0, 0, 0.6);
     cursor: pointer;

     span {
        font-size: 30px;
        color: white;
     }
`

const GroupWatchButton = styled(AddButton)`
     background: rgb(0, 0, 0);
`

const SubTitle = styled.div`
     color: rgb(249, 249, 249);
     font-size: 15px;
     min-height: 20px;
     margin-top: 26px;
`

const Description = styled.div`
     line-height: 1,4;
     font-size: 20px;
     margin-top: 16px;
     color: rgb(249,249,249);
     max-width: 760px;

`
export default Detail