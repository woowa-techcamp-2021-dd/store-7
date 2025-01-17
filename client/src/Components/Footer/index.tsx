import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <img
        role="img"
        width="100"
        src="https://store.baemin.com/data/skin/front/udweb_C/img/banner/da16d1162f6d783169f2c8c6556c2d8b_50794.png"
      />

      <div>
        <b>
          <span>공지사항</span>
          <span>1:1문의</span>
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>판매처 안내</span>
        </b>

        <p>
          {`상호 : (주)우아한형제들 | 대표 : 김범준 | 사업자등록번호 : 120-87-65763 | 통신판매업신고번호 : 2012-서울송파-0515 | [사업자정보확인]
          팩스번호 : 050-605-0041 | 메일 : baemin_store@woowahan.com | 배민문방구 인스타그램 : @baemin_store
          주소 : 서울특별시 송파구 위례성대로 2 장은빌딩 | 호스팅제공 : 엔에이치엔고도(주)
          © Woowa Brothers Corp. All right Reserved`}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 8rem;
  background-color: ${({ theme }) => theme.color.light_grey1};
  ${({ theme }) => theme.flexCenter};
  gap: 10rem;
  img {
    margin-bottom: 5rem;
  }
  b {
    ${({ theme }) => theme.font.medium};
    display: flex;
    gap: 5rem;
    font-weight: 700;
  }
  p {
    ${({ theme }) => theme.font.small};
    margin-top: 3rem;
    line-height: 2rem;
    white-space: pre-line;
    color: ${({ theme }) => theme.color.grey1};
  }
`;

export default Footer;
