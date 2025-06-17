import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addImageForRoom, getRoomDetails } from "../../services/room.services";
import { getCities } from "../../services/cities.services";
import { getFeatures } from "../../services/features.services";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import CustomSelect from "../../components/Select";
import { showToast } from "../../utils/toast";
import { z } from "zod";
import Imagecomponent from "../../components/Image";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteImageFromRoom } from "../../services/room.services";
import FileUploader from "../../components/FileUploader";

const roomSchema = z.object({
    roomNumber: z.string().min(1, "Room number is required"),
    roomType: z.string().min(1, "Room type is required"),
    description: z.string().optional(),
    bedCount: z.coerce.number().min(1, "At least 1 bed is required"),
    capacity: z.coerce.number().min(1, "At least 1 person"),
    pricePerNight: z.coerce.number().min(0, "Price must be at least ₹0"),
    cityId: z.string().min(1, "City is required"),
    featureIds: z.array(z.string()).optional(),
});

export default function EditRoom() {
    const { propertyId, roomId } = useParams();

    const [roomData, setRoomData] = useState(null);
    const [citiesList, setCitiesList] = useState([]);
    const [featuresList, setFeaturesList] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUploadLoading, setImageUploadLoading] = useState(false)

    const [formData, setFormData] = useState({
        roomNumber: "",
        roomType: "",
        description: "",
        bedCount: 1,
        capacity: 1,
        pricePerNight: 0,
        cityId: "",
        featureIds: [],
    });

    const [errors, setErrors] = useState({});

    const fetchInitialData = async () => {
        try {
            const [roomRes, citiesRes, featuresRes] = await Promise.all([
                getRoomDetails(propertyId, roomId),
                getCities(),
                getFeatures(),
            ]);

            console.log("city res is ", citiesRes)
            const room = roomRes.data.room;
            const cities = citiesRes.data.data;
            const features = featuresRes.data.data;

            setRoomData(room);
            setCitiesList(cities.map(city => ({
                label: city.name,
                value: city._id,
            })));

            setFeaturesList(features.map(feature => ({
                label: feature.name,
                value: feature._id,
            })));

            setFormData({
                name: room.propertyId.name || "",
                roomNumber: room.roomNumber || "",
                roomType: room.roomType || "",
                description: room.description || "",
                bedCount: room.bedCount || 1,
                capacity: room.capacity || 1,
                pricePerNight: room.pricePerNight || 0,
                cityId: room.propertyId?.cityId || "",
                featureIds: room.amenities || [],
            });

        } catch (err) {
            console.log(err)
            showToast.error("Failed to fetch room, cities or features");
        }
    };

    const handleSelectImageFile = (file) => {
        setImageFile(file);
    }

    const handleImageDelete = async (image) => {
        try {
            const res = await deleteImageFromRoom(propertyId, roomId, image);
            showToast.success("Image deleted successfully");
            fetchInitialData();
        } catch (err) {
            console.error(err);
            showToast.error("Failed to delete image");
        }
    };


    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const result = roomSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach(err => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        console.log("Updated Room Details:", formData);
        showToast.success("Room data validated successfully");
    };

    if (!roomData) return <p className="text-center mt-10">Loading room details...</p>;

    const config = {
        label: "label", value: "value"
    }

    const handleImageUpload = async () => {
        try {
            console.log("property ", propertyId, " room is ", roomId);
            console.log("image file is ", imageFile)
            setImageUploadLoading(true);
            const payload = new FormData();
            payload.append("image", imageFile)
            const response = await addImageForRoom(propertyId, roomId, payload);
            if (response.data.success) {

                showToast.info(response.data.message);
                fetchInitialData();
            }
            else {
                throw new Error();
            }
        }
        catch (err) {
            console.log(err)
            showToast.error(err?.response?.data?.message)
        }
        finally {
            setImageUploadLoading(false);
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Edit Room - {roomData.propertyId?.name}</h2>

            <div className="w-full flex flex-wrap gap-3 mb-5">
                {
                    roomData.images.length < 1 && <p className="text-lg border border-slate-300 rounded-md px-3 py-2">No images found</p>
                }
                {roomData.images?.map((image, index) => (
                    <div key={index} className="flex flex-col">
                        <Imagecomponent src={image} className="w-[200px] h-[120px]" />
                        <div className="w-full flex justify-center gap-3 mt-2">
                            <button
                                className="bg-red-600 text-white flex justify-center items-center gap-2 px-3 py-1 rounded-md cursor-pointer hover:bg-red-700 transition-all duration-300"
                                onClick={() => handleImageDelete(image)}
                            >
                                <FaRegTrashAlt /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <FileUploader label="Upload Image" onFileSelect={(file) => setImageFile(file)} />
            {imageFile && <Button label={"Confirm Upload"} onClick={handleImageUpload} loading={imageUploadLoading} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <InputField
                    label="Room Name"
                    value={formData.name}
                    onChange={e => handleChange("name", e.target.value)}
                    error={errors.roomNumber}
                />
                <InputField
                    label="Room Number"
                    value={formData.roomNumber}
                    onChange={e => handleChange("roomNumber", e.target.value)}
                    error={errors.roomNumber}
                />
                <InputField
                    label="Room Type"
                    value={formData.roomType}
                    onChange={e => handleChange("roomType", e.target.value)}
                    error={errors.roomType}
                />
                <InputField
                    label="Bed Count"
                    type="number"
                    value={formData.bedCount}
                    onChange={e => handleChange("bedCount", e.target.value)}
                    error={errors.bedCount}
                />
                <InputField
                    label="Capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={e => handleChange("capacity", e.target.value)}
                    error={errors.capacity}
                />
                <InputField
                    label="Price Per Night (₹)"
                    type="number"
                    value={formData.pricePerNight}
                    onChange={e => handleChange("pricePerNight", e.target.value)}
                    error={errors.pricePerNight}
                />
                <InputField
                    label="Description"
                    type="text"
                    value={formData.description}
                    onChange={e => handleChange("description", e.target.value)}
                    error={errors.description}
                />

                {/* Single select - City */}
                <CustomSelect
                    label="City"
                    data={citiesList}
                    config={config}
                    defaultValue={citiesList.find(c => c.value === formData.cityId)}

                    onSelect={(val) => handleChange("cityId", val?.value)}
                    error={errors.cityId}
                />

                {/* Multi select - Features */}
                <CustomSelect
                    label="Features"
                    data={featuresList}
                    config={config}
                    defaultValue={featuresList.filter(f => formData.featureIds.includes(f.value))}
                    onSelect={(vals) => handleChange("featureIds", vals.map(v => v.value))}
                    isMulti
                />
            </div>

            <div className="mt-6">
                <Button label="Update Room" onClick={handleSubmit} />
            </div>
        </div>
    );
}
