import { Product } from "../entity/product";

export class ProductElementResponse {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;

  constructor(response: ProductElementResponse) {
    this.id = response.id;
    this.name = response.name;
    this.price = response.price;
    this.originPrice = response.originPrice;
    this.discountRate = response.discountRate;
    this.isWish = response.isWish;
    this.amount = response.amount;
    this.image = response.image;
  }

  static of(product: Product, userId: number): ProductElementResponse {
    const id = product.id,
      name = product.name,
      originPrice = product.price,
      discountRate = product.discountRate,
      amount = product.stock,
      image = product.getThumbnailImage(),
      price = product.getDiscountedPrice(),
      isWish =
        product.wishes?.filter((wish) => wish?.user?.id === userId).length !==
        0;

    return new ProductElementResponse({
      id,
      name,
      price,
      originPrice,
      discountRate,
      isWish,
      amount,
      image,
    });
  }
}
