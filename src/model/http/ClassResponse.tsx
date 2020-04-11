export interface ClassResponse {
  id: number
  title: string
  teacher: number
  created_at: string
  sections: {
    id: number,
    title: string,
    description: string,
    learning_unit: number,
    resources: any[]
  }[]
}
