import { FileType, CliConfig, GluegunEnhanced } from '../types'
import { generateExtension, generateReactExtension, scssPath } from '../utils'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
export default async (toolbox: GluegunEnhanced) => {
  const {
    template: { generate },
    config: { loadConfig },
    runtime: { brand },
  } = toolbox

  const customConfig = { ...loadConfig(brand, process.cwd()) } as CliConfig

  const cliConfig: CliConfig = {
    componentsDirectory: 'components',
    pagesDirectory: 'pages',
    createStories: false,
    ...customConfig,
    outputExtension: generateExtension(customConfig.outputExtension),
  }

  const pathPrefix = (type: FileType, name: string) =>
    type === 'component'
      ? `src/${cliConfig.componentsDirectory}/${name}`
      : `src/${cliConfig.pagesDirectory}/${name}`

  const { outputExtension } = cliConfig
  const createFunctionComponent = ({ name, isScss, type }) => {
    return Promise.all([
      // component/page
      generate({
        template: `${outputExtension}/component.function.ejs`,
        target: `${pathPrefix(type, name)}/${name}.${generateReactExtension(
          outputExtension
        )}`,
        props: {
          name,
          isScss,
        },
      }),
      // scss/styled-components
      generate({
        template: isScss ? scssPath : `${outputExtension}/component.styles.ejs`,
        target: isScss
          ? `${pathPrefix(type, name)}/${name}.scss`
          : `${pathPrefix(type, name)}/${name}.styles.${outputExtension}`,
        props: {
          name,
          isScss,
        },
      }),
      // stories
      cliConfig.createStories &&
        generate({
          template: `${outputExtension}/stories.ejs`,
          target: `${pathPrefix(
            type,
            name
          )}/${name}.stories.${generateReactExtension(outputExtension)}`,
          props: {
            name,
          },
        }),
    ])
  }

  const createClassComponent = ({ name, isScss, type }) => {
    return Promise.all([
      // component/page
      generate({
        template: `${outputExtension}/component.class.ejs`,
        target: `${pathPrefix(type, name)}/${name}.${generateReactExtension(
          outputExtension
        )}`,
        props: {
          name,
          isScss,
        },
      }),
      // scss/styled-components
      generate({
        template: isScss ? scssPath : `${outputExtension}/component.styles.ejs`,
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
