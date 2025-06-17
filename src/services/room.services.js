import { apiPrivate, apiPrivateForm } from "../api/config"

export function getRoomsPerOwner () {
    return apiPrivate.get("/rooms");
}

export function getRoomsPerProperty (propertyId) {
    return apiPrivate.get(`/rooms/${propertyId}`)
}

export function toggleRoomActiveStatus (propertyId, roomId) {
    return apiPrivate.put(`/rooms/${propertyId}/room/${roomId}/toggle-active`)
}
export function getRoomDetails (propertyId, roomId) {
    return apiPrivate.get(`/rooms/${propertyId}/room/${roomId}`);
}

export function createRoom (propertyId, payload) {
    return apiPrivateForm(`/rooms/${propertyId}`, payload);
}

export function deleteImageFromRoom(propertyId, roomId, image) {
    return apiPrivate.delete(`/rooms/${propertyId}/room/${roomId}/image/${image}`)
}

export function addImageForRoom(propertyId, roomId, payload) {
    return apiPrivateForm.post(`/rooms/${propertyId}/room/${roomId}/image`, payload)
}