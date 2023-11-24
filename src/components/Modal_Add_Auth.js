import { useState, useEffect } from 'react';

import styled from 'styled-components';

import close from '../images/🦆 icon _close.svg';

import axios from 'axios';

import ImageUpload from './ImageUpload';



function Modal_Add({ setIsOpenAdd }) {

    const ADDURL = 'http://27.96.131.106:8080/admin/item';

    const [imageName,setImageName]=useState("");
    const [imageUrlUpload,setImageUrlUpload]=useState("");
    const [formValues, setFormValues] = useState({
        itemName: '',
        cnt: 1,
    })


    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onClick_close = () => {
        setIsOpenAdd(false);
    }
    
    const onClick_add = async () => {
        let result = window.confirm("작성하신 내용으로 해당 품목을 추가하시겠습니까?")
        if (result) {
            const itemName = formValues.itemName;
            const cnt = formValues.cnt; 
            //이 때 cnt는 잔여수량이 아니라 총 수량
            const image = imageUrlUpload;
            console.log('itemName,cnt,image:',
                itemName, cnt, image);

            try {
                const response = await axios.post(ADDURL,
                    { itemName, cnt, image });
                console.log('response',response);
                if (response.data === "등록완료") {
                    alert("대여품이 추가되었습니다");
                    setIsOpenAdd(false);
                    console.log('add success!');
                } else {
                    console.log('add failed ;(');
                }
            } catch (error) {
                console.log('add error ;(', error);
            }
        }
    }

    useEffect(()=>{
        console.log('data checked - named, cnt, imageName, imageUrlUpload : ',
        formValues.itemName,
        formValues.cnt,
        imageName,
        imageUrlUpload)
    },[formValues,imageName,imageUrlUpload])
    
    return <AddModal>
        <Btn_X src={close} onClick={onClick_close}></Btn_X>
        <InputDiv>
            <p>대여품명</p>
            <input style={{
                width: '280px',
                height: '32px'
            }}
                name='itemName'
                onChange={onChange}
                placeholder='새로 추가할 대여품의 이름을 입력해주십시오'>
            </input>
        </InputDiv>
        <FlexBox_Row style={{ width: '280px' }}>
            <InputDiv>
                <p>총 수량</p>
                <input style={{
                    width: '60px',
                    height: '32px',
                    marginRight: '20px'
                }}
                    placeholder={formValues.cnt}
                    name='cnt'
                    onChange={onChange}
                    type='number'></input>
            </InputDiv>
            <InputDiv>
                <FlexBox_Row style={{
                    width: '192px',
                    justifyContent: 'space-between',
                }}>
                    <p>이미지</p>
                </FlexBox_Row>
                <input style={{
                    width: '180px',
                    height: '32px'
                }}
                    value={imageName}
                    disabled={true}
                    placeholder='파일명'></input>
            </InputDiv>
        </FlexBox_Row>

        <ImageUpload
            setImageName={setImageName}
            setImageUrlUpload={setImageUrlUpload}>
        </ImageUpload>

        <Btn_Add onClick={onClick_add}>추가하기</Btn_Add>
    </AddModal>
}
export default Modal_Add;


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
const AddModal = styled.div`
position:absolute;
width: 300px;
top:10%;


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
padding-bottom:16px;
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
font-size: 14px;
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

const Btn_X = styled.img`
align-self:flex-start;

width: 36px;
height: 36px;
flex-shrink: 0;
border:none;
cursor:pointer;
`;

const Line = styled.div`
width: 280px;
height: 1px;
background: #BF3333;

margin-bottom:8px;
`;

const Btn_Add = styled.button`
width: 120px;
height: 40px;
flex-shrink: 0;

border:none;
border-radius: 10px;
background: #FF8FA3;
cursor:pointer;

color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 500;
`;