import { api } from "./api"

export interface GetMessagesResponse {
  messages: {
    id: string
    text: string
    amountReactions: number
    answered: boolean
  }[]
}
export async function getMessages(roomId: string):Promise<GetMessagesResponse> {
    const response = await api.get(`/rooms/${roomId}/messages`)

    const data: Array<{
      ID: string
      RoomID: string
      Message: string
      ReactionCount: number
      Answered: boolean
    }> = response.data
    return {
      messages: data.map(item=>{
        return {
          id: item.ID,
          text: item.Message,
          amountReactions: item.ReactionCount,
          answered: item.Answered
        }
      })
    }
}
