import {ArrowRight} from 'lucide-react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
export function CreateRoom(){
  const navigate = useNavigate()


  async function handleCreateRoom(data:FormData){
    const theme = data.get('theme')?.toString()
    if(!theme){
      return
    }
    try {
      const response = await api.post('/rooms',{
        theme
      })
      const data: {id: string} = response.data
      navigate(`/room/${data.id}`)
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
  return(
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={logo} alt="Logo" className='h-10'/>
        <p className='leading-relaxed text-zinc-300 text-center'>Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.</p>
      
        <form 
          action={handleCreateRoom}
          className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1">
            <input 
              type="text"
              name="theme"
              placeholder="Tema da sala"
              autoComplete='off'
              required
              className=" flex-1 bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
              />
           <button type="submit" className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-md font-medium text-sm transition-colors: hover:bg-orange-500'>
            <ArrowRight className='size-4'/>
            Criar sala
           </button>
        </form>
      </div>
    </main>
    
  )
}