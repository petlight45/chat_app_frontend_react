import styled from "styled-components";

const Component = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 0.8rem;
    font-weight: 500;
`


export const AlertContent = ({children}) => {
    return (
        <Component>
            {children}
        </Component>
    )
}