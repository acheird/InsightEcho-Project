import { useState } from "react";
import { uploadCSV } from "../api";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [previewMode, setPreviewMode] = useState(true);
  const [previewResults, setPreviewResults] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await uploadCSV(formData, previewMode);

      if (previewMode) {
        setPreviewResults(data);
        setMessage(
          `Preview complete. Valid: ${data.valid}, Invalid: ${data.invalid}`
        );
      } else {
        setMessage(data.message || "Upload successful!");
        setPreviewResults(null);
      }
    } catch (err) {
      setMessage(err?.response?.data?.error || "Upload failed.");
      setPreviewResults(null);
    }
  };

  const handleConfirmUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await uploadCSV(formData, false);
      setMessage(data.message || "Upload successful!");
      setPreviewResults(null);
    } catch (err) {
      setMessage(err?.response?.data?.error || "Upload failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Reviews (CSV)</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <label className="flex items-center gap-2 mb-4 text-sm">
          <input
            type="checkbox"
            checked={previewMode}
            onChange={() => setPreviewMode(!previewMode)}
          />
          Preview before upload
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {previewMode ? "Preview CSV" : "Upload CSV"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}

      {previewResults && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Preview Results</h3>
          <p>Total rows: {previewResults.total}</p>
          <p>Valid reviews: {previewResults.valid}</p>
          <p>Invalid reviews: {previewResults.invalid}</p>

          {previewResults.invalidReviews?.length > 0 && (
            <div className="mt-4 max-h-40 overflow-auto border rounded p-2 bg-red-50">
              <h4 className="font-medium mb-1">Invalid Rows (sample):</h4>
              <ul className="text-xs space-y-1">
                {previewResults.invalidReviews.map((row, idx) => (
                  <li key={idx} className="bg-red-200 p-1 rounded">
                    {JSON.stringify(row)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleConfirmUpload}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Upload Valid Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;
