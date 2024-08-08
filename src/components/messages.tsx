import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getMessages } from "../services/get-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
export function Messages(){
  const {roomId} = useParams()

  if(!roomId){
    throw new Error("As mensagens devem ter um id de sala")
  }

  const { data }= useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getMessages(roomId),
  })
  return (
    <ol className="list-decimal list-inside px-3 space-y-8">
      {data.messages.map(message=>{
        return (
          <Message 
            key={message.id}
            id={message.id}
            text={message.text}
            amountReactions={message.amountReactions} 
            answered={message.answered}
          />
        )
       })}
  </ol>
  )
}