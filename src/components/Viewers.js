import React from 'react'
import styled from 'styled-components'

function Viewers() {
  return (
    <Container>
        <Wrap>
            <img src = "viewers-disney.png" alt='disney'/>
            <video autoPlay loop muted playsInline>
                <source src="/disney.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src="/viewers-marvel.png" alt="marvel" />
            <video autoPlay loop muted playsInline>
                <source src="/marvel.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src = "viewers-national.png" alt='nationalgeo'/>
            <video autoPlay loop muted playsInline>
                <source src="/national-geographic.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src = "viewers-pixar.png" alt='pixar'/>
            <video autoPlay loop muted playsInline>
                <source src="/pixar.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src = "viewers-starwars.png" alt='starwars'/>
            <video autoPlay loop muted playsInline>
                <source src="/star-wars.mp4" type="video/mp4" />
            </video>
        </Wrap>
        
    </Container>
  )
}

export default Viewers

const Container = styled.div`
margin-top: 30px;
display: grid;
padding: 30px 0px 26px;
grid-gap: 25px;
grid-template-columns: repeat(5, minmax(0, 1fr));   

`

const Wrap = styled.div`
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16 / 9;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px,
              rgb(0 0 0 /73%) 0px 16px 10px -10px;
  transition: transform 250ms ease, border-color 250ms ease;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 250ms ease-in-out;
  }

  img {
    z-index: 2;
    opacity: 1;
  }

  video {
    z-index: 1;
    opacity: 0;
  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    img {
      opacity: 0;
    }

    video {
      opacity: 1;
    }
  }
`;