import styled from "styled-components";
import { NotFound as Gif, GotoHome } from "@/assets";
import { moveTo } from "@/Router";

const NotFound = () => {
  return (
    <Wrapper>
      <img src={Gif} />
      <img onClick={() => moveTo("/")} className="button" src={GotoHome} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #fff;
  img {
    width: 80%;
  }
  .button {
    cursor: pointer;
    width: 20%;
  }
`;

export default NotFound;
