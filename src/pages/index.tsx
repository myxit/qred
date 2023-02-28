import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"
import TextInput from "../components/TextInput"

export default function IndexPage() {
  return (
    <Layout>
      <div className="my-2 text-center">
        <div className="rounded-3xl w-20 h-20 bg-green-400 origin-center rotate-45 my-0 mx-auto">
        </div>
        <span className="relative text-white text-2xl font-bold" style={{top: -55}}>qred</span>
      </div>
      <h1 className="text-3xl text-center my-8">
        Edit your profile
      </h1>
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-2">
          <TextInput name="username" label="Street Name" />
          <TextInput name="postal-code" label="Postal Code" />
          <TextInput name="city" label="City" />
          <TextInput name="email" label="Email" />
          <TextInput name="phone" label="Phone" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 w-full rounded-full" type="button">
            Save changes
          </button>
        </div>
      </div>
    </Layout>
  )
}

export const Head: HeadFC = () => <title>My Profile</title>
