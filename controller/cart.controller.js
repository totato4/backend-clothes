import pool from "../db.js";

class CartController {
  async updateCart(req, res) {
    const { user_id, items } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO carts (user_id,items) values ($1, $2) RETURNING *`,
      [user_id, items]
    );
    res.json(rows[0]);
  }
  async getUsers(req, res) {
    const { rows } = await pool.query(`SELECT * FROM clothes`);
    res.json(rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const { rows } = await pool.query(`SELECT * FROM person where id = $1`, [
      id,
    ]);
    res.json(rows[0]);
  }
}

export default CartController;
