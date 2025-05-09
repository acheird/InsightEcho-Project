const csv = require("csv-parser");
const { Readable } = require("stream");

const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];

    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          text: data.text?.trim(),
          rating: Number(data.rating),
          organization: data.organization?.trim(),
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

module.exports = parseCSV;
