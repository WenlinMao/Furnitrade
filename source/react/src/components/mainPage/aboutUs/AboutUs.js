import React from 'react'
import styled from 'styled-components'
import Wave from '../../common/Wave';

const SectionGroup = styled.div`
    background: url(${props => props.image});
    height: 940px;
    background-size: cover;
    display: grid;
    grid-template-rows: 300px auto;
    grid-gap: 20px;
    position: relative;
    z-index: 10;

    @media (max-width: 1640px) {
        height: 740px;
    }
    @media (max-width: 1040px) {
        height: 840px;
    }
    @media (max-width: 840px) {
        height: 940px;
    }
    @media (max-width: 440px) {
        height: 1040px;
    }
`

const SectionLogo = styled.img`
    align-self: end;
    width: 200px;
    margin: 0 auto;
`

const SectionTitleGroup = styled.div`
    display: grid;
    grid-template-columns: 300px auto;
    margin: 0 40px;
    grid-gap: 20px;
    grid-template-rows: auto 100%;
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        text-align: center;
    }
`

const SectionTitle = styled.h3`
    color: rgba(26, 24, 24, 0.6);
    font-size: 60px;
    margin: 0;
    line-height: 1.2;
    @media (max-width: 720px) {
        font-size: 40px;
    }
`

const SectionText = styled.p`
    color: rgba(26, 24, 24, 0.6);
`

const WaveBottom = styled.div`
    position: absolute;
    width: 100%;
    bottom: -6px;
`

const WaveTop = styled.div`
    position: absolute;
    width: 100%;
    top: -6px;
    transform: rotate(180deg);
`
/* Props should be all the information */
const AboutUs = props => (
	<SectionGroup image={props.image}>
        <WaveTop><Wave /></WaveTop>
        <WaveBottom><Wave /></WaveBottom>
		<SectionLogo src={props.logo} />
		<SectionTitleGroup>
			<SectionTitle>{props.title}</SectionTitle>
			<SectionText>{props.text1}<br/><br/>{props.text2}</SectionText>
		</SectionTitleGroup>
	</SectionGroup>
)

export default AboutUs
