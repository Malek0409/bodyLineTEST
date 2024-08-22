import { bd } from "../bd.js"

export const getContent = async (req, res) => {
  try {
    const queryGetContent = `
      SELECT
          c.id,
          c.legal_notices,
          c.conditions_generales,
          c.privacy_policy,
          c.personal_data,
        
      FROM
          content as c
          
  
    `;

    bd.query(queryGetContent,[req], (err, result) => {
      if (err) {
        console.error(err, " : Database error");
        return res.status(500).json({ error: "Error fetching content data" });
      }
    });
  } catch (err) {
    console.error(err, " : Internal server error");
    return res.status(500).json({ error: "Internal server error" });
  }
};