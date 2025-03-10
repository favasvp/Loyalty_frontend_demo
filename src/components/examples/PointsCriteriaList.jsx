import { useState } from "react";
import { usePoints } from "../../hooks/usePoints";

// Sample component that demonstrates how to use the refactored hooks for points criteria
const PointsCriteriaList = () => {
  // Get UI state actions and data fetching hooks from our custom hook
  const {
    usePointsCriteria,
    useCreatePointsCriteria,
    useUpdatePointsCriteria,
    useDeletePointsCriteria,
    setViewMode,
  } = usePoints();

  // Local state for the form
  const [formData, setFormData] = useState({
    title: "",
    points: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the hooks to fetch and mutate data
  const { data, isLoading, error } = usePointsCriteria();
  const createMutation = useCreatePointsCriteria();
  const updateMutation = useUpdatePointsCriteria();
  const deleteMutation = useDeletePointsCriteria();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing criteria
      updateMutation.mutate(
        {
          id: editingId,
          criteriaData: formData,
        },
        {
          onSuccess: () => {
            resetForm();
          },
        }
      );
    } else {
      // Create new criteria
      createMutation.mutate(formData, {
        onSuccess: () => {
          resetForm();
        },
      });
    }
  };

  // Handle edit button click
  const handleEdit = (criteria) => {
    setFormData({
      title: criteria.title,
      points: criteria.points,
      description: criteria.description,
    });
    setEditingId(criteria.id);
    setIsModalOpen(true);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this criteria?")) {
      deleteMutation.mutate(id);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      points: "",
      description: "",
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Toggle view mode between grid and table
  const toggleViewMode = () => {
    setViewMode("criteria", data?.viewMode === "grid" ? "table" : "grid");
  };

  if (isLoading) return <div className="p-4">Loading points criteria...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Points Criteria</h1>

        <div className="flex gap-2">
          <button
            onClick={toggleViewMode}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            {data?.viewMode === "grid" ? "Table View" : "Grid View"}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Grid or Table View */}
      {data?.viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.criteria?.map((criteria) => (
            <div
              key={criteria.id}
              className="border rounded p-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold">{criteria.title}</h2>
              <p className="text-green-600 font-bold">
                {criteria.points} points
              </p>
              <p className="text-gray-600 mt-2">{criteria.description}</p>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(criteria)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(criteria.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border">Title</th>
              <th className="p-2 text-left border">Points</th>
              <th className="p-2 text-left border">Description</th>
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.criteria?.map((criteria) => (
              <tr key={criteria.id} className="border hover:bg-gray-50">
                <td className="p-2 border">{criteria.title}</td>
                <td className="p-2 border">{criteria.points}</td>
                <td className="p-2 border">{criteria.description}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(criteria)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(criteria.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for adding/editing criteria */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Points Criteria" : "Add Points Criteria"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingId
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsCriteriaList;
