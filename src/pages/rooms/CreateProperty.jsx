import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import CustomSelect from "../../components/Select";
import FileUploader from "../../components/FileUploader";
import { getCities } from "../../services/cities.services";
import { getFeatures } from "../../services/features.services";
import { createProperty } from "../../services/property.services";
import { showToast } from "../../utils/toast";

const propertySchema = z.object({
    name: z.string().min(1, "Property name is required"),
    description: z.string().min(1, "Description is required"),
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
    type: z.string().min(1, "Type is required"),
    address: z.string().min(1, "Address is required"),
    cityId: z.string().min(1, "City is required"),
    featureId: z.array(z.string()).optional(),
    image: z.instanceof(File, { message: "Image is required" }),
});

export default function CreatePropertyModal({ cb }) {
    const [cities, setCities] = useState([]);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const cityConfig = { key: "_id", label: "name" };
    const featureConfig = { key: "_id", label: "name" };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            description: "",
            latitude: "",
            longitude: "",
            type: "",
            address: "",
            cityId: "",
            featureId: [],
            image: null,
        },
    });

    const loadData = async () => {
        try {
            const [citiesRes, featuresRes] = await Promise.all([
                getCities(),
                getFeatures(),
            ]);
            setCities(citiesRes.data.data);
            setFeatures(featuresRes.data.data);
        } catch (err) {
            showToast.error("Error fetching cities or features");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            for (const key in data) {
                if (key === "featureId") {
                    data.featureId.forEach((id) => formData.append("featureIds[]", id));
                } else {
                    formData.append(key, data[key]);
                }
            }

            await createProperty(formData);
            showToast.success("Property created successfully");
            cb && cb();
        } catch (err) {
            showToast.error("Failed to create property");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFeatureChange = (selected) => {
        const values = selected?.map((i) => i.value) || [];
        setValue("featureId", values);
    };

    const handleCityChange = (selected) => {
        setValue("cityId", selected?.value || "");
    };

    const handleTypeChange = (selected) => {
        setValue("type", selected?.value || "");
    };

    const handleImageChange = (file) => {
        setValue("image", file);
        setPreview(URL.createObjectURL(file));
    };

    const typeOptions = [
        { value: "hotel", label: "Hotel" },
        { value: "apartment", label: "Apartment" },
        { value: "resort", label: "Resort" },
        { value: "villa", label: "Villa" },
    ];

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Property Name"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <InputField
                        label="Description"
                        {...register("description")}
                        error={errors.description?.message}
                    />

                    <InputField
                        type="number"
                        label="Latitude"
                        {...register("latitude")}
                        error={errors.latitude?.message}
                    />

                    <InputField
                        label="Longitude"
                        {...register("longitude")}
                        error={errors.longitude?.message}
                    />

                    <InputField
                        label="Address"
                        {...register("address")}
                        error={errors.address?.message}
                    />

                    <CustomSelect
                        label="Property Type"
                        data={typeOptions}
                        config={{ key: "value", label: "label" }}
                        onSelect={handleTypeChange}
                        value={typeOptions.find((opt) => opt.value === watch("type"))}
                    />

                    <CustomSelect
                        label="City"
                        data={cities}
                        config={cityConfig}
                        onSelect={handleCityChange}
                        value={cities.find((c) => c._id === watch("cityId"))}
                    />

                    <CustomSelect
                        label="Features"
                        isMulti
                        data={features}
                        config={featureConfig}
                        onSelect={handleFeatureChange}
                        value={features.filter((f) => watch("featureId")?.includes(f._id))}
                    />
                </div>

                <div>
                    <FileUploader label="Upload Image" onFileSelect={handleImageChange} />
                    {errors.image && (
                        <p className="text-sm text-red-600">{errors.image.message}</p>
                    )}
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full max-h-60 mt-2 rounded-lg object-cover"
                        />
                    )}
                </div>

                <div className="text-right">
                    <Button label="Create Property" type="submit" loading={isLoading} />
                </div>
            </form>
        </div>
    );
}
