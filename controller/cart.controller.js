import pool from "../db.js";
import CartRepository from "../repositories/Cart.js";

class CartController {
  static async getCart(req, res) {
    try {
      // console.log(req.body.userName);
      const products = await CartRepository.getCart(req.body.userName);
      console.log(products);
      // console.log(products);
      // console.log(products);
      // if (products.length > 0) {
      //   return res.status(200).json(product);
      // } else {
      //   return res.status(200).json(false);
      // }
      return res.status(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
  static async updateCart(req, res) {
    try {
      const { products } = await CartRepository.updateCart({
        userName: req.body.userName,
        products: JSON.stringify(req.body.products),
      });
      if (products.length > 0) {
        return res.sendStatus(200).json(products);
      } else {
        return res.sendStatus(200).json(false);
      }
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default CartController;
