import TextEditor from '../../components/texteditor'
import Icon from '@material-tailwind/react/Icon'
import {useRouter} from 'next/dist/client/router'
import {db} from '../../firebase'
import {useDocumentOnce} from 'react-firebase-hooks/firestore'
import {getSession, signOut, useSession} from 'next-auth/client'
import Login from '../../components/login'


function Doc() {
    const [session] = useSession()
    if(!session) return <Login />

    const router = useRouter()
    const { id } = router.query
    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db
        .collection('userDocs')
        .doc(session.user.email)
        .collection('docs')
        .doc(id)
    )

    if (!loadingSnapshot && !snapshot?.data()?.fileName) {
        router.replace('/')
    }

    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1">
                <span onClick={() => router.push('/')} className="cursor-pointer">
                <Icon name='description' size='5xl' color='blue'/>
                </span>

                <div className="flex-grow px-2">
                    <h2>{snapshot?.data()?.fileName}</h2>
                </div>

                <img onClick={signOut} className="cursor-pointer rounded-full h-10 ml-2" 
                src={session.user.image} alt=''/>            
            </header>

            <TextEditor />
        </div>
    )
}

export default Doc

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session
        }
    }
}
