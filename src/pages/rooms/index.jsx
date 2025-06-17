import { useEffect, useState } from "react";
import { FiEye, FiEdit2 } from "react-icons/fi";
import Switch from "react-switch";
import Button from "../../components/Button";
import ModalComponent from "../../components/Modal";
import CreatePropertyModal from "./CreateProperty";
import TableComponent from "../../components/Table";
import { getRoomsPerOwner, toggleRoomActiveStatus } from "../../services/room.services";
import { showToast } from "../../utils/toast";
import { capitalizeFirstLetter } from "../../utils/text";
import { useNavigate } from "react-router-dom";

const RoomsPage = () => {
    const [roomsList, setRoomsList] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [propertyModalOpen, setPropertyModalOpen] = useState(false);

    const navigate = useNavigate();

    const getRoomsByAPI = async () => {
        try {
            const response = await getRoomsPerOwner();
            const roomsTemp = response.data.rooms.map((item, index) => ({
                serial: index + 1,
                id: item._id,
                name: item.propertyId.name,
                number: item.roomNumber,
                type: item.roomType,
                pricePerNight: `₹${item.pricePerNight}`,
                capacity: `${item.capacity} people`,
                image: item.thumbnail,
                propertyId: item.propertyId?._id,
                propertyName: item.propertyId?.name || "N/A",
                isActive: item.isActive,
            }));
            setRoomsList(roomsTemp);
        } catch (err) {
            showToast.error(
                err?.response?.data?.message || "Some error occurred while fetching the rooms."
            );
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        getRoomsByAPI();
    }, []);

    const handlePropertyModalOpen = () => {
        setPropertyModalOpen(true);
    };

    const handleToggleStatus = async(propertyId, roomId) => {
        try {
            let response = await toggleRoomActiveStatus(propertyId, roomId);
            if(response.status ==200) {
                showToast.success("Room status updated successfully.");
                getRoomsByAPI();
            }
            else {
                throw new Error();
            }
        }
        catch(err) {
            console.log(err);
        }
    };

    const handleEditRoom = (room) => {
        navigate(`/owner/rooms/${room.propertyId}/room/${room.id}`)
    }

    const config = [
        { key: "serial", label: "ID" },
        { key: "name", label: "Room Name" },
        { key: "number", label: "Room Number" },
        { key: "type", label: "Type", render: (row) => <span>{capitalizeFirstLetter(row.type)}</span> },
        { key: "pricePerNight", label: "Price/Night" },
        { key: "capacity", label: "Capacity" },
        { key: "propertyName", label: "Property" },
        {
            key: "isActive",
            label: "Status",
            render: (row) => (
                <Switch
                    onChange={() => handleToggleStatus(row.propertyId, row.id)}
                    checked={row.isActive}
                    onColor="#22c55e"
                    offColor="#ef4444"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={20}
                    width={40}
                />
            ),
        },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <div className="flex gap-3 text-xl text-black">
                    <FiEye
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => console.log("View", row.id)}
                    />
                    <FiEdit2
                        className="cursor-pointer hover:text-green-600"
                        onClick={() => handleEditRoom(row)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 w-full min-h-screen">
            <ModalComponent
                isOpen={propertyModalOpen}
                onClose={() => setPropertyModalOpen(false)}
            >
                <CreatePropertyModal cb={() => {
                    showToast.success("Property created");
                    setPropertyModalOpen(false);
                }} />
            </ModalComponent>

            <div className="w-full flex justify-end items-center px-4 gap-2 mb-4">
                <Button label={"Add New Room"} onClick={() => navigate("/owner/rooms/create")} />
                <Button label={"Add Property"} onClick={handlePropertyModalOpen} />
            </div>

            {pageLoading ? (
                <p className="text-center text-lg font-medium text-gray-600">Loading...</p>
            ) : (
                <TableComponent data={roomsList} columns={config} label={"All Rooms"} />
            )}
        </div>
    );
};

export default RoomsPage;
