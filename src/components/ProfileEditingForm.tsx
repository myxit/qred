import { isEmpty } from "lodash";
import * as React from "react"
import TextInput from "../components/TextInput"
import { IUserProfile, makeEmptyUser } from '../userProfileSlice';
import { isEmail, isEmptyStr } from "../validators";

function validate(formData: IUserProfile): [boolean, Record<string, string>] {
  const errors: Record<string, string> = {}
  
  Object.keys(formData).forEach(fieldName => {
    // @ts-ignore bad typings
    errors[fieldName] = !!formData[fieldName] ? '' : 'Field cant not be empty.'; 
    // ({[fieldName]: })
  })
  

  if (!isEmail(formData.email)) {
    errors['email'] = 'Please type in a valid email address.'
  }

  return [Object.keys(errors).length == 0, errors]
}

export interface IProps {
  srcData?: IUserProfile
  onSubmit: (data: IUserProfile) => void
} 

export default function ProfileEditingForm({srcData, onSubmit}: IProps) {
  const [formData, setFormData] = React.useState(makeEmptyUser())
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const hasErrors = Object.values(formErrors).some(errorMessage => !!errorMessage)

  React.useEffect(() => {
    srcData && setFormData(srcData)
  }, [srcData])

  function handleChange(event: React.SyntheticEvent) {
    // @ts-ignore untyped
    const name = event.target.name;
    // @ts-ignore untyped
    const value = event.target.value;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData)

    const [, formErrors] = validate(newFormData)
    setFormErrors(formErrors)
  }

  function _handleSubmit(ev: React.SyntheticEvent) {    
    const [isValid, formErrors] = validate(formData)
    ev.preventDefault()
    
    if (!isValid) {
      setFormErrors(formErrors)

      return
    }

    onSubmit(formData)
  }



  return (
    <form onSubmit={_handleSubmit}>
      <div className="mb-10">
        <TextInput name="streetAddress" label="Street Name" value={formData.streetAddress} onInput={handleChange} errorMessage={formErrors.streetAddress} />
        <TextInput name="postalCode" label="Postal Code" value={formData.postalCode} onInput={handleChange}  errorMessage={formErrors.postalCode} />
        <TextInput name="city" label="City" value={formData.city} onInput={handleChange}  errorMessage={formErrors.city} />
        <TextInput name="email" label="Email" value={formData.email} onInput={handleChange}  errorMessage={formErrors.email} />
        <TextInput name="phone" label="Phone" value={formData.phone} onInput={handleChange}   errorMessage={formErrors.phone} />
      </div>
      <div className="flex items-center justify-between">
        <button  
          className="bg-green-400 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 w-full rounded-full" 
          type="submit"
          disabled={hasErrors}
          >
          Save changes
        </button>
      </div>
    </form>
  )
}