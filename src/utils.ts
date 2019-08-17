import { CliConfig } from './types'

export const generateExtension = (
  extension: string
): CliConfig['outputExtension'] => {
  if (extension === 'ts' || extension === 'js') {
    return extension
  } else return 'js'
}

export const generateReactExtension = (
  extension: CliConfig['outputExtension']
) => (extension === 'js' ? extension : `${extension}x`)
