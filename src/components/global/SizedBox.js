import styled from 'styled-components';

const SizedBoxElement = styled.div`
        width: ${props => props.width ? `${props.width}rem` : '100%'};
        height: ${props => props.height ? `${props.height}rem` : '100%'};
    `

export const SizedBox = ({width, height}) => {
    return <SizedBoxElement width={width} height={height} />
}