module.exports = (on, config) => {

  const viewport = { viewportWidth: 1000, viewportHeight: 600 }
  // prevent different screen sizes
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
