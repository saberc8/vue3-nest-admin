import { SizeEnum } from '@/enums/sizeEnum'

export interface LoadingProps {
  tip: string
  size: SizeEnum
  absolute: boolean
  loading: boolean
  background: string
}
