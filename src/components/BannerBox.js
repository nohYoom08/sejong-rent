import { Link } from "react-router-dom";

import styled from 'styled-components';

import forever from '../images/forever.png';

function BannerBox() {
    return (
    <Link to='/' style={{ textDecoration: 'none' }}>
        <Banner>
            <Explain>세종대학교 소프트웨어융합대학 온라인 대여서비스</Explain>
            <FlexBox_Row>
                <Forever></Forever>
                <Rent>세종대여</Rent>
            </FlexBox_Row>
        </Banner>
    </Link>
    )
}

export default BannerBox;

const FlexBox_Row = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;

const Banner = styled.div`
height:100%;
margin-top:5%;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

${FlexBox_Row}{
    margin-bottom:-1vw;
}
`;
const Explain = styled.p`
    color: #2B0F7A;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-size: 10px;
font-style: normal;
font-weight: 500;
line-height: 16px; /* 160% */
margin-bottom:-24px;
`;

const Forever = styled.div`
width: 80px;
height: 80px;
flex-shrink: 0;
background-image:url(${forever});
background-size:contain;
//div에 이미지 넣을때는 size필수
border-radius:40px;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
margin-right:8px;
`;

const Rent = styled.p`
color: #C20F2F;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-size: 40px;
font-style: normal;
font-weight: bold;
line-height: 44px; /* 110% */
`;