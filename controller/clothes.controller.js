import pool from "../db.js";

class ClothesController {
  static async getClothes(req, res) {
    try {
      // Деструктуризация с значениями по умолчанию
      const {
        human_c = "woman,man,kid",
        size_c = "",
        id = "",
        brand_c = "",
        color_c = "",
        clothes_c = "",
        price_max = "",
        price_min = "",
        search = "",
        page = 1,
        limit = 12,
      } = req.query;

      // Базовые части запроса
      const baseQuery = {
        select: "SELECT * FROM clothes",
        where: [],
        params: [],
        pagination: `ORDER BY id OFFSET $${1} LIMIT $${2}`,
      };

      // Параметры пагинации
      const pageNumber = Math.max(1, parseInt(page)) || 1;
      const limitNumber = Math.max(1, parseInt(limit)) || 12;
      const offset = (pageNumber - 1) * limitNumber;

      // Добавление параметров пагинации
      baseQuery.params.push(offset, limitNumber);

      // Функция для обработки IN условий
      const buildInCondition = (field, values, defaultValue = null) => {
        if (!values) return defaultValue;

        const items = values.split(",").filter(Boolean);
        if (items.length === 0) return defaultValue;

        const placeholders = items.map(
          (_, i) => `$${baseQuery.params.length + i + 1}`
        );
        baseQuery.params.push(...items);

        return `${field} IN (${placeholders.join(", ")})`;
      };

      // Построение условий WHERE
      const conditions = [
        buildInCondition("human_c", human_c),
        buildInCondition("size_c", size_c),
        buildInCondition("brand", brand_c),
        buildInCondition("color", color_c),
        buildInCondition("clothes_c", clothes_c),
        buildInCondition("id", id),
      ].filter(Boolean);

      // Добавление условий по цене
      if (price_min) {
        conditions.push(`price >= $${baseQuery.params.length + 1}`);
        baseQuery.params.push(price_min);
      }

      if (price_max) {
        conditions.push(`price <= $${baseQuery.params.length + 1}`);
        baseQuery.params.push(price_max);
      }

      // Добавление условия поиска
      if (search) {
        conditions.push(`title ILIKE $${baseQuery.params.length + 1}`);
        baseQuery.params.push(`%${search}%`);
      }

      // Сборка полного запроса
      let query = baseQuery.select;

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
      }

      query += ` ${baseQuery.pagination}`;

      // Выполнение запросов
      const [data, totalCount] = await Promise.all([
        pool.query(query, baseQuery.params),
        pool.query(
          query
            .replace(baseQuery.pagination, "")
            .replace(/SELECT \*/g, "SELECT COUNT(*)"),
          baseQuery.params.slice(0, -2) // Исключаем параметры пагинации для подсчета общего количества
        ),
      ]);

      // Расчет общего количества страниц
      const totalItems = parseInt(totalCount.rows[0]?.count || 0);
      const totalPages = Math.ceil(totalItems / limitNumber);

      // Отправка ответа
      res.json({
        products: data.rows,
        pagination: {
          totalPages,
          totalItems,
          currentPage: pageNumber,
          itemsPerPage: limitNumber,
        },
      });
    } catch (error) {
      console.error("Error in getClothes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ClothesController;
