import * as React from "react"
import { v4 as uuidv4 } from 'uuid';

export default function TextInput({label, name, ...restProps}: any) {  
  const componentUUID = uuidv4()
  const id = restProps.id || ['text', name.toLowerCase(), componentUUID].join('-')
  const placeholder = restProps.placeholder || label.toLowerCase()
  console.log(`${id}: `)
  return (
    <div className="mb-4">
      <label className="block text-grey-darker text-sm uppercase font-bold mb-2 text-gray-500" htmlFor={id} >
        {label}
      </label>
      <input className="shadow appearance-none border-2 border-gray-300 rounded w-full py-2 px-3 text-grey-darker" id={id} type="text" placeholder={placeholder} />
    </div>
  )
}