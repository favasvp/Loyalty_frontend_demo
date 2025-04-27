import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import { useBrands } from "../../hooks/useBrand";
import useUiStore from "../../store/ui";
import uploadApi from "../../api/upload";

const schema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
  }),
  description: z.object({
    en: z.string().min(5, "English description must be at least 5 characters"),
  }),
});

const AddBrand = ({ isOpen, onClose, editData }) => {
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: { en: "", ar: "" },
      image: "",
      description: { en: "", ar: "" },
    },
  });

  const { useCreateBrand, useUpdateBrand } = useBrands();
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const { addToast } = useUiStore();

  useEffect(() => {
    if (editData) {
    

      setValue("title.en", editData?.data?.title?.en ||  editData?.data?.title || "");
      setValue("title.ar", editData?.data?.title?.ar || "");
      setValue("image", editData?.data?.image || "");
      setValue("description.en", editData?.data?.description?.en ||  editData?.data?.description || "");
      setValue("description.ar", editData?.data?.description?.ar || "");
      setImagePreview(editData?.data?.image);
    }
  }, [editData, setValue]);

  const onSubmit = async (formData) => {
    try {
      let imageUrl = formData.image;
      const file = watch("image");
      if (file instanceof File) {
        const uploadResponse = await uploadApi.uploadImage(file);
        imageUrl = uploadResponse.data?.url;
      }

      const formDataToSubmit = { ...formData, image: imageUrl };

      const action = editData ? updateMutation : createMutation;
      const payload = editData
        ? { id: editData.data._id, formData: formDataToSubmit }
        : formDataToSubmit;

      action.mutate(payload, {
        onSuccess: (data) => {
          addToast({ type: "success", message: data?.message });
          resetAndClose();
        },
        onError: (error) => {
          addToast({ type: "error", message: error?.response?.data?.message });
        },
      });
    } catch (error) {
      addToast({ type: "error", message: error.message });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const resetAndClose = () => {
    reset({
      title: { en: "", ar: "" },
      image: "",
      description: { en: "", ar: "" },
    });
    setImagePreview(null);
    setActiveLanguage("en");
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500";

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-xl p-4 max-h-[80vh] min-h-[300px] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            {editData ? "Edit Brand" : "Add New Brand"}
          </h2>
          <button
            onClick={() => resetAndClose()} 
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="flex border rounded overflow-hidden mb-4">
              <button
                type="button"
                onClick={() => setActiveLanguage("en")}
                className={`flex-1 py-2 text-sm font-medium ${
                  activeLanguage === "en"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-500"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguage("ar")}
                className={`flex-1 py-2 text-sm font-medium ${
                  activeLanguage === "ar"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-500"
                }`}
              >
                Arabic
              </button>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500">
                Title ({activeLanguage === "en" ? "English" : "Arabic"})
              </label>
              <input
                {...register(`title.${activeLanguage}`)}
                className={inputClass}
                dir={activeLanguage === "ar" ? "rtl" : "ltr"}
                value={watch(`title.${activeLanguage}`)}
              />
              {errors.title?.[activeLanguage] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title[activeLanguage].message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500">Logo</label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer w-full border border-gray-200 rounded-lg px-3 py-3 flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">Choose Image</span>
                <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
              </label>
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {imagePreview && (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500">
                Description ({activeLanguage === "en" ? "English" : "Arabic"})
              </label>
              <textarea
                {...register(`description.${activeLanguage}`)}
                className={inputClass}
                rows="4"
                value={watch(`description.${activeLanguage}`)}
                dir={activeLanguage === "ar" ? "rtl" : "ltr"}
              />
              {errors.description?.[activeLanguage] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description[activeLanguage].message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
            <StyledButton
              name="Cancel"
              onClick={() => resetAndClose()}
              variant="tertiary"
            />
            <StyledButton
              name={editData ? "Update" : "Add Brand"}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;