import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { reactMessage } from "../services/react-message";
import { removeReaction } from "../services/remove-reaction";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface MessageProps {
  id: string
  text: string
  amountReactions: number
  answered?: boolean
}
export function Message({ id: messageId ,text, amountReactions, answered=false }: MessageProps) {
   const [hasReacted, setHasReacted] = useState(false)

   const {roomId} = useParams()
   if(!roomId){
    throw new Error("As mensagens devem ter um id de sala")
  }
   async function handleReact(){
    if(!roomId){
      return
    }
    try {
      await reactMessage(roomId, messageId)
    } catch (error) {
      toast.error("Ocorreu um erro ao curtir a pergunta")
    }
    
    setHasReacted(true)
   }
  async function handleRemoveReaction(){
    if(!roomId){
      return
    }
    try {
        await removeReaction(roomId, messageId)
      } catch (error) {
        toast.error("Ocorreu um erro ao descurtir a pergunta")
      }
      setHasReacted(false)
     }
  
return(  
  <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
    {text}
    
  { hasReacted ? (
        <button  onClick={handleRemoveReaction} type="button" className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500">
          <ArrowUp className='size-4'/>
            Curtir pergunta - {amountReactions}
        </button>
    ): (
        <button onClick={handleReact} type="button" className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-100">
            <ArrowUp className='size-4'/>
            Curtir pergunta- {amountReactions}
        </button>       
    )}

  </li>
)
}
