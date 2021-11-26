export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

export interface Register {
  id: number
  user_id: number
  type: number
  value: number
  date: string
  category: string
  description: string
  created_at: Date
  updated_at: Date
}
