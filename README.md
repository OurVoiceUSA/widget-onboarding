## Introduction

Our Voice USA is a 501(c)(3) non-profit, non-partisan organization for civic education. We are writing tools to engage everyday citizens with the political process by providing easy access to civic information that's relevant to the individual.

## Setup

Simply run `npm install` in this directory, then `npm run build` (or `npm run build-release` for production) and `npm run start` to serve the widget. You will want to add the following embed code to the host site:

    <script>
    (function (w,d,s,o,f,js,fjs) {
      w['OnboardingWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
      js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
      js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs)
    }(window, document, 'script', 'mw', 'http://localhost:8080/widget-dev.js'))
    mw('init', { server: 'https://ourvoiceusa.org/hellovoter/api', questions: ['name', 'age', 'party-affiliation', 'location', 'registered-to-vote']})
    </script>

You should be all set!

## Widget Configuration

Given the configuration you see in the above example:

    mw('init', { server: 'https://ourvoiceusa.org/hellovoter/api', questions: ['name', 'age', 'party-affiliation', 'location', 'registered-to-vote']})

'server' is the HelloVoter server instance the widget will talk to in order to add the volunteer to the user list, assign them a turf, and return a QR code.

'questions' is the list of questions the widget will ask the user. Shown here are all available questions. You may select any subset of these.

## Contributing

Thank you for your interest in contributing to us! To avoid potential legal headaches please sign our CLA (Contributors License Agreement). We handle this via pull request hooks on GitHub provided by https://cla-assistant.io/

Please also read our [code of conduct](CODE_OF_CONDUCT.md).

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

