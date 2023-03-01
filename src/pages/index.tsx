import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import {selectProfile, fetchProfile, saveProfile, IUserProfile } from '../userProfileSlice';
import ProfileEditingForm from "../components/ProfileEditingForm";

export default function IndexPage() {
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const loadingStatus = useSelector((state: RootState) => state.userProfile.status)
  const [addRequestStatus, setAddRequestStatus] = React.useState('IDLE')

  React.useEffect(() => {
    if (loadingStatus === 'IDLE') {
      //@ts-ignore untyped
      dispatch(fetchProfile())
    }
  }, [loadingStatus, dispatch])

  const canSave = addRequestStatus === 'IDLE'

  async function doSubmit(data: IUserProfile) {
    if (canSave) {
      try {
        setAddRequestStatus('PENDING')
        // @ts-ignore untyped
        await dispatch(saveProfile(data)).unwrap()
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('IDLE')
      }
    }
  }

  return (
    <Layout>
      <div className="my-2 text-center">
        <div className="rounded-3xl w-20 h-20 bg-green-400 origin-center rotate-45 my-0 mx-auto">
        </div>
        <span className="relative text-white text-2xl font-bold" style={{ top: -55 }}>qred</span>
      </div>
      <h1 className="text-3xl text-center my-8">
        Edit your profile
      </h1>
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
        <ProfileEditingForm srcData={profile} onSubmit={doSubmit} />
      </div>
    </Layout>
  )
}

export const Head: HeadFC = () => <title>My Profile</title>
