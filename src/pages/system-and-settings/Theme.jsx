import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";

const Theme = () => {
    const [theme, setTheme] = useState({
        colors: {
          primary: "#2B5C3F",
          secondary: "#4CAF50",
          accent: "#81C784",
          background: "#FFFFFF",
          text: "#1F2937",
        },
        typography: {
          fontFamily: "Inter",
          fontSize: "16px",
          headingSize: "24px",
        },
        borderRadius: "8px",
        spacing: "16px",
      });
    
      const colorPresets = [
        {
          name: "Default",
          colors: {
            primary: "#2B5C3F",
            secondary: "#4CAF50",
            accent: "#81C784",
          },
        },
        {
          name: "Ocean",
          colors: {
            primary: "#1E40AF",
            secondary: "#3B82F6",
            accent: "#93C5FD",
          },
        },
        {
          name: "Sunset",
          colors: {
            primary: "#9D174D",
            secondary: "#EC4899",
            accent: "#FBCFE8",
          },
        },
      ];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Theme Settings
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <StyledButton name={<>Save Changes</>} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Color Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Colors</h2>
          <div className="space-y-4">
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key}
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded border shadow-sm"
                    style={{ backgroundColor: value }}
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setTheme({
                        ...theme,
                        colors: { ...theme.colors, [key]: e.target.value },
                      })
                    }
                    className="flex-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Color Presets
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() =>
                    setTheme({
                      ...theme,
                      colors: { ...theme.colors, ...preset.colors },
                    })
                  }
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex gap-1 mb-2">
                    {Object.values(preset.colors).map((color) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Typography Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={theme.typography.fontFamily}
                onChange={(e) =>
                  setTheme({
                    ...theme,
                    typography: {
                      ...theme.typography,
                      fontFamily: e.target.value,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Font Size
              </label>
              <select
                value={theme.typography.fontSize}
                onChange={(e) =>
                  setTheme({
                    ...theme,
                    typography: {
                      ...theme.typography,
                      fontSize: e.target.value,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="14px">Small (14px)</option>
                <option value="16px">Medium (16px)</option>
                <option value="18px">Large (18px)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Preview</h3>
            <p
              style={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize,
              }}
            >
              This is how your text will look
            </p>
          </div>
        </div>

        {/* Layout Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Layout</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius
              </label>
              <select
                value={theme.borderRadius}
                onChange={(e) =>
                  setTheme({ ...theme, borderRadius: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="4px">Small (4px)</option>
                <option value="8px">Medium (8px)</option>
                <option value="12px">Large (12px)</option>
                <option value="16px">Extra Large (16px)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Spacing
              </label>
              <select
                value={theme.spacing}
                onChange={(e) =>
                  setTheme({ ...theme, spacing: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="12px">Compact (12px)</option>
                <option value="16px">Normal (16px)</option>
                <option value="20px">Relaxed (20px)</option>
                <option value="24px">Spacious (24px)</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Theme;
