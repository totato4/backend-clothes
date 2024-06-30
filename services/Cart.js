class CartService {
  static async getCart(accessToken) {
    const cartData = await CartRepository(accessToken);
  }
}
