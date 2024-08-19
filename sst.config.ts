/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'pokedex',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    new sst.aws.StaticSite('web', {
      build: {
        command: 'pnpm build',
        output: 'dist',
      },
    })
  },
})
