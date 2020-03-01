import './message.css'
import './cleanslate.css'

import React from 'react'
import ReactDOM from 'react-dom'

// Define React component

class Modal extends React.Component {
  render () {

    const questions = this.props.config.questions

    return (
      <div>
        { questions.indexOf('name') > -1 ?
        <input type="text" placeholder="What is your name?" />
        : '' }

        { questions.indexOf('age') ?
        <div>
          <div>What is your age?</div>
          <input type="number" />
        </div>
        : '' }

        { questions.indexOf('party-affiliation') > -1 ?
        <div>
          <div>What is your party affiliation?</div>
          <select>
            <option>Democrat</option>
            <option>Republican</option>
          </select>
        </div>
        : '' }

        { questions.indexOf('location') > -1 ?
        <input type="text" placeholder="What is your address?" />
        : '' }

        { questions.indexOf('registered-to-vote') > -1 ?
        <div>
          <div>Are you registered to vote?</div>
          <input type="checkbox" />
        </div>
        : '' }
      </div>
    );
  }
}

let elements = []
let body

export function show (config) {
  let overlay = document.createElement('div')
  overlay.classList.add('js-widget-overlay')

  let root = document.createElement('div')
  root.setAttribute('id', 'onboarding-widget-root')
  root.classList.add('js-widget-dialog')

  body = document.getElementsByTagName('body')[0]

  elements.push(overlay)
  elements.push(root)
  body.appendChild(overlay)
  body.appendChild(root)

  // run react

  ReactDOM.render(
    <Modal config={config} />,
    document.getElementById('onboarding-widget-root')
  )

  overlay.addEventListener('click', close)
}

// Close elements of the widget
export function close (e) {
  overlay.removeEventListener('click', close)

  while (elements.length > 0) {
    elements.pop().remove()
  }
}
