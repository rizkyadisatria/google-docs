import Image from 'next/image'
import {signIn} from 'next-auth/client'
import Button from '@material-tailwind/react/Button'

function login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Image 
            src='https://i.pinimg.com/originals/c4/b7/e9/c4b7e910d6116073f9efd0e343342920.png'
            height='300'
            width='550'
            aobjectFit='contain'
            />
            <Button
                className='w-44 mt-10'
                color='blue'
                buttonType='filled'
                ripple='light'
                onClick={signIn}>
                Login
            </Button>
        </div>
    )
}

export default login
