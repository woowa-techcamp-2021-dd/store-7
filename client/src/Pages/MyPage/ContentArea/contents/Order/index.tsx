import styled, { css } from "styled-components";
import Section from "../../../Section";
import { useMyInfo, useMyOrders } from "@/api/my";
import { Arrow } from "@/assets";
import OrdersContainer from "./OrderContainer";
import { OrderStatus } from "@/shared/type";

const Order = () => {
  const { status: ordersStatus, data: orders } = useMyOrders();
  const { status: myInfoStatus, data: myInfo } = useMyInfo();
  const { prepare, delivered, arrival } = classifyOrders(orders);

  return (
    <Wrapper data-testid="test__root">
      <Section
        title="나의 주문 현황"
        description={`${
          myInfoStatus !== "loading" ? myInfo.name : " "
        }님의 주문 내역입니다.`}
        lineType="long1"
      >
        {ordersStatus !== "loading" && (
          <div className="orders">
            <OrdersContainer orders={prepare} type={OrderStatus.Prepare} />
            <div className="arrow">
              <Arrow />
            </div>
            <OrdersContainer orders={delivered} type={OrderStatus.Delivery} />
            <div className="arrow">
              <Arrow />
            </div>
            <OrdersContainer orders={arrival} type={OrderStatus.Arrival} />
          </div>
        )}
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .orders {
    display: flex;
    .arrow {
      width: 5rem;
      display: flex;
      justify-content: center;
      padding-top: 3rem;
    }
  }
`;

const classifyOrders = (orders = []) => {
  const prepare = orders.filter(
    (order) => order.status === OrderStatus.Prepare
  );
  const delivered = orders.filter(
    (order) => order.status === OrderStatus.Delivery
  );
  const arrival = orders.filter(
    (order) => order.status === OrderStatus.Arrival
  );
  return { prepare, delivered, arrival };
};

export default Order;