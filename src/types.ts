import { GluegunRunContext } from 'gluegun'

type Component = 'component'
type Page = 'page'

export type FileType = Component | Page

export const fileTypes: {
  [key: string]: Component | Page
} = {
  component: 'component',
  page: 'page',
}

interface IParams {
  type: FileType
  name: string
  isScss: boolean
}

export interface CliConfig {
  componentsDirectory: string
  pagesDirectory: string
  createStories: boolean
  outputExtension: 'ts' | 'js'
}

export type GluegunEnhanced = GluegunRunContext & {
  createFunctionComponent(params: IParams): Promise<string[]>
  createClassComponent(params: IParams): Promise<string[]>
}
