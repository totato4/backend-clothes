import pool from "../db.js";
import ErrorUtils from "../utils/Errors.js";

class ClothesController {
  static async getClothes(req, res) {
    try {
      let {
        human_c = false,
        size_c = false,
        brand_c = false,
        color_c = false,
        clothes_c = false,
        id = false,
        discount = false,
        price_max = false,
        price_min = false,
        search = false,
        page,
        limit = false,
      } = req.query;

      let select = " SELECT * FROM clothes ";
      let where = " ";

      if (req.query) {
        where = " " + " WHERE " + " ";
      }

      let human_q =
        human_c !== false
          ? ` human_c IN (${human_c
              .split(",")
              .map((item) => "'" + item + "'")}) `
          : " human_c IN ('woman','man','kid') ";

      let size_q =
        size_c !== false
          ? ` AND size_c IN (${size_c
              .split(",")
              .map((item) => "'" + item + "'")}) `
          : " ";

      let brand_q = brand_c
        ? ` AND brand IN (${brand_c
            .split(",")
            .map((item) => "'" + item + "'")})`
        : " ";

      let color_q = color_c
        ? ` AND color IN (${color_c
            .split(",")
            .map((item) => "'" + item + "'")})`
        : " ";
      let clothes_q = clothes_c
        ? ` AND clothes_c IN (${clothes_c
            .split(",")
            .map((item) => "'" + item + "'")})`
        : " ";
      let id_q = id
        ? ` AND id IN (${id.split(",").map((item) => "'" + item + "'")})`
        : " ";
      let discount_q = discount
        ? "AND discount IS NOT NULL AND discount > 0"
        : "";

      let price_max_q = price_max ? ` AND price <= ${price_max} ` : " ";
      let price_min_q = price_min ? ` AND price >= ${price_min}` : " ";

      let search_q = search ? ` AND title iLIKE '%${search}%' ` : " ";

      let pag_query;
      if (page !== false && limit !== false && page != 0 && limit !== 0) {
        page = page - 1;
        pag_query = " ORDER BY id OFFSET " + page * limit + " LIMIT " + limit;
      } else {
        pag_query = " " + "ORDER BY id OFFSET 0 LIMIT 12";
      }

      const data = await pool.query(
        select +
          where +
          human_q +
          size_q +
          brand_q +
          color_q +
          clothes_q +
          id_q +
          discount_q +
          price_max_q +
          price_min_q +
          search_q +
          pag_query
      );

      const totalCount = await pool.query(
        select +
          where +
          human_q +
          size_q +
          brand_q +
          color_q +
          clothes_q +
          id_q +
          discount_q +
          price_max_q +
          price_min_q +
          search_q
      );

      let totalPages = limit
        ? Math.ceil(
            totalCount.rows.length == 0 ? 0 : totalCount.rows.length / limit
          )
        : Math.ceil(
            totalCount.rows.length == 0 ? 0 : totalCount.rows.length / 20
          );
      return res.status(200).json({
        product: data.rows,
        totalPages,
        totalCount: totalCount.rows.length,
      });
    } catch {
      ErrorUtils.catchError(res, err);
    }
  }
}

export default ClothesController;
