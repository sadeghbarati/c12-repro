import { loadConfig as c12LoadConfig } from 'c12'
import { z } from 'zod'

const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    typescript: z.boolean().default(true),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
      prefix: z.string().optional(),
    }),
    framework: z.string().default('Vite'),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().default('').optional(),
    }),
  })
  .strict()

async function getRawConfig() {
    try {
      const configResult = await c12LoadConfig({
        configFile: 'components',
      })
  
      if (!configResult.config || Object.keys(configResult.config).length === 0)
        return null
  
      return rawConfigSchema.parse(configResult.config)
    }
    catch (error) {
      console.error(error)
    }
  }


async function main() {
  const config = await getRawConfig()

  console.log(config)
}

main()
  