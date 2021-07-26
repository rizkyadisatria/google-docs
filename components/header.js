import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { signOut, useSession } from "next-auth/client"

function header() {
    const [session] = useSession()
    return (
        <header className="sticky top-0 z-50 flex items-center px-2 py-2 shadow-md bg-white">
            <Icon name='description' size='5xl' color='blue'/>
            <h1 className='hidden md:inline-flex ml-2 mr-10 text-gray-700 text-2xl'>Docs</h1>

            <div className='flex flex-grow items-center mx-2 px-2 py-2 bg-gray-100 
            text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md'>
                <Icon name='search' size='2xl' color='gray'/>
                <input type="text" placeholder='Search' className="flex-grow text-base bg-transparent outline-none ml-1"/>
            </div>

            <Button 
            color='gray' 
            buttonType='link' 
            rounded={true}
            iconOnly={true}
            ripple='dark'
            className='hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0'>
                <Icon name='apps' size='3xl' color='gray'/>
            </Button>
            

            <img
            onClick={signOut} 
            loading='lazy'
            className='cursor-pointer h-12 w-12 rounded-full ml-1'
            src={session?.user?.image} alt='' />

        </header>
    )
}
        
export default header
