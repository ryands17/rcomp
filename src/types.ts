import { GluegunToolbox } from 'gluegun'

type Component = 'component'
type Page = 'page'

export type FileType = Component | Page

export const fileTypes: {
  [key: string]: Component | Page
} = {
  component: 'component',
  page: 'page',
}

interface Params {
  type: FileType
  name: string
  isScss: boolean
}

export interface GluegunEnhanced extends GluegunToolbox {
  createFunctionComponent(params: Params): Promise<string[]>
  createClassComponent(params: Params): Promise<string[]>
}
