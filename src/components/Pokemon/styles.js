import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 10px;
    background-color: white;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 1px 5px 0 rgba(192, 208, 230, 0.9);
    width: ${props => props.detailed ? "auto" : "180px"};
    height: ${props => props.detailed ? "auto" : "180px"};
    font-size: ${props => props.detailed && "18px;"};

    header {
        display: flex;
        align-items: center;
        justify-content: space-around;

        span {
            font-weight: 600;
        }

        span::first-letter {
            text-transform: uppercase;
        }

    }

    .pokemon-detail {
        cursor: pointer;
    }

    .pokemon-sprite {
        text-align: center;
        img {
            border-radius: 50%;
            height: 96px;
            width: 96px;
            box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
        }
    }

    .badges {
        margin: 10px;
        cursor: pointer;

        span {
            text-transform: capitalize;
            padding: 3px;
            margin: 3px;
            text-shadow: -1px -1px 0 black,  
                         1px -1px 0 black,
                         -1px 1px 0 black,
                         1px 1px 0 black;
            color: white;
            border-radius: 10px;
            border: 2px solid white;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 1);

        }
    }

    .water {
        background: linear-gradient(to bottom, #7db9e8 0%,#308ff3 30%,#308ff3 70%,#7db9e8 100%);
    }

    .bug {
        background: linear-gradient(to bottom, #acbc36 0%,#899b06 30%,#899b06 70%,#acbc36 100%);
    }

    .dark {
        background: linear-gradient(to bottom, #4f3c32 0%,#382a20 30%,#382a20 70%,#4f3c32 100%);
    }

    .dragon {
        background: linear-gradient(to bottom, #7764db 0%,#4d437e 30%,#4d437e 70%,#7764db 100%);
    }

    .electric {
        background: linear-gradient(to bottom, #f0e6c2 0%,#e99402 30%,#e99402 70%,#f0e6c2 100%);
    }

    .fairy {
        background: linear-gradient(to bottom, #e7b9ee 0%,#e991e4 30%,#e991e4 70%,#e7b9ee 100%);
    }

    .fighting {
        background: linear-gradient(to bottom, #853d28 0%,#5f2a10 30%,#5f2a10 70%,#853d28 100%);
    }

    .fire {
        background: linear-gradient(to bottom, #f28a65 0%,#c22006 30%,#c22006 70%,#f28a65 100%);
    }

    .flying {
        background: linear-gradient(to bottom, #b7c1f4 0%,#5a73d6 30%,#5a73d6 70%,#b7c1f4 100%);
    }

    .ghost {
        background: linear-gradient(to bottom, #635cbe 0%,#464296 30%,#464296 70%,#635cbe 100%);
    }

    .grass {
        background: linear-gradient(to bottom, #72c03e 0%,#4a7e1f 30%,#4a7e1f 70%,#72c03e 100%);
    }

    .ground {
        background: linear-gradient(to bottom, #cdb053 0%,#867237 30%,#867237 70%,#cdb053 100%);
    }

    .ice {
        background: linear-gradient(to bottom, #b3e8fd 0%,#65d5f7 30%,#65d5f7 70%,#b3e8fd 100%);
    }

    .normal {
        background: linear-gradient(to bottom, #dbd6d1 0%,#aaa398 30%,#aaa398 70%,#dbd6d1 100%);
    }

    .poison {
        background: linear-gradient(to bottom, #97599a 0%,#5c2c5e 30%,#5c2c5e 70%,#97599a 100%);
    }

    .psychic {
        background: linear-gradient(to bottom, #f5a7c2 0%,#dd2f65 30%,#dd2f65 70%,#f5a7c2 100%);
    }

    .rock {
        background: linear-gradient(to bottom, #ddd1ac 0%,#998636 30%,#998636 70%,#ddd1ac 100%);
    }

    .steel {
        background: linear-gradient(to bottom, #d3d2da 0%,#8f8c99 30%,#8f8c99 70%,#d3d2da 100%);
    }
    

`;
