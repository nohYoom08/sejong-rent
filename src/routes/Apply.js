import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styled from 'styled-components';

import Modal_Apply from '../componentes/Modal_Apply';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import backpage from '../images/🦆 icon _arrow back.svg';
import search from '../images/🦆 icon _search.svg';
import charger_lg from '../images/LG.jpeg';

import axios from 'react';

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
const Icon = styled.img`
width: 28px;
height: 36px;
flex-shrink: 0;
`;

const MainBox = styled.div`
width: 360px;
flex-shrink: 0;

border-radius: 40px;
border: 2px solid rgba(194, 15, 47, 0.71);
background: rgba(255, 255, 255, 0.50);

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:48px;
padding-top:12px;
padding-bottom:12px;
`;

const SecondBox = styled.div`
position:relative;
width: 320px;
flex-shrink: 0;

border: 1px solid #FF909F;
border-radius:32px;
background: #FFF;
backdrop-filter: blur(25px);

display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;

padding:8px;
`;

const BackPage = styled.div`
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

const SearchBar = styled.div`
width: 180px;
height: 32px;
flex-shrink: 0;

border-radius: 10px;
border: 1px solid #FF6A7F;
background: #FFF;
margin-left:8px;
margin-right:4px;
margin-bottom:8px;

display:flex;
justify-content:center;
align-items:center;

img{
    width: 20px;
height: 20px;
flex-shrink: 0;
}

div{
width: 140px;
height: 28px;
color: #A6A6A6;
font-size: 16px;
font-style: normal;
font-weight: 500;

display:flex;
justify-content:flex-start;
align-items:center;
}
`;

const Line = styled.div`
align-self:center;
width: 300px;
height: 1px;
background: #BF3333;
margin-bottom:12px;
`;


const Text_Blank = styled.p`
display: flex;
width: 320px;
height: 200px;
flex-direction: column;
justify-content: center;
align-items:center;
flex-shrink: 0;

color: #A6A6A6;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 500;
`;

const StuffInfo = styled.div`
align-self:center;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;
h1{
    color: #BF3333;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */

    margin-bottom:0;
}
h1:nth-child(3){
    margin-bottom:8px;
}
span{
    color: rgb(50,50,50);
}
`;

const Img_Stuff = styled.img`
    width:100%;
    height:300px;
    border:4px solid rgb(200,200,200);
    border-radius:10%;

    margin-bottom:24px;
`;
const Btn_Rent = styled.button`
align-self:center;
width: 120px;
height: 48px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: ${(props) => props.bgColor};
margin-bottom:12px;
cursor: pointer;

color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 90% */
`;




//MainBox 끝//
//MainBox 끝//
//MainBox 끝//


function Apply() {
    const SEARCHURL = '/';

    const [stuffCnt, setStuffCnt] = useState(3);
    const [isOpen, setIsOpen] = useState(false);
    const [item_apply, setItem_apply] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [itemInfo,setItemInfo]=useState({});
    const [possible,setPossible]=useState(false);

    const onClick_modal = () => {
        setIsOpen(true);
    }

    const onSubmit_item = async () => {
        const item = item_apply;
        try {
            const response = await axios.get(SEARCHURL, { params: { item } });
            console.log('get itemInfo succeeded!');
            if(response.data.cnt==0)
                setPossible(false);
            else
                setPossible(true);
            setItemInfo(response.data);
            setIsSelected(true);
        } catch (error) {
            console.log('get itemInfo failed ;(', error);
        }
    }

    const onClick_apply=()=>{
        let result = window.confirm("해당 품목으로 대여를 신청하시겠습니까?")
        if(result){
            sessionStorage.setItem('itemInfo',JSON.stringify(itemInfo));
            window.location.href='/apply_form';
        }
    }

    useEffect(()=>{
        onSubmit_item();
    },[item_apply]);


    return <Wrapper>
        <Sejong></Sejong>
        <Link to='/' style={{ textDecoration: 'none' }}>
            <Banner>
                <Explain>세종대학교 소프트웨어융합대학 온라인 대여서비스</Explain>
                <FlexBox_Row>
                    <Forever></Forever>
                    <Rent>세종대여</Rent>
                </FlexBox_Row>
            </Banner>
        </Link>
        <MainBox>
            <SecondBox>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <BackPage>
                        <Icon src={backpage}></Icon>
                        이전 페이지
                    </BackPage>
                </Link>
                <FlexBox_Row>
                    <SearchBar>
                        <img src={search}></img>
                        <div onClick={onClick_modal}>대여품 검색</div>
                    </SearchBar>
                </FlexBox_Row>
                <Line></Line>
                {isOpen && <Modal_Apply
                    setIsOpen={setIsOpen}
                    setItem_apply={setItem_apply}
                    setIsSelected={setIsSelected}
                ></Modal_Apply>}
                {isSelected ? <StuffInfo>
                    <h1>
                        •품명 : <span>{item_apply}</span>
                    </h1>
                    <h1>
                        •잔여수량 : <span>{stuffCnt}</span>
                    </h1>
                    <h1>
                        •이미지 :
                    </h1>
                    <FlexBox_Column>
                        <Img_Stuff src={charger_lg}></Img_Stuff>
                        {
                        possible ? <Btn_Rent 
                            onClick={onClick_apply}
                            bgColor='#D7556C'>
                            대여하기
                        </Btn_Rent>
                        : <Btn_Rent 
                            disabled='true'
                            bgColor='#A6A6A6'>
                            대여불가
                        </Btn_Rent>
                        }
                    </FlexBox_Column>
                </StuffInfo>
                    : <Text_Blank>원하시는 대여품을 검색해주십시오</Text_Blank>}

            </SecondBox>
        </MainBox>
    </Wrapper>
}
export default Apply;