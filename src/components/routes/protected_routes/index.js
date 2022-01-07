import styled from "styled-components";
import {Navigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {Spinner} from "../../global/Spinner";

const StyledContainer = styled.div`
    padding: 1rem;
    min-height: 100vh;
    display: flex;
    align-items:center;
    flex-direction:column;
    padding-top:10rem;
    background: var(--custom-main-background);
`;


export const ProtectedRouteComponent = ({conditions, elementToRenderOnPass, redirectToOnFail}) => {
    const [status, setStatus] = useState(null)
    const renderedOnce = useRef(false)
    useEffect(() => {
        const evaluateCondition = async () => {
            console.log("evaluation")
            for (let condition of conditions) {
                if (typeof condition === "function") {
                    if (!await condition()) {
                        setStatus(false)
                        break
                    }
                } else if (typeof condition === "boolean") {
                    if (!condition) {
                        setStatus(false)
                        break
                    }
                }
            }
            setStatus(true)
        }
        if (!renderedOnce.current){
            renderedOnce.current = true;
            evaluateCondition()
        }
    })

    useEffect(()=>{
        if (typeof status === "boolean"){
            renderedOnce.current = false;
        }
    }, [status])
    return (typeof status === "boolean" ? (status ? elementToRenderOnPass :
        <Navigate to={redirectToOnFail} replace={true}/>) :
        <StyledContainer>
            <Spinner size={2.0}/>
        </StyledContainer>);
}
