import { useState } from "react";
import useInput from "@/hooks/useInput";
import AddressModal from "../AddressModal";
import ItemInfoBox from "@/Components/ItemInfoBox";
import { Arrow, ETPay, KakaoPay } from "@/assets";
import InputSection from "@/Components/Input/InputSection";
import useValidation from "@/hooks/useValidation";
import ValidationInput from "@/Components/Input/ValidationInput";
import {
  validateEmail,
  validatePhoneNumber,
  VALIDATION_ERR_MSG,
} from "@/utils/validations";
import { useEffect } from "react";
import { useMyDestinations, useMyInfo } from "@/api/my";
import { DestinationType, ICart, PartialCart } from "@/shared/type";
import { postPaymentReady } from "@/api/payment";
import properties from "@/config/properties";
import CartOrderBox from "@/Components/CartOrderBox";
import { convertToPhoneNumber } from "@/utils/util";
import { postOrder } from "@/api/orders";
import { moveTo } from "@/Router";
import { Title, Content, Info, Payment } from "../index";

const LoggedinContent = () => {
  // 상품목록
  const orderItems: { items: PartialCart[] } = JSON.parse(
    localStorage.getItem("orders")
  );

  const { status: myInfoStatus, data: myInfo, error } = useMyInfo();

  // form
  const email = useInput(myInfo?.email ?? "");
  const addressee = useInput(myInfo?.name ?? "");
  const phone = useInput(convertToPhoneNumber(myInfo?.phoneNumber ?? ""));
  const emailValidation = useValidation(validateEmail);
  const nameValidation = useValidation((name: string) => !!name?.length);
  const phoneValidation = useValidation(validatePhoneNumber);

  useEffect(() => {
    if (myInfo) {
      email.setValue(myInfo?.email);
      addressee.setValue(myInfo?.name);
      phone.setValue(convertToPhoneNumber(myInfo?.phoneNumber));
      emailValidation.onCheck(myInfo?.email ?? "");
      nameValidation.onCheck(myInfo?.name ?? "");
      phoneValidation.onCheck(convertToPhoneNumber(myInfo?.phoneNumber ?? ""));
    }
  }, [myInfo]);

  // 결제수단
  type paymentType = "kakaopay" | "etpay" | null;
  const [payment, setPayment] = useState<paymentType>(null);

  // 배송지
  const { status: destinationsStatus, data: destinations } =
    useMyDestinations();
  const [address, setAddress] = useState<Partial<DestinationType>>();

  useEffect(() => {
    if (destinationsStatus !== "loading")
      setAddress(destinations.find((i) => i.isDefault === true));
  }, [destinationsStatus]);

  const [isAddressModalOpened, setIsAddressModalOpened] = useState(false);

  // 요청사항
  const [request, setRequest] = useState("");

  // create order
  const handlePostOrder = () => {
    orderItems.items.forEach(async (item) => {
      await postOrder({
        data: {
          productId: item.productId,
          addressee: addressee.value,
          productOptionId: item.productOptionId,
          price: item.price,
          amount: item.amount,
          destination: `${address.address} ${address.detailAddress}`,
          request: request,
        },
      });
    });
  };

  // 카카오페이
  const handleKakaoPay = async () => {
    const res = await postPaymentReady({
      cid: "TC0ONETIME",
      item_name: "item",
      quantity: "1",
      total_amount: "11",
      tax_free_amount: "11",
      approval_url: `${properties.baseURL}/payment/approve`,
      cancel_url: properties.baseURL,
      fail_url: properties.baseURL,
    });
    if (res) {
      try {
        handlePostOrder();
      } finally {
        window.open(res.url);
      }
    }
  };

  // 결제 버튼 클릭
  const handlePay = () => {
    if (payment === "kakaopay") handleKakaoPay();
    else {
      try {
        handlePostOrder();
      } finally {
        moveTo("/order/success");
      }
    }
  };

  const isOrderable =
    emailValidation.isValid &&
    nameValidation.isValid &&
    phoneValidation.isValid &&
    !!payment &&
    !!address;

  return (
    myInfoStatus !== "loading" &&
    destinationsStatus !== "loading" && (
      <div className="contents">
        <Title>
          <span className="other">장바구니</span> <Arrow className="arrow" />{" "}
          주문/결제
        </Title>

        <Content>
          <Info>
            <div className="label">주문상품</div>
            <div className="items">
              {orderItems.items.map((cart) => (
                <ItemInfoBox key={cart.id} {...(cart as ICart)} />
              ))}
            </div>
          </Info>

          <Info>
            <div className="label">주문자</div>
            <div className="user-info">
              <InputSection title="이름">
                <ValidationInput
                  input={addressee}
                  validation={nameValidation}
                  placeholder="이름"
                  message={VALIDATION_ERR_MSG.INVALID_NAME}
                />
              </InputSection>
              <InputSection title="이메일">
                <ValidationInput
                  input={email}
                  validation={emailValidation}
                  placeholder="이메일을 입력해주세요"
                  message={VALIDATION_ERR_MSG.INVALID_EMAIL}
                />
              </InputSection>
              <InputSection
                title="휴대폰 번호"
                brief="휴대폰 번호를 적어주세요"
              >
                <ValidationInput
                  input={phone}
                  validation={phoneValidation}
                  placeholder="010-0000-0000"
                  message={VALIDATION_ERR_MSG.INVALID_PHONE}
                />
              </InputSection>
            </div>
          </Info>

          <Info>
            <div className="label">
              배송지
              <div
                className="address-btn"
                onClick={() => setIsAddressModalOpened(true)}
              >
                변경
              </div>
            </div>

            <div className="address-info">
              {address ? (
                <>
                  <div className="name">{address?.name}</div>
                  <div>
                    {address?.addressee} {address?.phoneNumber}
                  </div>
                  <div>
                    {address?.address} {address?.detailAddress}
                  </div>
                </>
              ) : (
                <div>배송지를 추가해주세요</div>
              )}

              <div style={{ marginTop: "3rem" }}>
                <select
                  className="order-input"
                  onChange={(e) => setRequest(e.target.value)}
                  defaultValue={request}
                >
                  <option value="배송시 요청사항을 선택해주세요.">
                    배송시 요청사항을 선택해주세요.
                  </option>
                  <option value="부재시 문 앞에 놓아주세요.">
                    부재시 문 앞에 놓아주세요.
                  </option>
                  <option value="배송전에 미리 연락주세요.">
                    배송전에 미리 연락주세요.
                  </option>
                  <option value="부재시 경비실에 맡겨주세요.">
                    부재시 경비실에 맡겨주세요.
                  </option>
                  <option value="부재시 전화주시거나 문자 남겨 주세요.">
                    부재시 전화주시거나 문자 남겨 주세요.
                  </option>
                </select>
              </div>
            </div>
          </Info>

          <Info>
            <div className="label">결제수단</div>

            <div className="payments">
              <Payment
                className="payments__item"
                onClick={() => setPayment("kakaopay")}
                isClicked={payment === "kakaopay"}
              >
                <img width={70} src={KakaoPay} />
                <div>카카오페이</div>
              </Payment>
              <Payment
                className="payments__item"
                onClick={() => setPayment("etpay")}
                isClicked={payment === "etpay"}
              >
                <img width={70} src={ETPay} />
                <div>ET페이</div>
              </Payment>
            </div>
          </Info>
        </Content>
        {isAddressModalOpened && (
          <AddressModal
            {...{ setAddress, address }}
            closeModal={() => setIsAddressModalOpened(false)}
          />
        )}
        <CartOrderBox {...{ handlePay }} isButtonDisabled={!isOrderable} />
      </div>
    )
  );
};

export default LoggedinContent;