export type Hour = {
  id: number
  day_of_week: number
  open_time: string
  close_time: string
}

export type Restaurant = {
  id: number
  name: string
  hours: Hour[]
}