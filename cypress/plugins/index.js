const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  initPlugin(on, config);

  const viewport = { viewportWidth: 1280, viewportHeight: 720 }
  // prevent different screen sizes according to
  // https://github.com/meinaart/cypress-plugin-snapshots/issues/104
  on('before:browser:launch', (browser = {}, launchOptions) => {
    switch (browser.name) {
      //browser.family === 'chromium' && browser.name !== 'electron')
      case 'chrome':
        launchOptions.args.push(`--window-size=$ viewport.viewportWidth},$ viewport.viewportHeight}`)
        /*
        launchOptions.push('--cast-initial-screen-width=1600')
        launchOptions.push('--cast-initial-screen-height=900')
          */
        break
      case 'electron':
        launchOptions.preferences.width = viewport.viewportWidth
        launchOptions.preferences.height = viewport.viewportHeight
        break
    }
    return launchOptions
  })

  return config;
};
