import { Result } from '../utils'

export { default as ag } from './ag'
export { default as aov } from './aov'
export { default as cod } from './cod'
export { default as ff } from './ff'
export { default as gi } from './gi'
export { default as hi } from './hi'
export { default as hsr } from './hsr'
export { default as la } from './la'
export { default as lad } from './lad'
export { default as mcgg } from './mcgg'
export { default as ml } from './ml'
export { default as pb } from './pb'
export { default as pgr } from './pgr'
export { default as sm } from './sm'
export { default as sus } from './sus'
export { default as valo } from './valo'
export { default as zzz } from './zzz'

export async function hok(id: number): Promise<Result> {
  try {
    const response = await fetch(`https://gopay.co.id/games/v1/order/prepare/HOK?userId=${id}&zoneId=`)
    const data = await response.json()
    return {
      success: true,
      message: data.message,
      name: data.data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Not found'
    }
  }
}
