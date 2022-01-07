import styled from "styled-components";

const SpinnerWidget = styled.div`
    border: ${props => props.size/8}rem solid transparent; /* Light grey */
    border-top: ${props => props.size/8}rem solid var(--custom-blue-1); /* Blue */
    border-right: ${props => props.size/8}rem solid var(--custom-blue-1); /* Blue */
    border-radius: 50%;
    width: ${props => props.size}rem;
    height: ${props => props.size}rem;
    animation: spin 0.4s linear infinite;
    margin:0;
    
    @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`


export const Spinner = ({size = 2}) => (
    <SpinnerWidget size={size}/>
)