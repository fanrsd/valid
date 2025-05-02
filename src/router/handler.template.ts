import { hitCoda, hitGopay, Result } from '../utils'

export default async function gameName(id: string): Promise<Result> {
  const body = `` 
  const data = await hitCoda(body)
  return {
    success: true,
    game: '',
    id,
    name: data.confirmationFields.username
  }
}

export default async function gameNames(id: string): Promise<Result> {
  const body = `` 
  const data = await hitGopay(body)
  return {
    success: true,
    game: '',
    id,
    name: data.confirmationFields.username
  }
}
