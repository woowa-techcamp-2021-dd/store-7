import styled from "styled-components";

import Section from "../../Section";

const UserInfo = () => {
  return (
    <Wrapper>
      <Section
        title="회원정보 변경"
        descrition="회원 정보를 변경/수정할 수 있습니다."
        lineType="long1"
      >
        <div>회원정보 변경 </div>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default UserInfo;
