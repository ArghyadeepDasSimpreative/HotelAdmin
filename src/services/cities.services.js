import { apiPrivate } from "../api/config"

export function getCities () {
    return apiPrivate.get("/cities")
}