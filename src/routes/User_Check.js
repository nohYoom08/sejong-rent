import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom";

import styled from 'styled-components';

import Modal_Apply from '../components/Modal_SearchStuff';
import BannerBox from '../components/BannerBox';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import backpage from '../images/🦆 icon _arrow back.svg';
import search from '../images/🦆 icon _search.svg';
import charger_lenova from '../images/Lenova.jpg';

import axios from 'axios';

function User_Check() {
    const navigate = useNavigate();

    const [stuffCnt,setStuffCnt]=useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearched,setIsSearched]=useState(false);
    const [dataList,setDataList]=useState([]);
    const [formValues,setFormValues]= useState({
        studentNo:"",
        password:"",
    })

    const onChange=(event)=>{
        event.preventDefault();
        const {name,value}=event.target;
        setFormValues((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const onClick_searched = async() =>{
        const SEARCHURL = 'http://27.96.131.106:8080/rentals';
        const studentNo = formValues.studentNo;
        const password=formValues.password;

        setIsSearched(false);
        try{
            console.log('will be axios-studentNo,password:',studentNo,password);
            const response = await axios.post(SEARCHURL,
            {studentNo,password});
            console.log('response',response);
            if(response.data.length!==0){
                console.log('searchData succeed!',response.data);
                setDataList(response.data);
                setIsSearched(true);
            }else{
                alert("해당 학번 및 비밀번호와 일치하는 신청내역이 없습니다!")
                console.log('searching fail');
            }
        }catch(error){
            console.log('seraching error ;(',error);
        }
    }


    const onClick_cancle = async(event)=>{
        const result = window.confirm("해당 신청내역을 삭제하시겠습니까?");
        if (result){
        event.preventDefault();
        const rentalId = event.target.value;
        const DELETEURL = `http://27.96.131.106:8080/rental/${rentalId}`;

        try{
            const response = await axios.delete(DELETEURL);

            console.log('response:',response);
            if(response.data){
                console.log('delete success!',response.data);
                alert("삭제를 성공적으로 완료했습니다!")
            }else{
                console.log('delete fail')
            }
        }catch(error){
            console.log('delete error',error);
        }
    }
    }

    const onClick_revise = async(rentalId,cnt,limitCnt)=>{  //뺄지 말지 고민

        const REVISEURL = `http://27.96.131.106:8080/rental/${rentalId}`;

        const result1 = window.prompt("원하는 대여 수량을 작성해주십시오");
        if(result1<=(cnt+limitCnt) && result1){
            const result2 = window.confirm("대여 수량을 변경하시겠습니까?");
            if(result2){
                const name = formValues.name;
                const password=formValues.password;
                const studentNo=formValues.studentNo;
                const cnt = result1;
                try{
                    console.log('will be axios - name,password,studentNo,cnt:',
                    name,password,studentNo,cnt);
                    const response = await axios.patch(REVISEURL,
                        {name,password,studentNo,cnt});
                    if(response.data){
                        console.log('revise success!',response.data);
                        alert("대여수량을 성공적으로 수정하였습니다!");
                    }else{
                        alert(`대여수량 수정에 실패하였습니다.
사유 : ${response.data}`)
                    }
                }catch(error){
                    console.log('revise failed',error);
                }
            }
        }else if(result1){
            alert("요청하시려는 수량이 잔여수량보다 많습니다!");
        }
    }

    const onClick_impossible = () => {
        alert(`대여품을 수납하거나 반납하신 이후에는 신청내역 수정 및 취소를 하실 수 없습니다.
* 반납 이후 내역삭제는 학생회에서 처리합니다 *`)
    }

    useEffect(()=>{
        if(dataList.length !==0) 
            setIsSearched(true)
        else
            setIsSearched(false);},[dataList]);
    useEffect(()=>{
        console.log('formValues check',formValues)},[formValues])

    return <Wrapper>
        <Sejong></Sejong>
        <BannerBox></BannerBox>
        <MainBox>
            <SecondBox>
                <Link to='/' style={{
                    textDecoration: 'none',
                    alignSelf: 'flex-start'
                }}>
                    <BackPage>
                        <Icon src={backpage}></Icon>
                        이전 페이지
                    </BackPage>
                </Link>
                <FlexBox_Row>
                    <SearchBar>
                        <img src={search}></img>
                        <input 
                        onChange={onChange}
                        placeholder='학번 입력'
                        name='studentNo'/>
                    </SearchBar>
                    <SearchBar>
                        <img src={search}></img>
                        <input 
                        onChange={onChange}
                        type='password' 
                        name = 'password'
                        placeholder='비밀번호 입력'/>
                    </SearchBar>
                    <SearchBtn onClick={onClick_searched}>검색</SearchBtn>
                </FlexBox_Row>

                <Line></Line>
                {isSearched ? <TableBox>
                    <Table>
                        <thead>
                            <tr>
                                <th>품명</th>
                                <th>이미지</th>
                                <th>대여<br></br>수량</th>
                                <th>잔여<br></br>수량</th>
                                <th>상태</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((item,key)=>(
                                <tr key={key}>
                                    <td>{item.itemName}</td>
                                    <td><img src={item.url}/></td>
                                    <td>{item.cnt}</td>
                                    {/* 대여수량 */}
                                    <td>{item.limitCnt}</td>
                                    {/* 잔여수량 */}
                                    {item.status==="WAIT" && <td>신청<br></br>대기</td>}
                                    {item.status==="RENTAL" && <td>대여중</td>}
                                    {item.status==="RETURN" && <td>반납<br></br>완료</td>}
                                    <td>
                                    {
                                    item.status==="WAIT" && <Btn_Rent 
                                    value={item.rentalId}
                                    onClick={onClick_cancle}
                                    bgColor='#D7556C'>
                                        대여신청<br></br>취소하기
                                    </Btn_Rent>
                                    }
                                    {
                                    item.status==="WAIT" && <Btn_Rent 
                                    value={item.rentalId}
                                    onClick={()=>{
                                        onClick_revise(
                                            item.rentalId,
                                            item.cnt,
                                            item.limitCnt)}}
                                    bgColor='#333394'>
                                        대여수량<br></br>수정하기
                                    </Btn_Rent>
                                    }
                                    {
                                    (item.status==="RENTAL" ||
                                    item.status==="RETURN") &&
                                    <Btn_Rent 
                                    value={item.rentalId}
                                    onClick={onClick_impossible}
                                    bgColor='rgb(150,150,150)'>
                                        대여수정/<br></br>취소불가
                                    </Btn_Rent>
                                    }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableBox>
                : <Text_Blank>
                    확인 및 수정을 원하시는 대여내역의 학번과 비밀번호를 입력해주세요
                </Text_Blank>}
            </SecondBox>
        </MainBox>
    </Wrapper>
}
export default User_Check;



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
width: 120px;
height: 24px;
flex-shrink: 0;

border-radius: 10px;
border: 1px solid #FF6A7F;
background: #FFF;
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

input{
width: 80px;
height: 18px;
color: #A6A6A6;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 125% */

text-align:left;
border:none;
}
`;

const SearchBtn = styled.button`
width: 48px;
height: 24px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: #D7556C;
margin-bottom:8px;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
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
const Line = styled.div`
width: 280px;
height: 1px;
background: #BF3333;
margin-bottom:12px;
`;



const TableBox = styled.div`
width:100%;
height:360px;
overflow:auto;
margin-bottom:16px;
`;
//테이블 스타일 적용
const Table = styled.table`
width:100%;

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
        width:20%;
    }
    th:nth-child(2){
        width:30%;
    }
    th:nth-child(3){
        width:10%;
    }
    th:nth-child(4){
        width:10%;
    }
    th:nth-child(5){
        width:10%;
    }
    th:nth-child(6){
        width:20%;
    }
}
tbody{
    td{
        font-weight:100;
        font-size:10px;
        border: 1px solid #828282;
        background: #FFF;
    }
    td:nth-child(3){
        font-size:12px;
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
margin-bottom:4px;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 10px;
font-style: normal;
font-weight: 400;

cursor:pointer;
`;
const ImpossibleText = styled.p`
color:rgb(100,100,100);
cursor:pointer;
`;


//MainBox 끝//
//MainBox 끝//
//MainBox 끝//
