import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { useState } from "react";
import AddressBox from "./AddressBox";
import { sampleUser } from "@/shared/dummy";
import { AddressType } from "@/shared/type";
import Button from "@/Components/Button";
import { Back } from "@/assets";
import AddressForm from "./AddressForm";

const AddressModal = ({ closeModal }) => {
  const handleChangeAddress = (address: AddressType) => {
    console.log(address);
  };

  const [page, setPage] = useState<"select" | "add" | "edit">("select");
  const title =
    (page === "select" && "배송지 선택") ||
    (page === "edit" && "배송지 수정") ||
    (page === "add" && "배송지 추가");

  return (
    <Wrapper {...{ closeModal, title }} hideCloseBtn={page !== "select"}>
      <>
        {page !== "select" && (
          <Back className="back-btn" onClick={() => setPage("select")} />
        )}

        {page === "select" ? (
          <Contents>
            {sampleUser.addresses.map((address, idx) => (
              <AddressBox
                key={idx}
                {...{ setPage, address }}
                user={sampleUser}
              />
            ))}
          </Contents>
        ) : (
          <AddressForm />
        )}

        {page === "select" && (
          <div className="add-btn">
            <Button primary size="large" onClick={() => setPage("add")}>
              배송지 추가
            </Button>
          </div>
        )}
      </>
    </Wrapper>
  );
};

const Wrapper = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40rem;
  height: 68rem;
  padding: 0;
  padding-top: 2rem;
  overflow-y: hidden;
  .add-btn {
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;
  }
  .back-btn {
    cursor: pointer;
    position: absolute;
    top: 3rem;
    left: 2rem;
  }
`;

const Contents = styled.div`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.color.background};
  overflow-y: scroll;
`;

export default AddressModal;
