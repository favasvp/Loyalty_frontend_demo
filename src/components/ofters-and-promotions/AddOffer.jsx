import React from "react";
import { useForm, Controller } from "react-hook-form";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useBrands } from "../../hooks/useBrand";
import { useCategory } from "../../hooks/useCategory";
import Select from "react-select";
import { useAppTypes } from "../../hooks/useAppTypes";
import useUiStore from "../../store/ui";
import { useOffers } from "../../hooks/useOffers";
import { useTiers } from "../../hooks/useTiers";

const AddOffer = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  const { useGetBrands } = useBrands();
  const { data: merchants } = useGetBrands();
  const { useGetCategory } = useCategory();
  const { data: couponCategories } = useGetCategory();
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes } = useGetAppTypes();
  const{useCreateMerchantOffer}=useOffers();
  const createMutation = useCreateMerchantOffer();
  const { addToast } = useUiStore();
  const{useGetTiers}=useTiers();
  const { data: tiers } = useGetTiers();
  const { 
    register, 
    control, 
    handleSubmit, 
    setValue, 
    watch, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      code: "",
      title: "",
      description: "",
      merchantId: "",
      couponCategoryId: "",
      discountDetails: {
        type: "",
        value: "",
      },
      redeemablePointsCount: 0,
      validityPeriod: {
        startDate: "",
        endDate: "",
      },
      eligibilityCriteria: {
        userTypes: [],
        tiers: [],
        minPointsBalance: 0,
      },
      usagePolicy: {
        frequency: "",
        maxUsagePerPeriod: 0,
        maxTotalUsage: null,
      },
      conditions: {
        appType: [],
        minTransactionValue: 0,
        maxTransactionValue: null,
        applicablePaymentMethods: [],
      },
      termsAndConditions: [],
    }
  });

  const watchTermsAndConditions = watch("termsAndConditions");

  const userTypeOptions = [
    { value: "NEW", label: "New Users" },
    { value: "EXISTING", label: "Existing Users" },
    { value: "PREMIUM", label: "Premium Users" },
    { value: "ALL", label: "All Users" },
  ];

  const appTypeOptions = appTypes?.data?.map(appType => ({
    value: appType._id,
    label: appType.name
  })) || [];
  const tierOptions = tiers?.data?.map(appType => ({
    value: appType._id,
    label: appType.name
  })) || [];

  const paymentMethodOptions = [
    { value: 'Khedmah-site', label: 'Khedmah-site' },
    { value: 'KhedmahPay-Wallet', label: 'KhedmahPay-Wallet' },
    { value: 'ALL', label: 'All Payment Methods' }
  ];

  const onSubmit = (data) => {
    const formData={
      merchantId: data.merchantId,
      title: data.title,
      description: data.description,
      code: data.code,
      couponCategoryId: data.couponCategoryId,
      discountDetails: {
        type: data.discountDetails.type,
        value: data.discountDetails.value,
      },
      redeemablePointsCount: data.redeemablePointsCount,
      validityPeriod: {
        startDate: data.validityPeriod.startDate,
        endDate: data.validityPeriod.endDate,
      },
      eligibilityCriteria: {
        userTypes: data.eligibilityCriteria.userTypes.map(item => item.value),
        tiers: data.eligibilityCriteria.tiers.map(item => item.value),
        minPointsBalance: data.eligibilityCriteria.minPointsBalance,
      },
      usagePolicy: {
        frequency: data.usagePolicy.frequency,
        maxUsagePerPeriod: data.usagePolicy.maxUsagePerPeriod,
        maxTotalUsage: data.usagePolicy.maxTotalUsage,
      },
      conditions: {
        appType: data.conditions.appType.map(item => item.value),
        minTransactionValue: data.conditions.minTransactionValue,
        maxTransactionValue: data.conditions.maxTransactionValue,
        applicablePaymentMethods: data.conditions.applicablePaymentMethods.map(item => item.value),
      },
      termsAndConditions: data.termsAndConditions,
    };
      
    console.log("Submitting offer:", formData);
    
    createMutation.mutate(formData, {
        onSuccess: (data) => {
          addToast({
            type: "success",
            message: data?.message,
          });
        },
        onError: (error) => {
          addToast({
            type: "error",
            message: error?.response?.data?.message,
          });
        },
      });
    // onClose();
  };

  const addTermsAndCondition = () => {
    const currentTerms = watchTermsAndConditions || [];
    setValue("termsAndConditions", [...currentTerms, ""]);
  };

  const removeTermsAndCondition = (index) => {
    const currentTerms = watchTermsAndConditions || [];
    const updatedTerms = currentTerms.filter((_, i) => i !== index);
    setValue("termsAndConditions", updatedTerms);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  const sectionHeadingClass = "text-sm font-medium text-gray-700 mb-3";
  const cardClass = "bg-white p-4 rounded-lg shadow-sm border border-gray-100";

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-4xl p-4 max-h-[80vh] overflow-y-auto mt-17">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">
            {editData ? "Edit Offer" : "Add New Offer"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Basic Offer Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Offer Code</label>
                <input
                  {...register("code", { required: "Offer code is required" })}
                  className={inputClass}
                  placeholder="Enter unique offer code"
                />
                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Title</label>
                <input
                  {...register("title", { required: "Offer title is required" })}
                  className={inputClass}
                  placeholder="Offer title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Merchant</label>
                <select
                  {...register("merchantId", { required: "Merchant is required" })}
                  className={inputClass}
                >
                  <option value="">Select Merchant</option>
                  {merchants?.data?.map((merchant) => (
                    <option key={merchant._id} value={merchant._id}>
                      {merchant.title}
                    </option>
                  ))}
                </select>
                {errors.merchantId && <p className="text-red-500 text-xs mt-1">{errors.merchantId.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Coupon Category</label>
                <select
                  {...register("couponCategoryId", { required: "Coupon Category is required" })}
                  className={inputClass}
                >
                  <option value="">Select Coupon Category</option>
                  {couponCategories?.data?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors.couponCategoryId && <p className="text-red-500 text-xs mt-1">{errors.couponCategoryId.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className={inputClass}
                placeholder="Offer description"
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Discount Configuration</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Discount Type</label>
                <select
                  {...register("discountDetails.type", { required: "Discount type is required" })}
                  className={inputClass}
                >
                  <option value="">Select Type</option>
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed Amount</option>
                </select>
                {errors.discountDetails?.type && <p className="text-red-500 text-xs mt-1">{errors.discountDetails.type.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Discount Value</label>
                <input
                  type="number"
                  {...register("discountDetails.value", { 
                    required: "Discount value is required",
                    min: { value: 0, message: "Discount value must be positive" }
                  })}
                  className={inputClass}
                  placeholder="Discount amount"
                />
                {errors.discountDetails?.value && <p className="text-red-500 text-xs mt-1">{errors.discountDetails.value.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Redeemable Points</label>
                <input
                  type="number"
                  {...register("redeemablePointsCount", {
                    min: { value: 0, message: "Points must be non-negative" }
                  })}
                  className={inputClass}
                  placeholder="Points required"
                />
                {errors.redeemablePointsCount && <p className="text-red-500 text-xs mt-1">{errors.redeemablePointsCount.message}</p>}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Offer Validity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date</label>
                <input
                  type="date"
                  {...register("validityPeriod.startDate", { required: "Start date is required" })}
                  className={inputClass}
                />
                {errors.validityPeriod?.startDate && <p className="text-red-500 text-xs mt-1">{errors.validityPeriod.startDate.message}</p>}
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="date"
                  {...register("validityPeriod.endDate", { 
                    required: "End date is required",
                    validate: (value) => {
                      const startDate = watch("validityPeriod.startDate");
                      return !startDate || new Date(value) >= new Date(startDate) || "End date must be after start date";
                    }
                  })}
                  className={inputClass}
                />
                {errors.validityPeriod?.endDate && <p className="text-red-500 text-xs mt-1">{errors.validityPeriod.endDate.message}</p>}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Eligibility Criteria</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>User Types</label>
                <Controller
                  name="eligibilityCriteria.userTypes"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={userTypeOptions}
                      className={`basic-multi-select`}
                      classNamePrefix="select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #E5E7EB",
                          borderRadius: "0.375rem",
                          padding: "2px",
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: "#10B981",
                          },
                        }),
                      }}
                    />
                  )}
                />
              </div>
              <div>
                <label className={labelClass}>Tiers</label>
                <Controller
                  name="eligibilityCriteria.tiers"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={tierOptions}
                      className={`basic-multi-select`}
                      classNamePrefix="select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #E5E7EB",
                          borderRadius: "0.375rem",
                          padding: "2px",
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: "#10B981",
                          },
                        }),
                      }}
                    />
                  )}
                />
              </div>
              <div>
                <label className={labelClass}>Minimum Points Balance</label>
                <input
                  type="number"
                  {...register("eligibilityCriteria.minPointsBalance", {
                    min: { value: 0, message: "Minimum points must be non-negative" }
                  })}
                  className={inputClass}
                  placeholder="Minimum points required"
                />
                {errors.eligibilityCriteria?.minPointsBalance && <p className="text-red-500 text-xs mt-1">{errors.eligibilityCriteria.minPointsBalance.message}</p>}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Usage Policy</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Usage Frequency</label>
                <select
                  {...register("usagePolicy.frequency", { required: "Usage frequency is required" })}
                  className={inputClass}
                >
                  <option value="">Select Frequency</option>
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="TOTAL">Total</option>
                </select>
                {errors.usagePolicy?.frequency && <p className="text-red-500 text-xs mt-1">{errors.usagePolicy.frequency.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Max Usage Per Period</label>
                <input
                  type="number"
                  {...register("usagePolicy.maxUsagePerPeriod", { 
                    required: "Max usage is required",
                    min: { value: 1, message: "Max usage must be at least 1" }
                  })}
                  className={inputClass}
                  placeholder="Max uses"
                />
                {errors.usagePolicy?.maxUsagePerPeriod && <p className="text-red-500 text-xs mt-1">{errors.usagePolicy.maxUsagePerPeriod.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Max Total Usage</label>
                <input
                  type="number"
                  {...register("usagePolicy.maxTotalUsage", {
                    min: { value: 0, message: "Max total usage must be non-negative" }
                  })}
                  className={inputClass}
                  placeholder="Unlimited if left blank"
                />
                {errors.usagePolicy?.maxTotalUsage && <p className="text-red-500 text-xs mt-1">{errors.usagePolicy.maxTotalUsage.message}</p>}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Offer Conditions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Applicable App Types</label>
                <Controller
                  name="conditions.appType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={appTypeOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
              <div>
                <label className={labelClass}>Applicable Payment Methods</label>
                <Controller
                  name="conditions.applicablePaymentMethods"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={paymentMethodOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelClass}>Minimum Transaction Value</label>
                <input
                  type="number"
                  {...register("conditions.minTransactionValue", {
                    min: { value: 0, message: "Minimum transaction value must be non-negative" }
                  })}
                  className={inputClass}
                  placeholder="Minimum transaction value"
                />
                {errors.conditions?.minTransactionValue && <p className="text-red-500 text-xs mt-1">{errors.conditions.minTransactionValue.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Maximum Transaction Value</label>
                <input
                  type="number"
                  {...register("conditions.maxTransactionValue", {
                    min: { value: 0, message: "Maximum transaction value must be non-negative" }
                  })}
                  className={inputClass}
                  placeholder="Maximum transaction value (optional)"
                />
                {errors.conditions?.maxTransactionValue && <p className="text-red-500 text-xs mt-1">{errors.conditions.maxTransactionValue.message}</p>}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={sectionHeadingClass}>Terms and Conditions</h3>
              <button
                type="button"
                onClick={addTermsAndCondition}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                Add Term
              </button>
            </div>
            {watchTermsAndConditions?.map((term, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  {...register(`termsAndConditions.${index}`, {
                    required: "Term cannot be empty"
                  })}
                  className={inputClass}
                  placeholder={`Term ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeTermsAndCondition(index)}
                  className="ml-2 text-red-500 hover:bg-red-50 p-1 rounded"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
                {errors.termsAndConditions?.[index] && <p className="text-red-500 text-xs ml-2">{errors.termsAndConditions[index].message}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;