import { useState, useEffect } from 'react';

import styled from 'styled-components';

import close from '../images/🦆 icon _close.svg';

import axios from 'axios';


function Modal_SearchStuff({ setIsOpen, setItemId, setIsSelected }) {
   
    const STUFFURL = 'http://27.96.131.106:8080/items';

    const [stuffList, setStuffList] = useState([]);
    const [totalPages,setTotalPages]=useState(0);
    const [numList, setNumList] = useState([]);
    const [currentNum, setCurrentNum] = useState(1);
    const [fetched, setFetched] = useState(false);



        //page나누는 아주 좋은 slice 활용
    /*const [entirePages, setEntirePages] = useState(0);
    얘도 만들지마 set은 항상 늦는다고 생각*/

    // const [paged, setPaged] = useState(false);
    //     console.log('stuffList!, fetched',stuffList,fetched);
    //         if (!sliced) {
    //             const size = 10;
    //             for (let i = 0; i < stuffList.length; i += size)
    //                 stuffPages.push(stuffList.slice(i, i + size));
    //             setSliced(true);
    //         }
    //         if (!paged) {
    //             for (let i = 0; i < stuffPages.length; i++)
    //                 pageNum.push(i + 1);
    //             setPaged(true);
    //         }

    //page나누기 (이건 useEffect쓰면 안 됨. map에서 렌더링 차이남)
    //so, useEffect가 아닌 if문으로 해줘야 함. react문법으로 접근X


    const fetchData = async () => {
        const page = currentNum-1;  //백에선 page가 0부터 시작하므로
        const size = 10;
        console.log('page,size:',page,size);
        try {
            const response = await axios.get(STUFFURL,
                { params: { page, size } });
            if (response.data) {
                console.log('fetch success!:', response.data);
                setStuffList(response.data.items);
                if(response.data.pageInfo.totalPages){
                const totalLength = response.data.pageInfo.totalPages;
                setTotalPages(totalLength);
                if(numList.length<totalLength)          
                // useEffect 통해서 아래 루프문 실행하려고 했는데 로컬에선 잘 되던게
                // 배포된 사이트에선 인식이 안 됨. 무지성 useState useEffect는 문제가 발생할 수도 있나봄
                    for(let i=0;i<totalLength;i++)
                        numList.push(i+1);
                }
                console.log('numList set!',numList);
                setFetched(true);
            }
        } catch (error) {
            console.log('fetch failed ;(', error);
        }
    }


    const onClick_close = () => {
        setIsOpen(false);
    }
    const onClick_currentPage = (event) => {
        event.preventDefault();
        setCurrentNum(event.target.value);
    }
    const onClick_Stuff = (event) => {
        event.preventDefault();
        setItemId(event.target.value);
        setIsSelected(true);
        setIsOpen(false);
    }


    //JS에서 중간에 오류나면 useEffect 최초 실행도 못하고 닫힐 수 있음
    //useEffect는 무조건 한 번 실행되는게 맞다
    useEffect(()=>{fetchData()},[currentNum])

    return <SearchModal>
        <Btn_X src={close} onClick={onClick_close}></Btn_X>
        <Select>원하시는 대여품을 선택해주세요</Select>
        <Line></Line>

        {fetched &&
            <StuffBox style={{ marginBottom: '4px' }}>
                {stuffList.map((item, key) =>
                    <Stuff
                        onClick={onClick_Stuff}
                        value={item.id}
                        key={key}>
                        {item.itemName}
                    </Stuff>

                )
                }
            </StuffBox>
        }
        <Line></Line>
        <FlexBox_Row style={{ marginBottom: '8px' }}>
            {numList.map((item, key) => {
                if (Number(item) === Number(currentNum)) {
                    return <PageNum_Selected key={key}
                        value={item}>{item}
                    </PageNum_Selected>
                }
                else {
                    return <PageNum key={key}
                        onClick={onClick_currentPage}
                        value={item}>{item}
                    </PageNum>
                }
            })}
        </FlexBox_Row>
    </SearchModal>
}
export default Modal_SearchStuff;


const FlexBox_Row = styled.div`
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

const StuffBox=styled.div`
width:280px;

display:grid;
grid-template-columns:1fr 1fr;
grid-template-rows:repeat(5,40px);
`;

const SearchModal = styled.div`
position:absolute;
width: 300px;
top:4px;

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

cursor:pointer;
`;

const Select = styled.p`
color: rgb(120,120,120);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
margin:0;
`;

const Line = styled.div`
width: 280px;
height: 1px;
background: #BF3333;

margin-bottom:8px;
`;

const Stuff = styled.button`
width: 128px;
height: 36px;
flex-shrink: 0;
border:none;
border-radius: 10px;
background: #D9D9D9;

color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;
margin-right:4px;
margin-bottom:4px;
cursor:pointer;

padding-left:4px;
display:flex;
justify-content:center;
align-items:center;

&:hover{
    border:2px solid rgb(256,180,180);
}
input{
    width: 18px;
height: 20px;
flex-shrink: 0;
background: #FFF;
border:none;
}
`;

const PageNum = styled.button`
border:none;
border-radius:16px;
background:rgb(256,240,240);
margin-right:4px;

color: rgb(150,100,100);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;

cursor:pointer;
`;

const PageNum_Selected = styled.button`
border:2px solid rgb(256,180,180);
border-radius:16px;
background:rgb(256,240,240);
margin-right:4px;

color: rgb(120,0,0);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 1000;

cursor:pointer;
`;

const Btn_Search = styled.button`
width: 80px;
height: 30px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: #FF8FA3;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;

cursor:pointer;
`;