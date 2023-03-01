import React from "react"
import { render, } from "@testing-library/react"
import ProfileEditingForm from './ProfileEditingForm'
import { IUserProfile } from "../userProfileSlice"

test("Renders Form", () => {
  const testProfile: IUserProfile = {
    id: '123',
    city: 'Stockholm',
    email: 'test@example.com',
    phone: '0766553535',
    postalCode: '111 76',
    streetAddress: 'Torsgatan 11',
  }
  const { getByLabelText, getByRole } = render(<ProfileEditingForm srcData={testProfile} onSubmit={jest.fn()} />)
  
  expect(getByLabelText("Street Name")).toHaveValue(testProfile.streetAddress)
  expect(getByLabelText("Postal Code")).toHaveValue(testProfile.postalCode)
  expect(getByLabelText("City")).toHaveValue(testProfile.city)
  expect(getByLabelText("Email")).toHaveValue(testProfile.email)
  expect(getByLabelText("Phone")).toHaveValue(testProfile.phone)
  const submitButton = getByRole("button")
  expect(submitButton).toBeInTheDocument()
})