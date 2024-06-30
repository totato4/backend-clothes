import pool from "../db.js";

class CartRepository {
  static async getCart({ userName, products }) {
    const response = await pool.query(
      "SELECT products FROM carts WHERE userName = $1",
      [userName]
    );

    return response.rows[0];
  }

  static async createCart({ userName, products }) {
    const response = await pool.query(
      "INSERT INTO carts (userName, products) VALUES ($1, $2)",
      [userName, products]
    );

    return response.rows[0];
  }

  static async updateCart({ userName, products }) {
    const response = await pool.query(
      "INSERT INTO carts (userName, products) VALUES ($1, $2)",
      [userName, products]
    );
    return response.rows[0];
  }
}

export default CartRepository;
