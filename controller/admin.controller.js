import pool from "./db.js";

const generateClothesData = (count = 1000) => {
  const brands = ["cool", "super", "great"];
  const colors = ["red", "blue", "white", "black", "orange", "green", "gray"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const humanTypes = ["woman", "man", "kid"];
  const clothesTypes = [
    "Футболки",
    "Штаны",
    "Майки",
    "Джинсы",
    "Куртки",
    "Рубашки",
    "Толстовки",
    "Брюки",
    "Кроссовки",
    "Туфли",
    "Ботинки",
    "Тапочки",
    "Сандали",
    "Брелки",
    "Цепочки",
    "Ожерелья",
    "Галстуки",
    "Кросовки для бега",
    "Спортивные костюмы",
    "Шапочки для бассейна",
    "Футболки для бега",
    "Тренировочные маски",
    "Резинки для волос",
    "Заколки",
  ];

  return Array.from({ length: count }, (_, i) => {
    const human_c = humanTypes[Math.floor(Math.random() * humanTypes.length)];
    const size_c = sizes[Math.floor(Math.random() * sizes.length)];
    const clothes_c =
      clothesTypes[Math.floor(Math.random() * clothesTypes.length)];
    const prefix = human_c === "woman" ? "w" : human_c === "man" ? "m" : "k";

    return {
      title: `${clothes_c} ${human_c} ${size_c}`,
      discount: Math.floor(Math.random() * 10) + 1,
      human_c,
      size_c,
      clothes_c,
      price: Math.floor(Math.random() * 19900) + 100,
      rating: Math.floor(Math.random() * 10) + 1,
      brand: brands[Math.floor(Math.random() * brands.length)],
      image_url: `${prefix}${Math.floor(Math.random() * 5) + 1}.jpg`,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
};

class AdminController {
  //   static async getAllClothes(req, res) {
  //     try {
  //       // Получаем параметры пагинации из запроса
  //       const { page = 1, limit = 20 } = req.query;
  //       const offset = (page - 1) * limit;

  //       // Запрос для получения данных с пагинацией
  //       const { rows } = await pool.query(
  //         `SELECT * FROM myclothes ORDER BY id LIMIT $1 OFFSET $2`,
  //         [limit, offset]
  //       );

  //       // Запрос для получения общего количества записей
  //       const countResult = await pool.query(`SELECT COUNT(*) FROM myclothes`);
  //       const totalCount = parseInt(countResult.rows[0].count);
  //       const totalPages = Math.ceil(totalCount / limit);

  //       res.json({
  //         success: true,
  //         data: rows,
  //         pagination: {
  //           currentPage: parseInt(page),
  //           itemsPerPage: parseInt(limit),
  //           totalItems: totalCount,
  //           totalPages,
  //           hasNextPage: page < totalPages,
  //           hasPrevPage: page > 1,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Ошибка при получении данных из myclothes:", error);
  //       res.status(500).json({
  //         success: false,
  //         message: "Ошибка при получении данных",
  //         error: error.message,
  //       });
  //     }
  //   }

  static async populateMyClothesTable(req, res) {
    try {
      const clothesData = generateClothesData(1000);

      // Создаем таблицу myclothes с правильными типами (как в первоначальном варианте)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS myclothes (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          discount INTEGER,
          human_c VARCHAR(50) NOT NULL,
          size_c VARCHAR(10) NOT NULL,
          clothes_c VARCHAR(100) NOT NULL,
          price INTEGER NOT NULL,
          rating INTEGER NOT NULL,
          brand VARCHAR(50) NOT NULL,
          image_url VARCHAR(100) NOT NULL,
          color VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Очищаем таблицу перед заполнением
      await pool.query("TRUNCATE TABLE myclothes RESTART IDENTITY");

      // Вставляем данные пачками по 100 записей
      const batchSize = 100;
      for (let i = 0; i < clothesData.length; i += batchSize) {
        const batch = clothesData.slice(i, i + batchSize);
        const placeholders = batch
          .map(
            (_, index) =>
              `($${index * 10 + 1}, $${index * 10 + 2}, $${index * 10 + 3}, $${
                index * 10 + 4
              }, $${index * 10 + 5}, $${index * 10 + 6}, $${index * 10 + 7}, $${
                index * 10 + 8
              }, $${index * 10 + 9}, $${index * 10 + 10})`
          )
          .join(", ");

        const values = batch.flatMap((item) => [
          item.title,
          item.discount,
          item.human_c,
          item.size_c,
          item.clothes_c,
          item.price,
          item.rating,
          item.brand,
          item.image_url,
          item.color,
        ]);

        await pool.query(
          `
          INSERT INTO myclothes (
            title, discount, human_c, size_c, clothes_c, 
            price, rating, brand, image_url, color
          ) VALUES ${placeholders}
        `,
          values
        );
      }

      res.json({
        success: true,
        message: `Успешно добавлено ${clothesData.length} товаров в таблицу myclothes`,
        insertedCount: clothesData.length,
      });
    } catch (error) {
      //   console.error("Ошибка при заполнении таблицы myclothes:", error);
      //   res.status(500).json({
      //     success: false,
      //     message: "Ошибка при заполнении таблицы",
      //     error: error.message,
      //   });
      res.status(200).json({ success: true, message: "no data" });
    }
  }
}

export default AdminController;
