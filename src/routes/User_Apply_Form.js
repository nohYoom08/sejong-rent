import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styled from 'styled-components';

import sejong from '../images/sejong.png';
import forever from '../images/forever.png';
import backpage from '../images/🦆 icon _arrow back.svg';
import checked from '../images/checked.svg';
import unchecked from '../images/unchecked.svg';

import axios from 'axios';


function User_Apply_Form() {


    const [numList, setNumList] = useState([]);
    const [studentNoCard_check, setstudentNoCard_check] = useState(false);
    const [bill_check, setBill_check] = useState(false);
    const [all_check, setAll_Check] = useState(false);
    const [studentNoCard_checkImg, setstudentNoCard_checkImg] = useState(unchecked);
    const [bill_checkImg, setBill_checkImg] = useState(unchecked);
    const [submitPossible, setSubmitPossible] = useState(false);
    const [itemInfo, setItemInfo] = useState(4);

    const [formValues, setFormValues] = useState({
        studentNo: '',
        cnt: '1',
        name: '',
        password: ''
    })

    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const onClick_studentNoCheck = () => {
        if (studentNoCard_check) {
            setstudentNoCard_check(false);
            setstudentNoCard_checkImg(unchecked);
        } else {
            setstudentNoCard_check(true);
            setstudentNoCard_checkImg(checked);
        }
    }
    const onClick_billCheck = () => {
        if (bill_check) {
            setBill_check(false);
            setBill_checkImg(unchecked);
        } else {
            setBill_check(true);
            setBill_checkImg(checked);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();

        const result = window.confirm('작성해주신 정보로 대여신청을 하시겠습니까?');
        if (result) {
            const itemId = Number(itemInfo.id);
            const studentNo = formValues.studentNo;
            const cnt = formValues.cnt;
            const name = formValues.name;
            const password = formValues.password;

            const APPLYURL = `http://27.96.131.106:8080/item/${itemId}`;
            // const date = new Date();
            // const year = date.getFullYear().toString().padStart(4, '0');
            // const month = (date.getMonth() + 1).toString().padStart(2, '0');
            // const day = date.getDay().toString().padStart(2, '0');
            // const dateApply = `${year}-${month}-${day}`;

            console.log('will be posted:',
                itemId, itemInfo.itemName, name, password, studentNo, cnt);
            try {
                const response = await axios.post(APPLYURL, {
                    name, password, studentNo, cnt
                })
                if (response.data) {
                    alert("신청이 성공적으로 완료되었습니다!");
                    console.log('succeded', response.data);
                    sessionStorage.clear();
                    window.location.href = '/apply';
                }
                console.log('post failed ;(');
            } catch (error) {
                console.log('post failed error', error);
            }
        }
    }



    useEffect(() => {
        const storedItemInfo = JSON.parse(sessionStorage.getItem('itemInfo'));
        console.log('storedItemInfo', storedItemInfo);
        setItemInfo(storedItemInfo);
    }, [])
    useEffect(() => {
        if (numList.length == 0)
            for (let i = 0; i < itemInfo.cnt; i++)
                numList.push(i + 1);
    }, [itemInfo])
    useEffect(() => {
        if (studentNoCard_check && bill_check) {
            setAll_Check(true);
        } else {
            setAll_Check(false);
        }
    }, [studentNoCard_check, bill_check])

    useEffect(() => {
        console.log(formValues);
        const allInputFilled =
            Object.values(formValues).every((value) => (value !== ""));
        //every는 모든 원소가 화살표함수를 만족하는지에 따른 true or false 반환

        console.log('all_check', all_check);
        console.log('allInputFilled', allInputFilled);
        if (all_check && allInputFilled)
            setSubmitPossible(true);
        else
            setSubmitPossible(false);
    }, [all_check, Object.values(formValues)])


    useEffect(() => {
        console.log('formValues check! : ', formValues);
    }, [formValues])
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
            <FormBox onSubmit={onSubmit}>
                <Link to='/apply' style={{
                    textDecoration: 'none',
                    alignSelf: 'flex-start'
                }}>
                    <BackPage>
                        <Icon src={backpage}></Icon>
                        이전 페이지
                    </BackPage>
                </Link>
                <InputDiv>
                    <p>대여품명</p>
                    <input style={{
                        width: '280px',
                        height: '32px'
                    }}
                        name='item'
                        value={itemInfo.itemName}
                        disabled={true}
                    >
                    </input>
                </InputDiv>
                <FlexBox_Row>
                    <InputDiv>
                        <p>학번</p>
                        <input style={{
                            width: '180px',
                            height: '32px',
                            marginRight: '20px'
                        }}
                            type='number'
                            name='studentNo'
                            value={formValues.studentNo}
                            onChange={onChange}
                        ></input>
                    </InputDiv>
                    <InputDiv>
                        <p>대여수량</p>
                        <select style={{
                            width: '80px',
                            height: '36px'
                        }}
                            name='cnt'
                            value={formValues.cnt}
                            onChange={onChange}
                        >
                            {numList.map((item, key) => {
                                return <option key={key} value={item}>
                                    {item}
                                </option>
                            })}
                        </select>
                    </InputDiv>
                </FlexBox_Row>
                <FlexBox_Row>
                    <InputDiv>
                        <p>이름</p>
                        <input style={{
                            width: '100px',
                            height: '32px',
                            marginRight: '20px'
                        }}
                            name='name'
                            value={formValues.name}
                            onChange={onChange}
                        ></input>
                    </InputDiv>
                    <InputDiv>
                        <p>비밀번호</p>
                        <input style={{
                            width: '140px',
                            height: '32px'
                        }}
                            type='password'
                            name='password'
                            value={formValues.password}
                            onChange={onChange}
                        ></input>
                    </InputDiv>
                </FlexBox_Row>

                <Agreement style={{ marginBottom: '-8px' }}>
                    <p>대여물품을 받아가실 때 학생회실에서
                        <br></br>
                        <Underline>학생증과 신분증</Underline>을 꼭 제시해주셔야 합니다.
                    </p>
                    <img onClick={onClick_studentNoCheck} src={studentNoCard_checkImg}></img>
                </Agreement>
                <Agreement style={{ marginBottom: '24px' }}>
                    <p>대여물품 <Underline>분실 및 훼손</Underline>시 소프트웨어융합대학 학생회
                        <br></br>
                        ‘영원' 측에서는 해당 이용자에게 <Underline>배상을 청구</Underline>할 수 있습니다.
                    </p>
                    <img onClick={onClick_billCheck} src={bill_checkImg}></img>
                </Agreement>

                {submitPossible ?
                    <Btn_O type='submit'>대여 신청하기</Btn_O> :
                    <Btn_X disabled={true}>대여 신청하기</Btn_X>}
            </FormBox>
        </MainBox>
    </Wrapper>
}
export default User_Apply_Form;

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

const FormBox = styled.form`
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

padding:8px 8px 28px 8px;
`;

const BackPage = styled.div`
width:65px;
height:16px;
background-color:rgb(230,230,230);
border-radius:8px;

margin-top:8px;
margin-left:8px;
margin-bottom:24px;

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
    color: #BF3333;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
margin:0;
}
input{
    width: 240px;
height: 40px;
flex-shrink: 0;

border-radius: 8px;
border: 1px solid rgba(194, 15, 47, 0.71);
background: #FFF;

color: #8A8A8A;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 60px; /* 300% */

padding-left:12px;
}
select{
    width: 240px;
height: 40px;
flex-shrink: 0;

border-radius: 8px;
border: 1px solid rgba(194, 15, 47, 0.71);
background: #FFF;

color: #8A8A8A;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 60px; /* 300% */

padding-left:12px;
}
`;


const Agreement = styled.div`
width:300px;
display:flex;
justify-content:space-between;
align-items:center;
p{
text-align:left;
color: #080808;
font-size:10px;
font-style: normal;
font-weight: 500;
}
img{
width: 28px;
height: 28px;
flex-shrink: 0;
cursor: pointer;
}
`;

const Btn_X = styled.button`
width: 240px;
height: 56px;
flex-shrink: 0;
background-color: #B0B0B0;
border-radius:12px;
border:0;

color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 90% */
`;
const Btn_O = styled.button`
width: 240px;
height: 56px;
flex-shrink: 0;
background-color: #FF8FA3;
border-radius:12px;
border:0;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 90% */
`;

const Underline = styled.span`
color: #C20F2F;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 20px;
text-decoration-line: underline;
`;




//MainBox 끝//
//MainBox 끝//
//MainBox 끝//
