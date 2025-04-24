const csv = require("csv-parser");
const pool = require("../db");

const bulkUpload = async (req, res) => {
  const results = [];

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file provided" });
    }

    const buffer = req.file.buffer;

    buffer
      .toString()
      .split("\n")
      .slice(1) // skip header
      .forEach((line) => {
        const [text, rating, organization] = line.split(",");
        if (text && rating && organization) {
          results.push({
            text: text.trim(),
            rating: Number(rating),
            organization: organization.trim(),
          });
        }
      });

    const insertPromises = results.map((r) =>
      pool.query(
        "INSERT INTO reviews (text, rating, organization) VALUES ($1, $2, $3)",
        [r.text, r.rating, r.organization]
      )
    );

    await Promise.all(insertPromises);

    res.status(200).json({ message: `Inserted ${results.length} reviews.` });
  } catch (error) {
    console.error("CSV Upload Error:", error);
    res.status(500).json({ error: "Error processing CSV file" });
  }
};

module.exports = { bulkUpload };
