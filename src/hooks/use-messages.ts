import { useEffect } from "react"
import { GetMessagesResponse } from "../services/get-messages"
import { useQueryClient } from "@tanstack/react-query"

type WebhookMessage = 
  | {Kind: "message_created", Value: {ID: string, Message: string}}
  | {Kind: "message_answered", Value: {ID: string}}
  | {Kind: "message_reaction_increased", Value: {ID: string, count: number}}
  | {Kind: "message_reaction_decreased", Value: {ID: string, count: number}}

export function useMessages(roomId: string){
  const queryClient = useQueryClient()
  useEffect(()=>{
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)
    ws.onopen = () => {
      console.log("Conectado")
    }
    ws.onmessage = (event) => {
      const data: WebhookMessage = JSON.parse(event.data)
      switch(data.Kind){
        case "message_created":
          queryClient.setQueryData<GetMessagesResponse>(["messages", roomId], state =>{
            return {
              messages: [
              ...(state?.messages ?? []),
              {
                id: data.Value.ID,
                text: data.Value.Message,
                amountReactions: 0,
                answered: false
              }
            ],
            }
          })
          break
        case "message_answered":
          queryClient.setQueryData<GetMessagesResponse>(["messages", roomId], state => {
            if(!state){
              return undefined
            }
            return {
              messages: state.messages.map(item => {
                if(item.id === data.Value.ID){
                  return {
                    ...item,
                    answered: true
                  }
                }
              return item
              }),
            }
          })
          break
        case "message_reaction_increased":
        case "message_reaction_decreased":
          queryClient.setQueryData<GetMessagesResponse>(["messages", roomId], state => {
              if(!state){
                return undefined
              }
              return {
                messages: state.messages.map(item => {
                  if(item.id === data.Value.ID){
                    return {
                      ...item,
                      amountReactions: data.Value.count
                    }
                  }
                return item
                }),
              }
            })
            break
          
          default:
          break
      }
    }
  },[roomId, queryClient])
}
