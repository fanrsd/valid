import { Result, hitGopay } from '../utils'

export default async function hok(id: number): Promise<Result> {
      const body = `userId=${id}&zoneId=`
      const data = await hitGopay(body)
      return {
        success: true,
        game: 'Honor of Kings',
        id,
        name: data.data
      }
  }
