import styled from "styled-components";
import CustomInput from "../CreatePage/components/CreateInput";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const EnterPage = () => {
  const params = useParams();
  const groupId = params.id;
  const navigate = useNavigate();

  const EnterHandler = async () => {
    try {
      const response = await axios.post(
        "http://52.78.130.4:8080/api/v1/member",
        {
          nickName: nickName,
          groupId: groupId,
        }
      );
      console.log(response);
      navigate(`/${response.data.id}/schedule`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 닉네임
  const [nickName, setNickName] = useState("");
  // console.log("닉네임", nickName)
  // 바캉스 비밀번호
  const [vacancePassword, setVacancePassword] = useState("");
  // console.log("바캉스 비밀번호", vacancePassword)
  // 바캉스 비밀번호 확인
  const [vacancePasswordConfirm, setVacancePasswordConfirm] = useState("");
  // console.log("바캉스 비밀번호 확인", vacancePasswordConfirm)

  // 모든 입력 상태가 비어 있지 않을 때 true로 설정
  const isButtonActive =
    nickName !== "" && vacancePassword !== "" && vacancePasswordConfirm !== "";

  // 닉네임 유효성 검사
  const maxNickNameLength = 2;

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (value.length > maxNickNameLength) {
      setNickName(value.slice(0, maxNickNameLength));
    } else if (pattern_kor.test(value)) {
      setNickName(value);
    }
  };

  return (
    <StyledCreatePage>
      <img
        src="/assets/image/img-enter.png"
        style={{ width: "94px", height: "180px" }}
      />
      <InputContainer>
        {/* 닉네임 */}
        <CustomInput
          placeholderText="Your Name"
          backgroundImageURL="/assets/icon/user.svg"
          value={nickName}
          // onChange={(e) => setNickName(e.target.value)}
          onChange={handleNickNameChange}
        />
        {/* 바캉스 비밀번호 */}
        <CustomInput
          placeholderText="Password"
          backgroundImageURL="/assets/icon/password.svg"
          value={vacancePassword}
          onChange={(e) => setVacancePassword(e.target.value)}
        />
        {/* 바캉스 비밀번호 확인*/}
        <CustomInput
          placeholderText="Password Confirm"
          backgroundImageURL="/assets/icon/password.svg"
          value={vacancePasswordConfirm}
          onChange={(e) => setVacancePasswordConfirm(e.target.value)}
        />
      </InputContainer>
      <EnterButton
        onClick={() => {
          if (isButtonActive) {
            EnterHandler();
          }
        }}
      >
        바캉스 입장하기
      </EnterButton>
    </StyledCreatePage>
  );
};

const StyledCreatePage = styled.div`
  min-width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 73px;
  margin-bottom: 50px;
`;

const EnterButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 8px;
  background: #000;

  color: #fff;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default EnterPage;
