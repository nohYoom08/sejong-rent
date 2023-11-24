import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styled from 'styled-components';

import Modal_Apply from '../componentes/Modal_SearchStuff';
import Signed_In from '../componentes/Signed_In';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import backpage from '../images/🦆 icon _arrow back.svg';
import search from '../images/🦆 icon _search.svg';

import axios from "axios";




function Apply() {
    let auth_start = true;
    useEffect(() => {
        if (auth_start) {
            Signed_In();
            auth_start = false;
        }
    }, []);

    const FETCHURL = 'http://27.96.131.106:8080/admin/rentals';
    const SEARCHURL = 'http://27.96.131.106:8080/';

    const stuffCnt = 1;
    const [dataList, setDataList] = useState([]);
    const [fetched, setFetched] = useState(false);

    const fetchDataList = async () => {
        try {
            const response = await axios.get(FETCHURL);
            if (response.data) {
                console.log('fetch success!', response.data);
                setDataList(response.data);
                setFetched(true);
            } else {
                console.log('fetch failed');
            }
        } catch (error) {
            console.log('fetch error:', error);
        }
    }

    const onClick_accept = async (event) => {
        event.preventDefault();
        const rentalId = event.target.value;

        const result = window.confirm(
            `대여신청 ID #${rentalId}의 신청내역을 수락하시겠습니까?`);

        if (result) {
            console.log('rentalId will be axiosed', rentalId);
            try {
                const ACCEPTURL =
                    `http://27.96.131.106:8080/admin/rental/${rentalId}`
                const response = await axios.post(ACCEPTURL);

                console.log('response:', response);
                if (response.data === "대여 완료") {
                    console.log('accept success :', response.data);
                    alert(`#${rentalId}의 대여신청을 성공적으로 수락하였습니다.`);
                    fetchDataList();
                } else {
                    console.log('accept fail');
                }
            } catch (error) {
                console.log('accept error', error)
            }
        }
    }

    const onClick_returned = async (event) => {
        event.preventDefault();
        const rentalId = event.target.value;

        const result = window.confirm(
            `대여신청 ID #${rentalId}의 대여내역을 '반납 완료' 처리하시겠습니까?`);

        if (result) {
            console.log('rentalId will be axiosed', rentalId);
            try {
                const RETURNEDURL =
                    `http://27.96.131.106:8080/admin/rental?rentalId=${rentalId}`
                const response = await axios.patch(RETURNEDURL);

                console.log('response:', response);
                if (response.data === "반납 완료") {
                    console.log('returned success :', response.data);
                    alert(`#${rentalId}의 반납처리를 성공적으로 수락하였습니다.`);
                    fetchDataList();
                } else {
                    console.log('returned fail');
                }
            } catch (error) {
                console.log('returned error', error)
            }
        }
    }

    const onClick_delete = async (event) => {
        event.preventDefault();
        const rentalId = event.target.value;

        const result = window.confirm(
            `대여신청 ID #${rentalId}의 신청내역을 삭제하시겠습니까?`);

        if (result) {
            console.log('rentalId will be axiosed', rentalId);
            try {
                const DELETEURL =
                    `http://27.96.131.106:8080/admin/rental/${rentalId}`
                const response = await axios.delete(DELETEURL);

                console.log('response:', response);
                if (response.data === "삭제 완료") {
                    console.log('delete success :', response.data);
                    alert(`#${rentalId}의 대여신청내역을 성공적으로 삭제하였습니다.`);
                    fetchDataList();
                } else {
                    console.log('delte fail');
                }
            } catch (error) {
                console.log('delete error', error)
            }
        }
    }
    const onClick_search = async (event) => {
        event.preventDefault();

    };

    useEffect(() => { fetchDataList() }, []);
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
                <Link to='/auth_home' style={{ textDecoration: 'none' }}>
                    <BackPage>
                        <Icon src={backpage}></Icon>
                        이전 페이지
                    </BackPage>
                </Link>
                <FlexBox_Row style={{ marginBottom: '8px' }}>
                    <SearchBar>
                        <img src={search}></img>
                        <input placeholder='학번/이름 또는 품명 검색'></input>
                    </SearchBar>
                    <SearchBtn onClick={onClick_search}>검색</SearchBtn>
                </FlexBox_Row>
                <TableBox>
                    <Table>
                        <thead>
                            <tr>
                                <th>학번/<br></br>이름</th>
                                <th>ID</th>
                                <th>신청<br></br>일시</th>
                                <th>품명</th>
                                <th>잔여<br></br>수량</th>
                                <th>상태</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetched && dataList.map((item, key) => (
                                <tr key={key}>
                                    <td>{item.studentNo}<br></br>
                                        {item.name}</td>
                                    <td>#{item.rentalId.toString().padStart(3, '0')}</td>
                                    <td>{item.date.slice(0, 10)}/
                                        {item.date.slice(11, 19)}</td>
                                    <td>{item.name}</td>
                                    <td>{item.cnt}</td>
                                    <td>
                                        {
                                            (item.status === "WAIT") &&
                                            <p>신청 대기</p>
                                        }
                                        {
                                            (item.status === "RENTAL") &&
                                            <p>대여중</p>
                                        }
                                        {
                                            (item.status === "RETURN") &&
                                            <p>반납 완료</p>
                                        }
                                    </td>
                                    <td>
                                        {
                                            (item.status === "WAIT") &&
                                            <Btn_Rent
                                                onClick={onClick_accept}
                                                value={item.rentalId}
                                                bgColor='#D7556C'>
                                                신청확인
                                            </Btn_Rent>
                                        }
                                        {(item.status === "RENTAL") &&
                                            <Btn_Rent 
                                                onClick={onClick_returned}
                                                value={item.rentalId}
                                                bgColor='#333394'>
                                                반납확인
                                            </Btn_Rent>
                                        }
                                        {(item.status === "RETURN") &&
                                            <Btn_Rent bgColor='#A6A6A6'
                                                onClick={onClick_delete}
                                                value={item.rentalId}>
                                                삭제하기
                                            </Btn_Rent>
                                        }

                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>20011001/<br></br>김세종</td>
                                <td>#201-01</td>
                                <td>2023.11.04/<br></br>14:03:05</td>
                                <td>충전기</td>
                                <td>{stuffCnt}</td>
                                <td>신청중</td>
                                <td>
                                    <Btn_Rent bgColor='#D7556C'>
                                        신청확인
                                    </Btn_Rent>
                                </td>
                            </tr>

                            <tr>
                                <td>20011001/<br></br>김세종</td>
                                <td>#201-01</td>
                                <td>2023.11.04/<br></br>14:03:05</td>
                                <td>충전기</td>
                                <td>{stuffCnt}</td>
                                <td>신청중</td>
                                <td>
                                    <Btn_Rent bgColor='#A6A6A6'>
                                        대여불가
                                    </Btn_Rent>
                                </td>
                            </tr>
                            <tr>
                                <td>20011001/<br></br>김세종</td>
                                <td>#201-01</td>
                                <td>2023.11.04/<br></br>14:03:05</td>
                                <td>충전기</td>
                                <td>{stuffCnt}</td>
                                <td>신청중</td>
                                <td>
                                    <Btn_Rent bgColor='#D7556C'>
                                        신청확인
                                    </Btn_Rent>
                                </td>
                            </tr>
                            <tr>
                                <td>20011001/<br></br>김세종</td>
                                <td>#201-01</td>
                                <td>2023.11.04/<br></br>14:03:05</td>
                                <td>충전기</td>
                                <td>{stuffCnt}</td>
                                <td>신청중</td>
                                <td>
                                    <Btn_Rent bgColor='#A6A6A6'>
                                        대여불가
                                    </Btn_Rent>
                                </td>
                            </tr>
                            <tr>
                                <td>20011001/<br></br>김세종</td>
                                <td>#201-01</td>
                                <td>2023.11.04/<br></br>14:03:05</td>
                                <td>충전기</td>
                                <td>{stuffCnt}</td>
                                <td>대여중</td>
                                <td>
                                    <Btn_Rent bgColor='#333394'>
                                        반납확인
                                    </Btn_Rent>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </TableBox>
            </SecondBox>
        </MainBox>
    </Wrapper>
}
export default Apply;



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
//왠진 모르겠지만 속성이 0이라도 있으면 <img src={charger_lenova}>의 맨 위의 선을 천장에 붙여주나보다
padding:0;
width:1080px;
height:1080px;
//뷰포트 크기조정을 통해서 <img src={charger_lenova}> 위치조정 가능
opacity:20%;

z-index:-1;

background-image:url(${forever});
//div에 <img src={charger_lenova}> 경로 설정하는 법(리터럴 활용)
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
//div에 <img src={charger_lenova}> 넣을때는 size필수
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
justify-content:flex-start;
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
width: 240px;
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

input{
width: 200px;
height: 20px;
color: #A6A6A6;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;

text-align:left;
border:none;
}
`;

const SearchBtn = styled.button`
width: 40px;
height: 24px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: #D7556C;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 150% */
`;

const TableBox = styled.div`
height:360px;
overflow:auto;
margin-bottom:16px;
border:1px solid gray;
border-radius:10px;
`;
//테이블 스타일 적용
const Table = styled.table`

color: #000;
text-align:center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 128.571% */
border-radius:20px;
border-collapse:collapse;   //테이블에 적용해야되는 속성(셀이 아니라)
thead{
    th{
        height:40px;
        border: 1px solid #828282;
        background: #E5E5E5;
        color: #000;
        text-align: center;
        font-style: normal;
        font-weight: 700;
        line-height: 18px; /* 128.571% */
    }
    th:first-child{
        width:80px;
    }
    th:nth-child(2){
        width:10px;
    }
    th:nth-child(3){
        width:100px;
    }
    th:nth-child(4){
        width:100px;
    }
    th:nth-child(5){
        width:100px;
    }
    th:nth-child(6){
        width:120px;
    }
    th:nth-child(7){
        width:100px;
    }
}
tbody{
    td{
        font-weight:100;
        font-size:8px;
        border: 1px solid #828282;
        background: #FFF;
    }
    img{
        width:80px;
        height:80px;
    }
}
`;
const Btn_Rent = styled.button`
width: 60px;
height: 32px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: ${(props) => props.bgColor};

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 90% */
`;
//MainBox 끝//
//MainBox 끝//
//MainBox 끝//