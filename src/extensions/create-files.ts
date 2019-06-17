import { GluegunEnhanced, FileType } from '../types'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
export default async (toolbox: GluegunEnhanced) => {
  const {
    template: { generate },
    print,
  } = toolbox
  const pathPrefix = (type: FileType, name: string) =>
    type === 'component' ? `app/components/${name}` : `app/pages/${name}`

  const createFunctionComponent = ({ name, isScss, type }) => {
    try {
      return Promise.all([
        generate({
          template: 'js/component.function.js.ejs',
          target: `${pathPrefix(type, name)}/${name}.js`,
          props: {
            name,
            isScss,
          },
        }),
        generate({
          template: isScss
            ? 'js/component.scss.ejs'
            : 'js/component.styles.js.ejs',
          target: isScss
            ? `${pathPrefix(type, name)}/${name}.scss`
            : `${pathPrefix(type, name)}/${name}.styles.js`,
          props: {
            name,
            isScss,
          },
        }),
      ])
    } catch (e) {
      print.error(`Couldn't create the component! Please try again`)
    }
  }

  const createClassComponent = ({ name, isScss, type }) => {
    try {
      return Promise.all([
        generate({
          template: 'js/component.class.js.ejs',
          target: `${pathPrefix(type, name)}/${name}.js`,
          props: {
            name,
            isScss,
          },
        }),
        generate({
          template: isScss
            ? 'js/component.scss.ejs'
            : 'js/component.styles.js.ejs',
          target: isScss
            ? `${pathPrefix(type, name)}/${name}.scss`
            : `${pathPrefix(type, name)}/${name}.styles.js`,
          props: {
            name,
            isScss,
          },
        }),
      ])
    } catch (e) {
      print.error(`Couldn't create the component! Please try again`)
    }
  }

  toolbox.createFunctionComponent = createFunctionComponent
  toolbox.createClassComponent = createClassComponent
}
