import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
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
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <div className="flex items-center gap-2 mb-6">
        <Upload className="text-blue-600" size={28} />
        <h2 className="text-2xl font-semibold text-blue-800">
          Upload Reviews (CSV)
        </h2>
      </div>

      <form onSubmit={handleUpload} className="space-y-5">
        <label className="block text-sm font-medium text-gray-700">
          Select CSV File
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full cursor-pointer rounded border border-gray-300 p-2 text-sm"
        />

        <label className="inline-flex items-center text-sm mt-4">
          <input
            type="checkbox"
            checked={previewMode}
            onChange={() => setPreviewMode(!previewMode)}
            className="mr-2 rounded border-gray-300"
          />
          Preview before upload
        </label>

        <button
          type="submit"
          disabled={!file}
          className={`w-full py-2 rounded ${
            file
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-300 cursor-not-allowed text-white"
          } transition`}
        >
          <FileText className="inline mr-2" size={18} />
          {previewMode ? "Preview CSV" : "Upload CSV"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 flex items-center gap-2 rounded p-3 ${
            message.toLowerCase().includes("success") ||
            message.toLowerCase().includes("complete")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.toLowerCase().includes("success") ||
          message.toLowerCase().includes("complete") ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {previewResults && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-3 text-blue-800">Preview Results</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-xl font-bold">{previewResults.total}</div>
              <div className="text-sm text-gray-600">Total Rows</div>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <div className="text-xl font-bold text-green-700">
                {previewResults.valid}
              </div>
              <div className="text-sm text-green-700">Valid Reviews</div>
            </div>
            <div className="bg-red-100 p-3 rounded">
              <div className="text-xl font-bold text-red-700">
                {previewResults.invalid}
              </div>
              <div className="text-sm text-red-700">Invalid Reviews</div>
            </div>
          </div>

          {previewResults.invalidReviews?.length > 0 && (
            <div className="mt-4 max-h-40 overflow-auto rounded border border-red-300 bg-red-50 p-3">
              <h4 className="font-medium text-red-700 mb-2">
                Invalid Rows (sample):
              </h4>
              <ul className="text-xs space-y-2">
                {previewResults.invalidReviews.map((entry, idx) => (
                  <li key={idx} className="bg-red-100 rounded p-2">
                    <div className="font-mono text-xs mb-1">
                      <span className="font-semibold">Row {entry.row}:</span>{" "}
                      {JSON.stringify(entry.review)}
                    </div>
                    <ul className="list-disc ml-4 text-red-700">
                      {entry.errors.map((err, errIdx) => (
                        <li key={errIdx}>{err}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleConfirmUpload}
            className="mt-4 w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 transition"
          >
            <CheckCircle className="inline mr-2" size={18} />
            Confirm Upload Valid Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;
