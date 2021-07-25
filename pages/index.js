import Button from '@material-tailwind/react/Button'
import Head from 'next/head'
import Header from '../components/header'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import {getSession, useSession} from 'next-auth/client'
import Login from '../components/login'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import {useCollectionOnce} from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/documentrow'

export default function Home() {
  const [session] = useSession()
  if (!session) return <Login />
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [snapshot] = useCollectionOnce(
    db
    .collection('userDocs')
    .doc(session.user.email)
    .collection('docs')
    .orderBy('timestamp', 'desc')
  )
  const createDocument = () => {
    if (!input) return;

    db.collection('userDocs')
    .doc(session.user.email)
    .collection('docs')
    .add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('')
    setShowModal(false)
  }
  function deleteDoument(id) {
    db
    .collection('userDocs')
    .doc(session.user.email)
    .collection('docs')
    .doc(id)
    .delete()
  }

  const modal = (

    <Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='text'
        className='outline-none w-full'
        placeholder='Enter name of document..'
        onKeyDown={(e) => e.key === 'Enter' && createDocument()}/>
      </ModalBody>

      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={(e) => setShowModal(false)}
          ripple='dark'>
            Cancel
        </Button>

        <Button
          color='blue' onClick={createDocument} ripple='light'>
          Create
        </Button>
      </ModalFooter>

    </Modal>

  )

  return (
    <div>
      <Head>
        <title>Google Docs - Rizky Adi Satria</title>
        <link rel="icon" href="/Google.ico" />
      </Head>

      <Header />
      {modal}
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new documents</h2>
            <Button
              color="gray"
              buttonType='outline'
              iconOnly={true}
              ripple='dark'
              className="border-0"
            >
              <Icon name="more_vert" size="3xl"/>
            </Button>
          </div>

          <div>
            <div 
            onClick={() => setShowModal(true)} 
            className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
            <Image src='https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png'
            layout='fill'/>
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank</p>
          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-10'>
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-md flex-grow">My Documents</h2>
            <p className="mr-12 italic">Date Created</p> 
            <Icon name='folder' size='3xl' color='gray'/>
          </div>
        
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
              onDelete={deleteDoument}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }

}
