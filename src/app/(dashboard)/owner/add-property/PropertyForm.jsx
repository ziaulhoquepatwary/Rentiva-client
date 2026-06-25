"use client";

function PropertyForm({
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    amenitiesWatch,
    imagesWatch,
    amenityInput,
    setAmenityInput,
    imageInput,
    setImageInput,
    addAmenity,
    removeAmenity,
    addImage,
    removeImage
}) {
    const handleAmenityKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addAmenity();
        }
    };

    const handleImageKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addImage();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-sm font-medium mb-1">Property Title</label>
                <input
                    type="text"
                    placeholder="Enter property title"
                    {...register("title", { required: "Property title is required" })}
                    className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    placeholder="Enter property description"
                    {...register("description", { required: "Description is required" })}
                    rows={4}
                    className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                        type="text"
                        placeholder="e.g. 123 Main Street, Dhaka"
                        {...register("location", { required: "Location is required" })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Property Type</label>
                    <select
                        {...register("propertyType", { required: "Property type is required" })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    >
                        <option value="">Select Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="cottage">Cottage</option>
                        <option value="studio">Studio</option>
                        <option value="duplex">Duplex</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="office">Office Room</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.propertyType && (
                        <p className="text-xs text-red-500 mt-1">{errors.propertyType.message}</p>
                    )}
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Rent Amount</label>
                    <input
                        type="number"
                        placeholder="Enter rent amount"
                        {...register("rent", { required: "Rent amount is required", min: { value: 1, message: "Rent must be a positive number" } })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    {errors.rent && <p className="text-xs text-red-500 mt-1">{errors.rent.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Rent Type</label>
                    <select
                        {...register("rentType", { required: "Rent type is required" })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    >
                        <option value="">Select rent type</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                    </select>
                    {errors.rentType && <p className="text-xs text-red-500 mt-1">{errors.rentType.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Bedrooms</label>
                    <input
                        type="number"
                        placeholder="0"
                        {...register("bedrooms", { required: "Required", min: { value: 0, message: "Cannot be negative" } })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    {errors.bedrooms && <p className="text-xs text-red-500 mt-1">{errors.bedrooms.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Bathrooms</label>
                    <input
                        type="number"
                        placeholder="0"
                        {...register("bathrooms", { required: "Required", min: { value: 0, message: "Cannot be negative" } })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    {errors.bathrooms && <p className="text-xs text-red-500 mt-1">{errors.bathrooms.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Property Size (sq ft)</label>
                    <input
                        type="number"
                        placeholder="0"
                        {...register("propertySize", { required: "Required", min: { value: 1, message: "Must be positive" } })}
                        className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    {errors.propertySize && <p className="text-xs text-red-500 mt-1">{errors.propertySize.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Amenities</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyDown={handleAmenityKeyDown}
                        placeholder="e.g. WiFi, Parking, Gym (Press Enter to add)"
                        className="flex-1 px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    <button
                        type="button"
                        onClick={addAmenity}
                        className="px-4 py-2 bg-[#76ABAE] text-white font-medium text-sm rounded-xl hover:opacity-90 transition-all cursor-pointer"
                    >
                        Add
                    </button>
                </div>
                <input type="hidden" {...register("amenities", { validate: v => (v && v.length > 0) || "At least one amenity must be added" })} />
                {errors.amenities && <p className="text-xs text-red-500 mt-1">{errors.amenities.message}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                    {amenitiesWatch.map((item, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#E2E8F0] text-[#1B3C53] dark:bg-[#64748B] dark:text-[#EEEEEE]">
                            {item}
                            <button type="button" onClick={() => removeAmenity(idx)} className="text-red-500 font-bold ml-1 cursor-pointer">×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Property Images (URLs)</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        onKeyDown={handleImageKeyDown}
                        placeholder="Image URL (Press Enter to add)"
                        className="flex-1 px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                    />
                    <button
                        type="button"
                        onClick={addImage}
                        className="px-4 py-2 bg-[#76ABAE] text-white font-medium text-sm rounded-xl hover:opacity-90 transition-all cursor-pointer"
                    >
                        Add
                    </button>
                </div>
                <input type="hidden" {...register("images", { validate: v => (v && v.length > 0) || "At least one image must be provided" })} />
                {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                    {imagesWatch.map((url, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#E2E8F0] text-[#1B3C53] dark:bg-[#64748B] dark:text-[#EEEEEE] truncate max-w-xs">
                            {url}
                            <button type="button" onClick={() => removeImage(idx)} className="text-red-500 font-bold ml-1 cursor-pointer">×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Extra Features (Optional)</label>
                <input
                    type="text"
                    placeholder="Enter any extra features"
                    {...register("extraFeatures")}
                    className="w-full px-4 py-2 text-sm rounded-xl border outline-none bg-slate-50 border-[#E2E8F0] text-[#1B3C53] focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:focus:border-[#76ABAE]"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-[#76ABAE] text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
            >
                {loading ? "Creating Property..." : "Create Property"}
            </button>
        </form>
    );
}

export default PropertyForm;