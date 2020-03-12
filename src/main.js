import { build } from './views/modal'

function main (window) {
  console.log('Onboarding Widget starting up.....')

  let widget = window[window['OnboardingWidget']]
  let queue = widget.q
  let config = {}
  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      let thisCommand = queue[i]
      // Do the init
      if (thisCommand[0] == 'init') {
        config = thisCommand[1]
        console.log(`Onboarding Widget started with config: `, config)
        build(config)
      }
      else {
        commandHandler(thisCommand[0], thisCommand[1])
      }
    }
  }
}

function commandHandler (command, params) {
  console.log(`Handling command: ${command} ${params}`)

  switch (command) {
    // For future use
    case 'build':
      build(params)
      break
    default:
      console.warn(`No handler defined for ${command}`)
  }
}

main(window)
