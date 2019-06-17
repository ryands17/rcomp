import { capitalize } from 'lodash'
import { fileTypes, GluegunEnhanced, FileType } from '../types'

const isValidParameter = (param: FileType) => {
  return (
    param !== undefined && [fileTypes.component, fileTypes.page].includes(param)
  )
}

export default {
  name: 'create',
  alias: ['c'],
  description: 'Creates a component or a page by asking a set of questions',
  run: async (toolbox: GluegunEnhanced) => {
    const {
      parameters,
      print,
      prompt /* access from extensions like this, set: {createFile} */,
    } = toolbox

    // check if there's a type provided on the command line first
    let type = parameters.first as FileType | undefined

    // if not a valid parameter, let's throw an error stating that's required
    if (!isValidParameter(type)) {
      print.error(
        `Please specify either '${fileTypes.component}' or '${fileTypes.page}' as the first argument`
      )
      return
    }

    let { name, componentType, styleType } = await prompt.ask([
      {
        type: 'input',
        name: 'name',
        message: 'Name of the file:',
      },
      {
        type: 'select',
        name: 'componentType',
        message: 'Select the type of the component',
        choices: [
          {
            name: 'function',
            message: 'Function Component',
          },
          {
            name: 'class',
            message: 'Class Component',
          },
        ],
      },
      {
        type: 'select',
        name: 'styleType',
        message: 'Select the style type you will be using',
        choices: [
          { message: 'Styled Components', name: 'sc' },
          {
            message: 'SCSS',
            name: 'scss',
          },
        ],
      },
    ])

    name = capitalize(name)
    const isScss = styleType === 'scss'

    if (componentType === 'function') {
      toolbox.createFunctionComponent({
        name,
        isScss,
        type,
      })
    } else {
      toolbox.createClassComponent({
        name,
        isScss,
        type,
      })
    }
  },
}
