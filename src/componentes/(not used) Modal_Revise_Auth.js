import { useState, useEffect } from 'react';

import styled from 'styled-components';

import close from '../images/🦆 icon _close.svg';


function Modal_Apply({ setIsOpen }) {
    const [stuffList, setStuffList] = useState([
        '(레노버) 노트북 충전기',
        '(LG) 노트북 충전기',
        '(삼성) 노트북 충전기',
        '(C타입) 노트북 충전기',
        '(샤오미) 보조배터리',
        '(C to 8) 젠더',
        '(5 to 8) 젠더',
        '일회용 샴푸',
        '일회용 린스',
        '일회용 바디워시',
        '일회용 칫솔',
        '공학용 계산기',
        'USB',
        '고데기',
        '헤어드라이기',
        '돗자리',
        '멀티허브',
        '빔프로젝터',
        '할리갈리(보드게임)',
        '우노(보드게임)',
        '블리츠(보드게임)',
        '루미큐브(보드게임)',
        '스플렌더(보드게임)',
        '보난자(보드게임)',
        '뱅(보드게임)',
        '러브레터(보드게임)',
        '의자쌓기(보드게임)',
        '젠가(보드게임)',
        '카드게임(보드게임)',
        '다빈치코드(보드게임)',
        '거짓말탐지기(보드게임)',
        '무선마우스',
        '마우스패드',
        '(온풍)서큘레이터',
        '(냉풍)서큘레이터',
        '투명우산',
        '여성용품',
        '가습기',
        '일회용 면도기',
        '마스크',
        '구급용품',
        '거울',
    ])
    const [stuffPages, setStuffPages] = useState([]);
    const [sliced, setSliced] = useState(false);
    const [pageNum, setPageNum] = useState([]);
    const [currentPage, setCurrentPageNum] = useState(1);


    //page나누는 아주 좋은 slice 활용
    /*const [entirePages, setEntirePages] = useState(0);
    얘도 만들지마 set은 항상 늦는다고 생각*/
    const [paged, setPaged] = useState(false);
    if (!sliced) {
        const size = 10;
        for (let i = 0; i < stuffList.length; i += size)
            stuffPages.push(stuffList.slice(i, i + size));
        setSliced(true);
    }
    if (!paged) {
        for (let i = 0; i < stuffPages.length; i++)
            pageNum.push(i + 1);
        setPaged(true);
    }
    //page나누기 (이건 useEffect쓰면 안 됨. map에서 렌더링 차이남)
    //so, useEffect가 아닌 if문으로 해줘야 함. react문법으로 접근X


    const onClick_close = () => {
        setIsOpen(false);
    }
    console.log('stuffPages', stuffPages);
    console.log('pageNum', pageNum);

    return <SearchModal>
        <Btn_X src={close} onClick={onClick_close}></Btn_X>
        <FlexBox_Row>
            <SearchBar>
                <img src={search}></img>
                <input placeholder='ID 검색'></input>
            </SearchBar>
            <StuffImg></StuffImg>
            <BlueBtn>이미지 수정</BlueBtn>
        </FlexBox_Row>
        <Line></Line>
        <StuffName>(레노버) 노트북 충전기</StuffName>
        <Line></Line>
        {sliced &&
            <FlexBox_Row style={{
                marginBottom: '4px',
                overflow: 'auto'
            }}>
                {stuffPages[currentPage - 1].map((item, key) =>
                    <Stuff key={key}>
                        <FlexBox_Column>
                            <h1>ID</h1>
                            <h1>{key}</h1>
                        </FlexBox_Column>
                        <Bar></Bar>
                        <FlexBox_Column>
                            <h1>특이사항</h1>
                            <h1>케이블 중간에 피복이 살짝 벗겨짐</h1>
                        </FlexBox_Column>
                        <Bar></Bar>
                        <FlexBox_Column>
                            <button>수정</button>
                            <butoon>삭제</butoon>
                        </FlexBox_Column>
                    </Stuff>

                )
                }
            </FlexBox_Row>
        }

        <BlueBtn>물품 추가</BlueBtn>
    </SearchModal>
}
export default Modal_Apply;



const FlexBox_Row = styled.div`
width:280px;

display:flex;
justify-content:center;
align-items:center;

flex-wrap:wrap;
`;
const FlexBox_Column = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;
const SearchModal = styled.div`
position:absolute;
width: 300px;

flex-shrink: 0;

border: 2px solid gray;
border-radius:32px;
background: #FFF;
backdrop-filter: blur(25px);

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

padding:8px;
padding-bottom:8px;
`;
const Btn_X = styled.img`
align-self:flex-start;

width: 36px;
height: 36px;
flex-shrink: 0;
border:none;
`;

const StuffImg = styled.img`
width: 80px;
height: 80px;
flex-shrink: 0;
`;
const Line = styled.div`
width: 280px;
height: 1px;
background: #BF3333;

margin-bottom:8px;
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

const StuffName = styled.p`
color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 125% */
`;

const BlueBtn = styled.button`
width: 60px;
height: 20px;
flex-shrink: 0;

border-radius: 8px;
background: #9E93BC;
border:none;
margin-bottom:2px;

color: #FFF;
font-size: 12px;
font-style: normal;
font-weight: 400;
`;

const Stuff = styled.div`
width: 240px;
height: 36px;
flex-shrink: 0;
border-radius: 10px;
background: #D9D9D9;

color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;
margin-right:4px;
margin-bottom:4px;


padding-left:4px;
display:flex;
justify-content:center;
align-items:center;

h1{
    color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 125% */
}
h2{
    color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 166.667% */
}
button{
    width: 45px;
height: 29px;
flex-shrink: 0;

border-radius: 10px;
background: #D7556C;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 150% */
}
`;
const Bar = styled.div`
width: 0.5px;
height: 78px;
background: #000;
`;

const PageNum = styled.button`
border:none;
border-radius:16px;
background:rgb(256,240,240);
margin-right:4px;
cursor:pointer;

color: rgb(150,100,100);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
`;

const PageNum_Selected = styled.button`
border:2px solid rgb(256,180,180);
border-radius:16px;
background:rgb(256,240,240);
margin-right:4px;
cursor:pointer;

color: rgb(120,0,0);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 1000;
`;

const Btn_Search = styled.button`
width: 80px;
height: 30px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: #FF8FA3;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;
`;
