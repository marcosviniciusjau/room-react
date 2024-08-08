import { api } from "./api"

export async function createMessage(roomId: string, message: string) {
  const response = await api.post(`/rooms/${roomId}/messages`,{
    message,
  })
  
  const data: {id: string} = response.data
  return {messageId: data.id}
}
