import { GluegunEnhanced, FileType, CliConfig } from '../types'
import { generateExtension, generateReactExtension } from '../utils'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
export default async (toolbox: GluegunEnhanced) => {
  const {
    template: { generate },
    config,
  } = toolbox

  const cliConfig: CliConfig = {
    componentsDirectory: 'components',
    pagesDirectory: 'pages',
    ...config,
    outputExtension: generateExtension(config.outputExtension),
  }

  const pathPrefix = (type: FileType, name: string) =>
    type === 'component'
      ? `src/${cliConfig.componentsDirectory}/${name}`
      : `src/${cliConfig.pagesDirectory}/${name}`

  const { outputExtension } = cliConfig
  const createFunctionComponent = ({ name, isScss, type }) => {
    return Promise.all([
      generate({
        template: `${outputExtension}/component.function.js.ejs`,
        target: `${pathPrefix(type, name)}/${name}.${generateReactExtension(
          outputExtension
        )}`,
        props: {
          name,
          isScss,
        },
      }),
      generate({
        template: isScss
          ? 'scss/component.scss.ejs'
          : `${outputExtension}/component.styles.js.ejs`,
        target: isScss
          ? `${pathPrefix(type, name)}/${name}.scss`
          : `${pathPrefix(type, name)}/${name}.styles.${outputExtension}`,
        props: {
          name,
          isScss,
        },
      }),
    ])
  }

  const createClassComponent = ({ name, isScss, type }) => {
    return Promise.all([
      generate({
        template: `${outputExtension}/component.class.js.ejs`,
        target: `${pathPrefix(type, name)}/${name}.${generateReactExtension(
          outputExtension
        )}`,
        props: {
          name,
          isScss,
        },
      }),
      generate({
        template: isScss
          ? 'scss/component.scss.ejs'
          : `${outputExtension}/component.styles.js.ejs`,
        target: isScss
          ? `${pathPrefix(type, name)}/${name}.scss`
          : `${pathPrefix(type, name)}/${name}.styles.${outputExtension}`,
        props: {
          name,
          isScss,
        },
      }),
    ])
  }

  toolbox.createFunctionComponent = createFunctionComponent
  toolbox.createClassComponent = createClassComponent
}
