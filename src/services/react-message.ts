import { api } from "./api"

export async function reactMessage(roomId: string, messageId: string) {
 await api.patch(`/rooms/${roomId}/messages/${messageId}/react`)
}
