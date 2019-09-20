import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    max-height: 87vh;

    #filtro {
        display: flex;
        justify-content: space-around;
        width: 100%;

        input {
            width: 100%;
            height: 40px;
            padding: 10px;
            font-size: 16px;
            border-radius: 10px;
            border: 2px solid black;
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
        }
    }

    #pokemonList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    #evolutionList {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    #load {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 100px;
            width: 100px;
            animation: rotation 1s infinite linear;

            @keyframes rotation {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(359deg);
                }
            }
        }

    }

    #paginacao {

        button {
            border-radius: 50%;
            color: white;
            border: none;
            padding: 2px;
            margin: 5px;
            width: 30px;
            height: 30px;
            background-color: #cc0000;
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
        }

        button:active {
            background-color: #9c1005;
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
        }

    }

`;
