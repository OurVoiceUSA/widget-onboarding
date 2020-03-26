## Introduction

This widget helps a campaign volunteer to sign up with Hello Voter and download the app to their phone. A campaign manager can put the widget on their campaign's website (or any website) to encourage potential volunteers to sign up.

Our Voice USA is a 501(c)(3) non-profit, non-partisan organization for civic education. We are writing tools to engage everyday citizens with the political process by providing easy access to civic information that's relevant to the individual.

## Setup

Simply run `npm install` in this directory, then `npm run build` (or `npm run build-prod` for production). You will want to add the following embed code to the host site (note this is the development example, for production you will have to adjust widget url and server url):

    <script>
    (function (w,d,s,o,f,js,fjs) {
      w['OnboardingWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
      js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
      js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs)
    }(window, document, 'script', 'mw', 'http://localhost:8080/widget-dev.js'))
    mw('init', { server: 'gotv-vt.ourvoiceusa.org', orgId: 'VT6WX8A', formId: '2cc3903a-060a-45b2-9847-416f230bb79b', questions: ['name', 'age', 'party-affiliation', 'address', 'registered-to-vote']})
    </script>

To trigger the opening of the widget, add this button somewhere in the host site, wherever you'd like to put it:

    <button type="button" name="button" class="onboarding-widget-button" style="width: 220px; height: 100px; padding: 8px 8px 8px 32px; border-radius: 4px; background: #f0f0f0 url(https://ourvoiceusa.org/wp-content/uploads/2019/01/cropped-20190107_174246.png); background-repeat: no-repeat; background-position: 8px 8px;">
    </button>

You should be all set!

## Widget Configuration

Given the configuration you see in the above example:

    mw('init', { server: 'https://ourvoiceusa.org/hellovoter/api', questions: ['name', 'age', 'party-affiliation', 'address', 'registered-to-vote']})

'server' is the HelloVoter server instance the widget will talk to in order to add the volunteer to the user list, assign them a turf, and return a QR code.

'questions' is the list of questions the widget will ask the user. Shown here are all available questions. You may select any subset of these.

## Contributing

Thank you for your interest in contributing to us! To avoid potential legal headaches please sign our CLA (Contributors License Agreement). We handle this via pull request hooks on GitHub provided by https://cla-assistant.io/

Please also read our [code of conduct](CODE_OF_CONDUCT.md).

## Development

To work on the widget, it is recommended that you take a look at https://github.com/OurVoiceUSA/ourvoiceusa.github.io as an example of how to use it. The recommended workflow is:

1. Run `npm run build` (after the setup steps above) and then serve the resulting `dist` directory on port 8080. This is the widget's .js file.
2. Serve the `widget-demo` folder of the https://github.com/OurVoiceUSA/ourvoiceusa.github.io repo on port 8081 and visit http://localhost:8081/local-test.html . This is the host page that calls the widget from http://localhost:8080/widget-dev.js.

Note the widget is configured on these test pages to make API calls to gotv-vt.ourvoiceusa.org. You may point this to another HelloVoter instance if you wish, but note that you may need to adjust some ports around, as HelloVoter defaults to port 8080 itself.

## Testing

Included are some integration tests using [cypress](https://www.cypress.io/) and can be run with `npm run test` (assuming you have followed the setup steps above). Note that you are expected to be serving the widget from http://localhost:8080/widget-dev.js as per development instructions above. You should also be serving the `widget-demo` folder of the https://github.com/OurVoiceUSA/ourvoiceusa.github.io repo as per the development instructions above. The cypress tests will attempt to access http://localhost:8081/local-test.html http://localhost:8081/local-test-invalid-questions.html and more. You will need internet access, as the widget currently geolocates via https://nominatim.openstreetmap.org and makes the `onboard` API call to gotv-vt.ourvoiceusa.org. If you are not connected to the internet, these tests will fail.

## License

	Software License Agreement (AGPLv3+)

	Copyright (c) 2020, Our Voice USA. All rights reserved.

        This program is free software; you can redistribute it and/or
        modify it under the terms of the GNU Affero General Public License
        as published by the Free Software Foundation; either version 3
        of the License, or (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU Affero General Public License for more details.

        You should have received a copy of the GNU Affero General Public License
        along with this program; if not, write to the Free Software
        Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

**NOTE:** We relicense the mobile app code for the purposes of distribution on the App Store. For details, read our [CLA Rationale](CLA-Rationale.md)

Logos, icons, and other artwork depicting the Our Voice bird are copyright and not for redistribution without express written permission by Our Voice USA.

