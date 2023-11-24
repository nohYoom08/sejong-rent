import React, { useState, useRef } from "react";

import styled from 'styled-components'


function ImageUpload({ setImageName, setImageUrlUpload }) {
    const [imageUrl, setImageUrl] = useState("");
    const [imgUp, setImgUp] = useState(false);

    const handleChange = (event) => {
        const image_file = event.target.files[0];
        if (image_file) {
            setImageName(image_file.name);
            setImageUrl(URL.createObjectURL(image_file));
            setImageUrlUpload(URL.createObjectURL(image_file));
            setImgUp(true);
            console.log(image_file);
            console.log("URL:", imageUrl);
        }
    };



    return (
        <FlexBox_Column>

            <ImageBoard>
                {imgUp
                    ? <PrintImage src={imageUrl}></PrintImage>
                    : <p>Image</p>}
            </ImageBoard>

            {!imgUp ?
                <label htmlFor="select">
                    <AddImage>이미지 변경</AddImage>
                    <input
                        id="select"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: "none" }}>
                    </input>
                </label>
                : <label htmlFor="revise">
                    <AddImage>수정하기</AddImage>
                    <input
                        id="revise"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: "none" }}>
                    </input>
                </label>
            }
        </FlexBox_Column>
    );
};

export default ImageUpload;



const FlexBox_Column = styled.div`
margin-bottom:20px;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const AddImage = styled.div`
width: 80px;
height: 30px;
flex-shrink: 0;

border-radius: 8px;
background: #9E93BC;
border:none;
margin-bottom:4px;
cursor:pointer;

color: #FFF;
font-size: 12px;
font-style: normal;
font-weight: 400;

display:flex;
justify-content:center;
align-items:center;
padding:2px;
`;

const ImageBoard = styled.div`
width:280px;
height:200px;
margin-bottom:8px;
background-color:rgb(235,235,235);

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:4px;

border-radius: 8px;
border: 1px solid rgba(194, 15, 47, 0.71);

p{
    font-size:24px;
    color:rgb(150,150,150);
}
`;

const PrintImage = styled.img`
width:280px;
height:200px;
object-fit:contain;
`;
//부모요소에 맞추면서 이미지 업로드하는 법
//부모요소와 width, height 맞추고 object-fit 사용