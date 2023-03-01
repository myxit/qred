import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface IUserProfile {
  id: string
  streetAddress: string
  postalCode: string
  city: string
  email: string
  phone: string
}

export function makeEmptyUser(): IUserProfile {
  return {
    id: '<EMPTY>',
    streetAddress: '',
    postalCode: '',
    city: '',
    email: '',
    phone: '',
  }
}

const USER_ID = 3 

export const fetchProfile = createAsyncThunk('users/fetchProfile', async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${USER_ID}`)
  const json = await response.json()
  const res: IUserProfile = {
    id: USER_ID.toString(),
    streetAddress: [json.address.street, json.address.suite].join(','),
    postalCode: json.address.zipcode,
    city: json.address.city,
    email: json.email,
    phone: json.phone,
  } 
  
  return res
})

export const saveProfile = createAsyncThunk(
  'users/saveProfile',
  async (profile: IUserProfile) => {
    const [street, suite] = profile.streetAddress.split(',', 2);
    const body = {
      "id": USER_ID,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": profile.email,
      "address": {
        "street": street,
        "suite": suite,
        "city": profile.city,
        "zipcode": profile.postalCode,
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": profile.phone,
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    }
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${USER_ID}`, {
        method: 'PUT', 
        body: JSON.stringify(body)
      })
  }
)

export interface IState {
  value: number
  user?: IUserProfile
  status: 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCEEDED' | 'SAVING' | 'SAVED'
  error?: string
} 

function makeEmptyState(): IState {
  return {
    value: 0,
    user: undefined,
    status: 'IDLE',
    error: undefined
  }
}

export const selectProfile = (state: RootState) => state.userProfile.user

export const counterSlice = createSlice({
  name: 'counter',
  initialState: makeEmptyState(),
  reducers: {
   
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = 'LOADING'
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'
        state.user = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'ERROR'
        state.error = action.error.message
      })
      .addCase(saveProfile.pending, (state) => {
        state.status = 'SAVING'
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.status = 'SAVED'
      })
      .addCase(saveProfile.rejected, (state) => {
        state.status = 'ERROR'
      })
  }
})

export default counterSlice.reducer