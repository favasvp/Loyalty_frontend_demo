import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import StyledButton from "../../ui/StyledButton";

const BulkCouponUpload = ({ onChange, existingCodes = [] }) => {
  // Function to create and download a sample Excel template
  const downloadSampleTemplate = () => {
    // Create a workbook with a single worksheet
    const wb = XLSX.utils.book_new();
    // Create sample data with header and example codes
    const sampleData = [
      ["Coupon Code"],
      ["SAMPLE123"],
      ["EXAMPLE456"],
      ["DISCOUNT789"]
    ];
    
    // Convert sample data to worksheet
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Coupon Codes");
    // Generate and download the file
    XLSX.writeFile(wb, "coupon_codes_template.xlsx");
  };
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [codes, setCodes] = useState(existingCodes);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    // When codes change, notify parent component with just the array of codes
    onChange(codes);
  }, [codes, onChange]);

  const handleFileUpload = (e) => {
    // Stop event propagation to prevent it from reaching parent handlers
    e.stopPropagation();
    
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    setUploadError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Parse the data
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        // Extract codes from the first column, skipping the header if present
        let extractedCodes = [];
        
        // Determine if first row is header (if it contains "code" or "coupon")
        const hasHeader = data[0] && 
          (String(data[0][0]).toLowerCase().includes("code") || 
           String(data[0][0]).toLowerCase().includes("coupon"));
        
        const startIndex = hasHeader ? 1 : 0;
        
        for (let i = startIndex; i < data.length; i++) {
          if (data[i][0]) {
            // Just store the code string instead of an object
            extractedCodes.push(String(data[i][0]).trim());
          }
        }
        
        if (extractedCodes.length === 0) {
          setUploadError("No valid codes found in the file");
          setIsUploading(false);
          return;
        }
        
        setCodes(extractedCodes);
        setIsUploading(false);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        setUploadError("Failed to parse the Excel file. Please check the format.");
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      setUploadError("Error reading the file");
      setIsUploading(false);
    };
    
    reader.readAsBinaryString(file);
  };

  const removeCode = (index) => {
    setCodes(prevCodes => prevCodes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="mb-4">
          <label htmlFor="bulk-file-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Excel File with Coupon Codes
          </label>
          <div className="flex items-center space-x-3">
            <label htmlFor="bulk-file-upload" className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              Choose File
              <input
                id="bulk-file-upload"
                name="bulk-file-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isUploading}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
            
            <StyledButton
              onClick={(e) => {
                e.stopPropagation();
                downloadSampleTemplate();
              }}
              name={
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </>
              }
              variant="download"
            />
          </div>
          {uploadError && <p className="mt-2 text-sm text-red-600">{uploadError}</p>}
          <p className="mt-2 text-xs text-gray-500">
            Upload an Excel file (.xlsx, .xls) with coupon codes in the first column or download a sample template
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Coupon Codes ({codes.length})</h3>
        </div>
        
        <div className="max-h-60 overflow-y-auto border rounded-md">
          {codes.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {codes.map((code, index) => (
                <li key={index} className="px-4 py-2 flex items-center justify-between">
                  <span className="block w-full text-sm">{code}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCode(index);
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No codes added yet. Upload an Excel file to import codes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkCouponUpload;