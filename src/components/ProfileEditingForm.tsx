import * as React from "react"
import TextInput from "../components/TextInput"
import { IUserProfile, makeEmptyUser } from '../userProfileSlice';

export interface IProps {
  srcData?: IUserProfile
  onSubmit: (data: IUserProfile) => void
} 

export default function ProfileEditingForm({srcData, onSubmit}: IProps) {
  const [formData, setFormData] = React.useState(makeEmptyUser());
  const [formErrors, setFormErrors] = React.useState([]);

  React.useEffect(() => {
    srcData && setFormData(srcData)
  }, [srcData])

  function handleChange(event: React.SyntheticEvent) {
    // @ts-ignore untyped
    const name = event.target.name;
    // @ts-ignore untyped
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors([]);
  }

  function _handleSubmit(ev: React.SyntheticEvent) {
    const data = { id: 'test-12345', streetAddress: 'Test Street, 12', postalCode: '157123', city: 'test', email: 'test@test.se', phone: '074656565' };
    // onSubmit(data)
    onSubmit(formData)
    ev.preventDefault();
  }

  return (
    <form onSubmit={_handleSubmit}>
      <div className="mb-10">
        <TextInput name="streetAddress" label="Street Name" value={formData.streetAddress} onInput={handleChange} />
        <TextInput name="postalCode" label="Postal Code" value={formData.postalCode} onInput={handleChange} />
        <TextInput name="city" label="City" value={formData.city} onInput={handleChange} />
        <TextInput name="email" label="Email" value={formData.email} onInput={handleChange} />
        <TextInput name="phone" label="Phone" value={formData.phone} onInput={handleChange} />
      </div>
      <div className="flex items-center justify-between">
        <button  
          className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 w-full rounded-full" 
          type="submit"
          >
          Save changes
        </button>
      </div>
    </form>
  )
}