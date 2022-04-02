import path from 'path'
import { readFile } from 'fs/promises'

import resolve from 'resolve-pkg'
import createLogger from 'debug'

import { Plugin, UserConfig } from 'vite'
import { VueBridgeOptions } from '../index'

const debug = createLogger('vite-bridge-deps')

export function localizeDepsPLugin(options: VueBridgeOptions): Plugin {
  return {
    name: 'vite-bridge-localize-deps',
    apply: options.apply,

    async config(config) {
      // resolve all vue-related plugins to absolute paths
      // so symlinked src files don't resolve deps to the wrong node_modules
      const addConfig: Partial<UserConfig> = {}
      if (options.localizeDeps) {
        const alias = await resolveFullPathForPackages(options)
        debug('config aliases generated:', alias)

        addConfig.resolve = {
          alias: {
            ...(alias ?? {}),
            ...(config.resolve?.alias ?? {}),
          },
        }
      }

      // TODO: inline packages in `test` config for vitest?
      return addConfig
    },
    configResolved(config) {
      debug('config aliases resolved:', config.resolve.alias)
    },
  }
}

async function resolveFullPathForPackages(options: VueBridgeOptions) {
  const alias: Record<string, string> = {}
  const deps: string[] = []
  if (options.localizeDeps === true) {
    const _path = path.join(
      options.projectRoot ?? process.cwd(),
      './package.json'
    )
    const pkgJson = await importPkgJson(_path)
    const { dependencies, devDependencies } = pkgJson
    deps.push(...Object.keys(dependencies), ...Object.keys(devDependencies))
  } else {
    deps.push(...options.localizeDeps)
  }
  deps.forEach((dep) => {
    let fullPath: string
    try {
      fullPath = resolve(dep)
    } catch (error) {
      /* do nothing, dep seems not to be installed */
    }
    if (fullPath) {
      alias[dep] = fullPath
    }
  })

  return alias
}

async function importPkgJson(path: string) {
  const handlePkgJsonError = () => {
    throw new Error(
      `[@vue-bridge/vite-plugin]: Could not read package.json. Location: ${path}`
    )
  }
  return JSON.parse(
    await readFile(path, { encoding: 'utf-8' }).catch(handlePkgJsonError)
  )
}
