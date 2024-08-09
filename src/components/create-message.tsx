import { toast } from "sonner"
import { AxiosError } from "axios"
import { useParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { createMessage } from "../services/create-message"
export function CreateMessage(){
  const {roomId} = useParams()
  async function createMessageAction(data: FormData){
    const message = data.get('message')?.toString()
    if(!message){
      return
    }
    if(!roomId){
      return
    }
    try {
      await createMessage(roomId, message)
    } catch (error) {
      if (error instanceof AxiosError){
        toast.error(error.response?.data)
      }
      else{
        console.error(error)
        toast.error("Ocorreu um erro ao criar a sala")
      }
    }
  }

  return (
    <form action={createMessageAction} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1">
    <input 
        type="text"
        name="message"
        placeholder="Qual a sua pergunta"
        autoComplete='off'
        required
        className=" flex-1 bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
        />
       <button type="submit" className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-md font-medium text-sm transition-colors: hover:bg-orange-500'>
        <ArrowRight className='size-4'/>
        Criar pergunta
       </button>
    </form>
  )
}