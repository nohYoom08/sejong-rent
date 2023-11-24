import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styled from 'styled-components';

import Modal_Search_Auth from '../componentes/Modal_Search_Auth';
import Modal_Add_Auth from '../componentes/Modal_Add_Auth';
import Signed_In from '../componentes/Signed_In';
import ImageRevise from '../componentes/ImageRevise';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import backpage from '../images/🦆 icon _arrow back.svg';
import search from '../images/🦆 icon _search.svg';
import charger_lenova from '../images/Lenova.jpg';



function Auth_Stuff() {
    let auth_start = true;
    useEffect(() => {
        if (auth_start) {
            Signed_In();
            auth_start = false;
        }
    }, []);


    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [itemManage, setItemManage] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [stuffCnt, setStuffCnt] = useState(3);
    const [imageName, setImageName] = useState("");
    const [imageUrlUpload, setImageUrlUpload] = useState("");

    const onClick_modalSearch = () => {
        setIsOpenSearch(true);
    }
    const onClick_modalAdd = () => {
        setIsOpenAdd(true);
    }
    const onClick_revise = () => {
        let result = window.confirm('해당 품목을 작성하신 내용으로 수정하시겠습니까?');
        if (result) {
            alert("해당 품목의 수정이 완료되었습니다");
            window.location.href = '/auth_stuff';
        }
    }
    const onClick_delete = () => {
        let result = window.confirm('해당 품목을 정말 삭제하시겠습니까?');
        if (result) {
            alert("해당 품목은 삭제되었습니다");
            window.location.href = '/auth_stuff';
        }
    }
    return <Wrapper>
        <Sejong></Sejong>
        <Link to='/auth_home' style={{ textDecoration: 'none' }}>
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
                <Link to='/auth_home' style={{
                    textDecoration: 'none',
                    alignSelf: 'flex-start'
                }}>
                    <BackPage>
                        <Icon src={backpage}></Icon>
                        이전 페이지
                    </BackPage>
                </Link>
                <FlexBox_Row style={{
                    width: '320px',
                    marginBottom: '8px',
                    justifyContent: 'space-evenly'
                }}>
                    <SearchBar>
                        <img src={search}></img>
                        <div onClick={onClick_modalSearch}>대여품 검색</div>
                    </SearchBar>
                    <AddBtn onClick={onClick_modalAdd}>추가 +</AddBtn>

                </FlexBox_Row>
                <Line></Line>
                {isOpenSearch &&
                    <Modal_Search_Auth
                        setIsOpenSearch={setIsOpenSearch}
                        setItemManage={setItemManage}
                        setIsSelected={setIsSelected}
                    ></Modal_Search_Auth>}
                {isSelected ? <StuffInfo>
                    <FlexBox_Row style={{
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                        <h1>
                            •품명
                        </h1>
                        <input placeholder={itemManage}></input>
                    </FlexBox_Row>
                    <FlexBox_Row style={{
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                        <h1>
                            •총 수량
                        </h1>
                        <input type='number'
                            placeholder={stuffCnt}></input>
                    </FlexBox_Row>
                    <FlexBox_Row>
                        <ImageRevise
                            setImageName={setImageName}
                            setImageUrlUpload={setImageUrlUpload}>
                        </ImageRevise>
                    </FlexBox_Row>
                    <FlexBox_Row style={{ alignSelf: 'center' }}>
                        <Btn_Manage
                            onClick={onClick_revise}
                            bgColor='#D7556C'>
                            수정하기
                        </Btn_Manage>
                        <Btn_Manage
                            onClick={onClick_delete}
                            bgColor='#333394'>
                            삭제하기
                        </Btn_Manage>
                    </FlexBox_Row>
                </StuffInfo>
                    : <Text_Blank>
                        수정 및 삭제를 원하시는 <br></br>대여품을 검색해주십시오
                    </Text_Blank>}
            </SecondBox>
            {isOpenAdd &&
                <Modal_Add_Auth setIsOpenAdd={setIsOpenAdd}/>}
        </MainBox>
    </Wrapper>
}
export default Auth_Stuff;


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
width:1080px;
height:1080px;
//뷰포트 크기조정을 통해서 이미지 위치조정 가능
opacity:20%;

z-index:-1;

background-image:url(${forever});
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

const Line = styled.div`
width: 280px;
height: 1px;
background: #BF3333;

margin-bottom:8px;
`;

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

padding:24px 0px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:48px;
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
align-items:center;

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
margin-right:4px;

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

const AddBtn = styled.button`
width: 54px;
height: 25px;
flex-shrink: 0;

border-radius: 10px;
background: #9E93BC;
border:none;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 150% */
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

    margin-right:8px;
}
h1:nth-child(3){
    margin-bottom:8px;
}
span{
    color: rgb(50,50,50);
}
img{
    align-self:center;
    width:300px;
    height:300px;
    border:4px solid rgb(200,200,200);
    border-radius:10%;

    margin-bottom:24px;
}
input{
    width: 196px;
height: 28px;
flex-shrink: 0;

    border-radius: 10px;
border: 1px solid #FF6A7F;
background: #FFF;

color: rgb(50,50,50);
    text-align: left;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */

    margin-bottom:0;

    padding-left:8px;
}
${AddBtn}{
    width:80px;
}
`;
const Btn_Manage = styled.button`
align-self:center;
width: 120px;
height: 48px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: ${(props) => props.bgColor};
margin-right:8px;
margin-bottom:12px;
cursor: pointer;

color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 90% */
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







//MainBox 끝//
//MainBox 끝//
//MainBox 끝//