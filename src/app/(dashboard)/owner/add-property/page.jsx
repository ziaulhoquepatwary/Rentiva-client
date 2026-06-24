"use client";

import { createPropertyApi } from "@/lib/actions/property";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import PropertyForm from "./PropertyForm";

function AddProperty() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
        defaultValues: {
            amenities: [],
            images: []
        }
    });

    const [loading, setLoading] = useState(false);

    const amenitiesWatch = watch("amenities") || [];
    const imagesWatch = watch("images") || [];

    const [amenityInput, setAmenityInput] = useState("");
    const [imageInput, setImageInput] = useState("");

    const addAmenity = () => {
        if (amenityInput.trim()) {
            setValue("amenities", [...amenitiesWatch, amenityInput.trim()]);
            setAmenityInput("");
        }
    };

    const removeAmenity = (indexToRemove) => {
        setValue("amenities", amenitiesWatch.filter((_, idx) => idx !== indexToRemove));
    };

    const addImage = () => {
        if (imageInput.trim()) {
            setValue("images", [...imagesWatch, imageInput.trim()]);
            setImageInput("");
        }
    };

    const removeImage = (indexToRemove) => {
        setValue("images", imagesWatch.filter((_, idx) => idx !== indexToRemove));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formattedData = {
                ...data,
                rent: Number(data.rent),
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
                propertySize: Number(data.propertySize),
            };

            await createPropertyApi(formattedData);

            Swal.fire({
                icon: "success",
                title: "Property Added!",
                text: "Your property has been added successfully.",
                confirmButtonColor: "#76ABAE",
                confirmButtonText: "Go to My Properties"
            }).then(() => {
                reset();
                setValue("amenities", []);
                setValue("images", []);
                router.push("/owner/my-properties");
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add property";

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: errorMessage,
                confirmButtonColor: "#76ABAE"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#1B3C53] dark:text-[#EEEEEE]">Add New Property</h2>

            <PropertyForm
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                loading={loading}
                amenitiesWatch={amenitiesWatch}
                imagesWatch={imagesWatch}
                amenityInput={amenityInput}
                setAmenityInput={setAmenityInput}
                imageInput={imageInput}
                setImageInput={setImageInput}
                addAmenity={addAmenity}
                removeAmenity={removeAmenity}
                addImage={addImage}
                removeImage={removeImage}
            />
        </div>
    );
}

export default AddProperty;