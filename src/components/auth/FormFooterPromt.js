import styled from 'styled-components'
import {Link} from "react-router-dom";
import {SizedBox} from "../global/SizedBox";

const FooterStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content:center;
    
    .question{
        font-size: 0.9rem;
    }
    
    .proceed_to{
        font-size: 0.85rem;
        color: var(--custom-blue-1);
        text-decoration: none;
        font-weight: 500;
    }
`

export const FormFooterPrompt = ({question, proceed_to, url}) => (
    <FooterStyled>
        <span className="question">{question}</span>
        <SizedBox width={0.2}/>
        <Link to={url} className="proceed_to">{proceed_to}</Link>
    </FooterStyled>
)