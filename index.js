const path = require('path')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')

const getConfig = (file, code) =>
  Promise.resolve()
    .then(() => {
      const rc = {
        path: path.dirname(file),
        ctx: {
          file: {
            extname: path.extname(file),
            dirname: path.dirname(file),
            basename: path.basename(file)
          },
          options: {}
        }
      }

      return postcssrc(rc.ctx, rc.path, { argv: false })
    })
    .then(config => {
      if (!config) config = {}

      if (config.options.to) delete config.options.to
      if (config.options.from) delete config.options.from

      const plugins = config.plugins || []
      const options = Object.assign(
        {
          to: file,
          from: file,
          map: false
        },
        config.options
      )

      return postcss(plugins).process(code, options)
    })

module.exports = class {
  constructor(config) {
    this.setting = Object.assign(
      {
        rule: /\.wxss$/
      },
      config
    )
  }

  apply(op) {
    const { file, code, output } = op

    if (!this.setting.rule.test(file)) {
      op.next()
      return
    }

    if (output) {
      op.output({
        action: '变更',
        file
      })
    }
    getConfig(file, code)
      .then(({ css }) => {
        op.code = css
        op.next()
      })
      .catch(e => {
        console.log(e)
        op.err = e
        op.catch()
      })
  }
}
