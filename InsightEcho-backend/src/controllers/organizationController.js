const pool = require("../db");

const getOrganizations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT organization FROM reviews
      WHERE organization IS NOT NULL AND organization != ''
    `);

    const organizations = result.rows.map((row) => row.organization);
    res.json({ organizations });
  } catch (error) {
    console.error("Error fetching organizations", error);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
};

module.exports = { getOrganizations };
