import { useParams } from "react-router-dom"

import logo from '../assets/logo.svg'
import { ArrowRight, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Messages } from "../components/messages"
import { Suspense } from "react"
import { CreateMessage } from "../components/create-message"
export function Room(){
  const {roomId} = useParams()

  async function handleShareRoom(){
    const url = window.location.href.toString()

    if(navigator.share != undefined && navigator.canShare()){
      navigator.share({url})
    }else{
      navigator.clipboard.writeText(url)
      
      toast.info("Sala copiada com sucesso")
    }
    
  }
  return (
   <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
    <div className="flex items-center gap-3 px-3">
    <img src={logo} alt="Logo" className='h-5'/>
     
     <span className="text-sm text-zinc-500 truncate">
      Sala <span className="text-zinc-300">{roomId}</span>
    </span>
      <button onClick={handleShareRoom} type="submit"className='ml-auto bg-zinc-700 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-md font-medium text-sm transition-colors: hover:bg-zinc-700'>
        Compartilhar 
        <Share2 className='size-4'/>
      </button>
    </div>
      <div className="h-px w-full bg-zinc-900"/>
      <CreateMessage />

     <Suspense fallback={<p>Carregando...</p>}>
      <Messages/>
     </Suspense>
   </div>
  )
}