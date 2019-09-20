import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    padding: 10px;
    margin: 0 5px;
    border-radius: 10px;
    border-top: 30px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 1);
    border-top-color: #cc0000;
    border-style: solid;
    
    background-color: white;

    #pokedexHeader {
        text-shadow: -1px -1px 0 white,  
                    1px -1px 0 white,
                    -1px 1px 0 white,
                    1px 1px 0 white;
        margin-top: -32px;
        margin-bottom: 10px;
    }

`;
