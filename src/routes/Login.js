import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styled from 'styled-components';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import backpage from '../images/🦆 icon _arrow back.svg';



const FlexBox_Row = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;
const FlexBox_Column = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;


const Wrapper = styled.div`
@import url('https://webfontworld.github.io/SCoreDream/SCoreDream.css');

box-sizing:border-box;

font-family: 'S-Core Dream';

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:0;
padding:0;
`;
const Sejong = styled.div`
position:fixed;
top:-15vw;
//왠진 모르겠지만 속성이 0이라도 있으면 이미지의 맨 위의 선을 천장에 붙여주나보다
padding:0;
width:1280px;
height:1280px;
//뷰포트 크기조정을 통해서 이미지 위치조정 가능
opacity:20%;

z-index:-1;

background-image:url(${sejong});
//div에 이미지 경로 설정하는 법(리터럴 활용)
background-size:contain;
//contain과 cover은 가로세로비율을 유지해주지만, div크기에 맞춰 사진이 잘리냐 안 잘리냐 차이. contain이 안 잘림
background-repeat:no-repeat;
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

//MainBox 시작//
//MainBox 시작//
//MainBox 시작//
const MainBox = styled.div`
width: 280px;
flex-shrink: 0;

border-radius: 40px;
border: 2px solid rgba(194, 15, 47, 0.71);
background: rgba(255, 255, 255, 0.50);

padding-top:12px;
padding-left:24px;
padding-right:24px;
padding-bottom:36px;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const Icon = styled.img`
width: 28px;
height: 36px;
flex-shrink: 0;
`;

const BackPage = styled.div`
align-self:flex-start;
width:65px;
height:16px;
background-color:rgb(230,230,230);
border-radius:8px;

margin-top:8px;
margin-left:8px;
margin-bottom:16px;

color: black;
font-size: 10px;
font-weight: 500;

cursor:pointer;

padding-right:5px;
padding-top:2px;
display: flex;
justify-content: center;
align-items:center;
flex-shrink: 0;

${Icon}{
    width:12px;
    margin-bottom:2px;
}
`;

const InputDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
margin-bottom:24px;

p{
    color: #000;
font-size: 12px;
font-style: normal;
font-weight: 500;
margin:0;
}
input{
    width: 240px;
height: 40px;
flex-shrink: 0;

border-radius: 8px;
border: 2px solid rgba(194, 15, 47, 0.71);
background: #FFF;

color: #8A8A8A;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 60px; /* 300% */

padding-left:12px;
}
`;

const Btn_login = styled.button`
width: 240px;
height: 49px;
flex-shrink: 0;
border-radius: 20px;
border:0;
background: #C05A6C;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 60px; /* 300% */

display:flex;
justify-content:center;
align-items:center;
`;




//MainBox 끝//
//MainBox 끝//
//MainBox 끝//


function Login() {
    const onClick_auth=()=>{
        window.location.href='/auth_home';
    }
    return <Wrapper>
        <Sejong></Sejong>
        <Link to='/' style={{textDecoration:'none'}}>
        <Banner>
            <Explain>세종대학교 소프트웨어융합대학 온라인 대여서비스</Explain>
            <FlexBox_Row>
                <Forever></Forever>
                <Rent>세종대여</Rent>
            </FlexBox_Row>
        </Banner>
        </Link>
        <MainBox>
            <Link to='/' style={{
                textDecoration: 'none',
                alignSelf: 'flex-start',
                marginLeft: '-12px'
            }}>
                <BackPage>
                    <Icon src={backpage}></Icon>
                    이전 페이지
                </BackPage>
            </Link>
            <InputDiv>
                <p>ID(학번)</p>
                <input type='number'
                placeholder='ID (학번)'></input>
            </InputDiv>
            <InputDiv>
                <p>비밀번호</p>
                <input placeholder = '비밀번호 입력'></input>
            </InputDiv>
            <Btn_login onClick={onClick_auth}>로그인 하기</Btn_login>
        </MainBox>
    </Wrapper>
}
export default Login;