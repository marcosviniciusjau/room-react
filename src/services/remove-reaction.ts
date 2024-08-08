import { api } from "./api"

export async function removeReaction(roomId: string, messageId: string) {
 await api.delete(`/rooms/${roomId}/messages/${messageId}/react`)
}
