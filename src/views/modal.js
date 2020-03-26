import './cleanslate.css'
import mainStyle from './main.css'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'

import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import QRCode from 'qrcode'

function _inviteLink(inviteCode, server, orgId) {
  return 'http'+(server.match(/:8080$/)?'':'s')+'://'+server+'/HelloVoterHQ/'+(orgId?orgId+'/':'')+'mobile/invite?inviteCode='+inviteCode+(orgId?'&orgId='+orgId:'')+(server?'&server='+server:'')
}

let openModalEventListener

class Modal extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      name: window.localStorage.getItem('onboarding-widget-name'),
      age: window.localStorage.getItem('onboarding-widget-age'),
      affiliation: window.localStorage.getItem('onboarding-widget-affiliation') || 'Independent',
      address1: window.localStorage.getItem('onboarding-widget-address1'),
      address2: window.localStorage.getItem('onboarding-widget-address2'),
      city: window.localStorage.getItem('onboarding-widget-city'),
      state: window.localStorage.getItem('onboarding-widget-state'),
      zip: window.localStorage.getItem('onboarding-widget-zip'),
      registered: window.localStorage.getItem('onboarding-widget-registered') === 'true' ? true : false,
      invitelink: window.localStorage.getItem('onboarding-widget-invitelink'),
      server: null,
      orgId: null,
      qr: null,
      alertMsg: null,
      severity: null
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAge = this.updateAge.bind(this)
    this.updateAffiliation = this.updateAffiliation.bind(this)
    this.updateAddress1 = this.updateAddress1.bind(this)
    this.updateAddress2 = this.updateAddress2.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateZip = this.updateZip.bind(this)
    this.updateRegistered = this.updateRegistered.bind(this)

    // Set event handlers for any button with the class `onboarding-widget-button` to show the modal
    const buttons = document.getElementsByClassName('onboarding-widget-button')

    // closure for open modal, might need to remove later
    openModalEventListener = (e) => {
      e.stopPropagation()
      this.handleOpenModal()
    }

    for (var x = 0; x < buttons.length; x++) {
      buttons[x].addEventListener('click', openModalEventListener)
    }
  }

  async componentDidMount () {
    // If we already have an invite link from localstorage,
    // then let's get the QR code and display it instead
    if (this.state.invitelink) {
      this.state.qr = await QRCode.toDataURL(this.state.invitelink)
    }

    let configError = false

    // If we have the server from the config, use it. If not, warn.
    if (this.props.server) {
      this.state.server = this.props.server
    } else {
      configError = true
    }

    if (this.props.formId) {
      this.state.formId = this.props.formId
    } else {
      configError = true
    }

    if (this.props.orgId) {
      this.state.orgId = this.props.orgId
    }

    const validQuestions = ['name', 'age', 'party-affiliation', 'address', 'registered-to-vote']
    for (var x = 0; x < this.props.questions.length; x++) {
      const q = this.props.questions[x]
      if (validQuestions.indexOf(q) === -1) {
        configError = true
        break
      }
    }

    if (configError) {
      // No server specified, or invalid question... replace button with error text
      const buttons = document.getElementsByClassName('onboarding-widget-button')
      for (var x = 0; x < buttons.length; x++) {
        buttons[x].style.background = ''
        buttons[x].innerHTML = 'HelloVoter widget failed to load.'
        buttons[x].removeEventListener('click', openModalEventListener)
      }
    }
  }

  handleOpenModal () {
    this.setState({ showModal: true })
  }

  handleCloseModal (e) {
    e.preventDefault()
    this.setState({ showModal: false })
  }

  updateName (e) {
    this.setState({ name: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-name', this.state.name)
    })
  }

  updateAge (e) {
    this.setState({ age: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-age', this.state.age)
    })
  }

  updateAffiliation (e) {
    this.setState({ affiliation: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-affiliation', this.state.affiliation)
    })
  }

  updateAddress1 (e) {
    this.setState({ address1: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-address1', this.state.address1)
    })
  }

  updateAddress2 (e) {
    this.setState({ address2: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-address2', this.state.address2)
    })
  }

  updateCity (e) {
    this.setState({ city: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-city', this.state.city)
    })
  }

  updateState (e) {
    this.setState({ state: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-state', this.state.state)
    })
  }

  updateZip (e) {
    this.setState({ zip: e.target.value }, () => {
      window.localStorage.setItem('onboarding-widget-zip', this.state.zip)
    })
  }

  updateRegistered (e) {
    this.setState({ registered: e.target.checked || false }, () => {
      window.localStorage.setItem('onboarding-widget-registered', this.state.registered)
    })
  }

  handleCloseAlert () {
    this.setState({ severity: null, alertMsg: null })
  }

  async handleSignUp (e) {
    e.preventDefault()

    const addr = window.encodeURI(this.state.address1 + this.state.address2)

    let geocoderesponse

    try {
      geocoderesponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${this.state.address1 + (this.state.address2 ? this.state.address2 : '')},+${this.state.city},+${this.state.state},+usa&format=json&limit=1`)
    } catch (err) {
      this.setState({ severity: 'error', alertMsg: 'OSM problem finding that address' })
      throw new Error('There are unexpected problems; please try again later.')
    }

    if (geocoderesponse.status >= 400) {
      this.setState({ severity: 'error', alertMsg: 'OSM problem finding that address' })
      throw new Error('There are unexpected problems; please try again later.')
    }

    const geocodeobj = await geocoderesponse.json()

    if (!geocodeobj[0]) {
      this.setState({ severity: 'error', alertMsg: 'Address not found' })
      throw new Error('Address not found')
    }

    const payload = {
      name: this.state.name,
      age: this.state.age,
      affiliation: this.state.affiliation,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      registered: this.state.registered,
      latitude: parseFloat(geocodeobj[0].lat),
      longitude: parseFloat(geocodeobj[0].lon),
      formId: this.state.formId
    }

    let hellovoterresponse

    try {
      const serverUrl = 'http'+(this.state.server.match(/:8080$/)?'':'s')+'://'+this.state.server+'/HelloVoterHQ/'+(this.state.orgId?this.state.orgId+'/':'')+'api/v1/public/onboard'
      hellovoterresponse = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
    } catch (err) {
      this.setState({ severity: 'error', alertMsg: `Error from server: ${err}` })
      throw new Error(err)
    }

    if (hellovoterresponse.status >= 400) {
      this.setState({ severity: 'error', alertMsg: `Error from server: ${hellovoterresponse.statusText}` })
      throw new Error(hellovoterresponse.statusText)
    }

    const invite = await hellovoterresponse.json()

    this.setState({ invitelink: _inviteLink(invite.inviteCode, this.state.server, this.state.orgId) }, () => {
      window.localStorage.setItem('onboarding-widget-invitelink', this.state.invitelink)
    })

    this.setState({ qr: await QRCode.toDataURL(this.state.invitelink) })
  }

  render () {
    const server = this.props.server
    const questions = this.props.questions
    const inputWidth = 8

    const alert = this.state.alertMsg ?
      <Alert severity={ this.state.severity } onClose={ () => {
        this.setState({ severity: null, alertMsg: null })
      } }>{ this.state.alertMsg }</Alert> : ''

    const form = this.state.qr ?
      <>
        <a href={ this.state.invitelink } data-cy="qr-link">
          <img src={ this.state.qr } />
        </a>
        <Grid style={{ padding: 20 }}
              container
              spacing={ 5 }
              justify="space-evenly"
              alignItems="center">
          <a href="https://play.google.com/store/apps/details?id=org.ourvoiceinitiative.ourvoice">
            <Button variant="contained">
              Get Hello Voter for Android
            </Button>
          </a>
          <a href="https://itunes.apple.com/us/app/our-voice-usa/id1275301651?ls=1&mt=8">
            <Button variant="contained">
              Get Hello Voter for iOS
            </Button>
          </a>
        </Grid>
        <div style={{ padding: 20 }}>
          <Button onClick={ this.handleCloseModal }
                  variant="contained" color="secondary">Close</Button>
        </div>
      </> :
      <form onSubmit={ this.handleSignUp }
            data-cy="form"
            style={{ paddingBottom: '20px' }}>
        <Grid container
              spacing={ 5 }
              justify="center"
              alignItems="center">
          { questions.indexOf('name') > -1 ?
          <Grid item xs={ inputWidth }>
            <TextField placeholder="What is your name?"
                  data-cy="name-field"
                  required
                  fullWidth
                  value={ this.state.name || '' }
                  onChange={ this.updateName } />
          </Grid>
          : '' }

          { questions.indexOf('age') > -1 ?
          <Grid item xs={ inputWidth }>
            <FormHelperText>What is your age?</FormHelperText>
            <TextField type="number"
                  data-cy="age-field"
                  fullWidth
                  value={ this.state.age || 18 }
                  onChange={ this.updateAge } />
          </Grid>
          : '' }

          { questions.indexOf('party-affiliation') > -1 ?
          <Grid item xs={ inputWidth }>
            <FormHelperText>What is your party affiliation?</FormHelperText>
            <select value={ this.state.affiliation }
                    data-cy="affiliation-field"
                    onChange={ this.updateAffiliation }>
              <option value={'Democrat'}>Democrat</option>
              <option value={'Republican'}>Republican</option>
              <option value={'Independent'}>Independent</option>
            </select>
          </Grid>
          : '' }

          { questions.indexOf('address') > -1 ?
          <>
          <Grid item xs={ inputWidth }>
            <TextField type="text" placeholder="Address Line 1"
                  data-cy="address1-field"
                  required
                  fullWidth
                  value={ this.state.address1 || '' }
                  onChange={ this.updateAddress1 } />
          </Grid>
          <Grid item xs={ inputWidth }>
            <TextField type="text" placeholder="Address Line 2"
                  data-cy="address2-field"
                  fullWidth
                  value={ this.state.address2 || '' }
                  onChange={ this.updateAddress2 } />
          </Grid>
          <Grid item xs={ inputWidth }>
            <TextField type="text" placeholder="City"
                  data-cy="city-field"
                  required
                  fullWidth
                  value={ this.state.city || '' }
                  onChange={ this.updateCity } />
          </Grid>
          <Grid item xs={ inputWidth }>
            <TextField type="text" placeholder="State"
                  data-cy="state-field"
                  required
                  fullWidth
                  value={ this.state.state || '' }
                  onChange={ this.updateState } />
          </Grid>
          <Grid item xs={ inputWidth }>
            <TextField type="text" placeholder="Zip"
                  data-cy="zip-field"
                  required
                  fullWidth
                  value={ this.state.zip || '' }
                  onChange={ this.updateZip } />
          </Grid>
          </>
          : '' }

          { questions.indexOf('registered-to-vote') > -1 ?
          <Grid item xs={ inputWidth }>
            <FormHelperText>Are you registered to vote?</FormHelperText>
            <Checkbox checked={ this.state.registered }
              data-cy="registered-field"
              onChange={ this.updateRegistered } />
          </Grid>
          : '' }

          <Grid item xs={ inputWidth } style={{ paddingBottom: '20px' }}>
            <Grid container
                  spacing={ 5 }
                  justify="space-evenly"
                  alignItems="center">
                <Button onClick={ this.handleCloseModal }
                        variant="contained"
                        color="secondary">Cancel</Button>
                <Button type="submit"
                        variant="contained"
                        color="primary">Sign Up</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

    return (
      <ReactModal
        contentLabel="Hello Voter Onboarding Widget"
        isOpen={ this.state.showModal }
        className="onboarding-widget-modal"
        overlayClassName="onboarding-widget-overlay"
        data={{ cy: "onboarding-widget-modal" }}
        shouldCloseOnOverlayClick={ false }
        onRequestClose={ this.handleCloseModal }
        >

        <img src="https://ourvoiceusa.org/wp-content/uploads/2019/01/cropped-20190107_174246.png"
             alt="Hello Voter Onboarding Widget"
             className="onboarding-widget-logo" width="200" height="80" />

        <Typography variant="h6" gutterBottom align="center">
          Sign up with Hello Voter!
        </Typography>

        <div style={{ height: 20 }}></div>

        { form }

        { alert }

      </ReactModal>
    )
  }
}

let body

export function build (config) {
  const root = document.createElement('div')
  root.setAttribute('id', 'onboarding-widget-root')
  body = document.getElementsByTagName('body')[0]
  body.appendChild(root)

  ReactModal.setAppElement(root)
  ReactDOM.render(<Modal {...config} />, document.getElementById('onboarding-widget-root'))
}
