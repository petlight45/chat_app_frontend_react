import styled from "styled-components";

const Component = styled.p`
    font-size: 1.0rem;
    font-family: var(--font-1);
    font-weight: 600;
`


export const AlertTitle = ({children}) => {
    return (
        <Component>
            {children}
        </Component>
    )
}