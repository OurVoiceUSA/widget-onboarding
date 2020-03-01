import { show } from './views/message'

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
      }

      else {
        show(config)
      }
    }
  }

  const buttons = document.getElementsByClassName('onboarding-widget-button')

  for (var x = 0; x < buttons.length; x++) {
    buttons[x].addEventListener('click', (e) => {
      e.stopPropagation()
      show(config)
    })
  }
}

function commandHandler (command, params) {
  console.log(`Handling command: ${command} ${params}`)

  switch (command) {
    case 'show':
      show(params)
      break
    default:
      console.warn(`No handler defined for ${command}`)
  }
}

main(window)
