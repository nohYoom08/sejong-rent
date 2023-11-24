import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styled from 'styled-components';

import BannerBox from '../components/BannerBox';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import book from '../images/🦆 icon _book.svg';
import glass from '../images/🦆 icon _glass.svg';
import map from '../images/🦆 icon _map.svg';
import person from '../images/🦆 icon _person.svg';


function User_Home() {
    return <Wrapper>
        <Sejong></Sejong>
        <BannerBox></BannerBox>
        <MainBox>
            <Link to='/apply' style={{ textDecoration: 'none' }}>
                <BtnBig>
                    <Icon src={book}></Icon>
                    <p>대여 신청</p>
                </BtnBig>
            </Link>
            <Link to='/check' style={{ textDecoration: 'none' }}>
                <BtnBig>
                    <Icon src={glass}></Icon>
                    <p>대여내역 확인 및 수정</p>
                </BtnBig>
            </Link>
            <Link to='/map' style={{ textDecoration: 'none' }}>
                <BtnBig>
                    <IconMap src={map}></IconMap>
                    <p style={{ marginLeft: '-16px' }}>찾아오시는 길</p>
                </BtnBig>
            </Link>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <BtnSmall>
                    <IconSmall src={person}></IconSmall>
                    <p>학생회 로그인</p>
                </BtnSmall>
            </Link>
        </MainBox>
    </Wrapper>
}
export default User_Home;


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


//MainBox 시작//
//MainBox 시작//
//MainBox 시작//
const MainBox = styled.div`
width: 280px;
height: 480px;
flex-shrink: 0;

border-radius: 40px;
border: 2px solid rgba(194, 15, 47, 0.71);
background: rgba(255, 255, 255, 0.50);

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:48px;
`;

const BtnBig = styled.button`
width: 240px;
height: 64px;
flex-shrink: 0;
border-radius: 20px;
background: #FF96A9;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
border:0;
color: #FFF;

padding-left:28px;
padding-right:28px;
display:flex;
justify-content:space-evenly;
align-items:center;
cursor:pointer;

&:hover{
    background-color:rgb(256,180,180);
}
&:active{
    box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color:rgb(256,180,180);
}

p{
margin:0;
padding:0;
width: 179px;
height: 26px;


text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 60px; /* 300% */

display: flex;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
}


`;

const BtnSmall = styled.button`
width: 125px;
height: 40px;
flex-shrink: 0;
border-radius: 20px;
background: #FF96A9;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
border:0;
cursor:pointer;

padding-left:16px;
display:flex;
justify-content:center;
align-items:center;

&:hover{
    background-color:rgb(256,180,180);
}
&:active{
    box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color:rgb(256,180,180);
}
p{
    display: flex;
width: 102.083px;
height: 13px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 60px; /* 500% */
}

`;


const Icon = styled.img`
width: 28px;
height: 36px;
flex-shrink: 0;
`;
const IconMap = styled.img`
width: 48px;
height: 36px;
flex-shrink: 0;
`;
const IconSmall = styled.img`
width: 24px;
height: 24px;
flex-shrink: 0;
margin-right:-12px;
`;



//MainBox 끝//
//MainBox 끝//
//MainBox 끝//
