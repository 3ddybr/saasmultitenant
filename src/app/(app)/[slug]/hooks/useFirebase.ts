import { useEffect, useState } from 'react'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { v4 as createId } from 'uuid'
import { storage, firestoreDB } from '@/app/services/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { VehiclesDataProps } from '@/app/types/vehiclesDataProps'
import { useStorage } from '../contexts/useStorage'

type ImageProps = {
  imgRefFullPath: string
  imgUrl: string
}

export function useFirebase() {
  const [progress, setProgress] = useState(0)
  const { refImage, updateRefImages, deleteImgContext } = useStorage()
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const currentUrl = window.location.href
    const urlSplit = currentUrl.split('.')[0]
    const slugSplit = urlSplit.split('//')[1]

    // if (slug === tenant1 || customdomain) { setslug(vehicles) } else { setSlug(slug)}
    if (
      slugSplit === 'tenant1' ||
      slugSplit === 'tenant2' ||
      slugSplit === 'customdomain'
    ) {
      setSlug('vehicles')
    } else {
      setSlug(slugSplit)
    }
    // const SearchUserSlug = async (slugSplit: string) => {
    //   const usersCol = collection(firestoreDB, `users`)
    //   const q = query(usersCol, where('slug', '==', slugSplit))
    //   const slugSnapshot = await getDocs(q)
    //   const vehiclesList = slugSnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   })) as VehiclesDataProps[]
    //   return vehiclesList
    // }
    // console.log('dentro useFirebase', slugSplit)
  }, [])
  // console.log('dentro do firebase linha 42', slug)

  // Insert images to firebase and get the image url.
  function startUpload(file: File) {
    if (!file) {
      return
    }
    const fileId = createId()
    const formatFile = file.type.split('/')[1]
    // compor storageRef com slugImagesCars
    const storageRef = ref(storage, `imagesCars/${fileId}.${formatFile}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress1 =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress1)
        return progress1
      },
      (error) => {
        console.log('Error on upload image', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const refImg: ImageProps = {
            imgRefFullPath: uploadTask.snapshot.ref.fullPath,
            imgUrl: downloadURL,
          }
          const progress2 =
            (uploadTask.snapshot.bytesTransferred /
              uploadTask.snapshot.totalBytes) *
            100
          // setRefImage((prevState: ImageProps[]) => [...prevState, refImg])
          // setRefImage((prevState) => [...prevState, refImg])
          updateRefImages(refImg)
          // setRefImage(refImg)
          setProgress(progress2)
        })
      },
    )
  }

  // deletar imagem da lista de images e do firebase
  const deleteImg = async (refImg: string | undefined) => {
    const imgRef = ref(storage, refImg)

    await deleteObject(imgRef)
      .then(() => {
        const refFilter = refImage.filter(
          (ref) => ref.imgRefFullPath !== refImg,
        )

        deleteImgContext(refFilter)
        // File deleted successfully
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  // getAll Vehicles
  const getAllVehicles = async () => {
    const vehiclesCol = collection(firestoreDB, `${slug}`)
    const vehiclesSnapshot = await getDocs(vehiclesCol)
    const vehiclesList = vehiclesSnapshot.docs.map((doc) => doc.data())
    return vehiclesList
  }

  // getVehicles por id
  const getVehicle = async (id: string) => {
    if (slug !== '') {
      const vehiclesCol = doc(firestoreDB, `${slug}`, id)
      const vehiclesSnapshot = await getDoc(vehiclesCol)
      const data = { ...vehiclesSnapshot.data(), id: vehiclesSnapshot.id }
      return data as VehiclesDataProps
    } else {
      return {}
    }
  }

  // get limit Vehicles
  const getLimitVehicles = async (quant: number) => {
    if (slug !== '') {
      const vehiclesCol = collection(firestoreDB, `${slug}`)
      const q = query(vehiclesCol, limit(quant))
      const vehiclesSnapshot = await getDocs(q)
      const vehiclesList = vehiclesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as VehiclesDataProps[]
      return vehiclesList
    } else {
      return []
    }
  }

  const InsertVehicle = async (data: object) => {
    const vehiclesCol = collection(firestoreDB, `${slug}`)
    const docRef = await addDoc(vehiclesCol, { ...data, refImage })

    return docRef
  }

  const UpdateVehicle = async (data: object, id: string) => {
    const vehiclesCol = doc(firestoreDB, `${slug}`, id)
    await updateDoc(vehiclesCol, data)
  }

  const SearchVehicleTypeBrand = async (type: string, brand: string) => {
    const vehiclesCol = collection(firestoreDB, `${slug}`)
    const q = query(
      vehiclesCol,
      where('type', '==', type),
      where('brand', '==', brand),
    )
    const vehiclesSnapshot = await getDocs(q)
    const vehiclesList = vehiclesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as VehiclesDataProps[]
    return vehiclesList
  }

  const SearchVehicleType = async (type: string) => {
    const vehiclesCol = collection(firestoreDB, `${slug}`)
    const q = query(vehiclesCol, where('type', '==', type))
    const vehiclesSnapshot = await getDocs(q)
    const vehiclesList = vehiclesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as VehiclesDataProps[]
    return vehiclesList
  }

  const deleteVehicle = async (id: string) => {
    await deleteDoc(doc(firestoreDB, `${slug}`, id))
  }

  return {
    startUpload,
    progress,
    deleteImg,
    getAllVehicles,
    getVehicle,
    getLimitVehicles,
    InsertVehicle,
    UpdateVehicle,
    SearchVehicleType,
    SearchVehicleTypeBrand,
    deleteVehicle,
    slug,
  }
}
