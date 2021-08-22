import { Injectable } from "@nestjs/common";
import { Orders } from "../domain/orders";
import { OrderRequest } from "../dto/order-request";
import { OrderResponse } from "../dto/order-response";

@Injectable()
export class OrderService {
  constructor(private readonly orders: Orders) {}

  async findOrderById(id: number): Promise<OrderResponse[]> {
    const orders = await this.orders.findOrderById(id);
    return orders.map(OrderResponse.of);
  }

  // async findOrderByOrderNum(orderNum: number): Promise<OrderResponse[]> {
  //   try {
  //     const data = await this.orders.findOrderByOrderNum(orderNum);
  //     return data;
  //   } catch (e) {
  //     return e;
  //   }
  // }

  async findOrders(): Promise<OrderResponse[]> {
    const orders = await this.orders.findOrders();
    return orders.map(OrderResponse.of);
  }

  async findOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    const orders = await this.orders.findOrdersByUserId(userId);
    return orders.map(OrderResponse.of);
  }

  createOrder(userId: number, order: OrderRequest): string {
    try {
      this.orders.createOrder({ ...order, userId });
    } catch (e) {
      return e;
    }
    return "Created!";
  }

  updateOrderStatus(id: number, status: string): string {
    try {
      this.orders.updateOrderStatus(id, status);
    } catch (e) {
      return e;
    }
    return "Updated!";
  }
}