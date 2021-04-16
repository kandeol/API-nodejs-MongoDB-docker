<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">Test technique Unkle Backend</h1>
  <p align="center">
    This project consists in creating a API
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)
-   [Contact](#contact)

<!-- ABOUT THE PROJECT -->

### Built With

-   Node.js (Express)
-   MongoDB (Mongoose)
-   Docker

<!-- GETTING STARTED -->

## Getting Started

## Requirements

For development, you will only need Node.js and a node global package, Npm installed in your environement.

### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   #### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.15.4

    $ npm --version
    7.6.3

If you need to update `npm`, you can make it using `npm`!

    $ npm install npm -g

### Installation

1. Install and update [HomeBrew](https://brew.sh/)

    ```bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" && brew update
    ```

2. Install [docker](https://www.docker.com/) and [docker-machine](https://docs.docker.com/machine/) via HomeBrew

    ```bash
    brew install docker docker-machine
    ```

3. Clone or download/extract the project repository

    ```bash
    git clone https://github.com/kandeol/test-technique-unkle-back-end.git
    ```

4. Install depedencies

    ```bash
    npm install
    ```

5. Execute the [docker-compose](https://docs.docker.com/compose/) file in the Docker folder

    ```bash
    docker-compose up
    ```

6. Start the node server locate in `./api/`

    ```bash
    node server.js
    ```

7. Here we go ! You can now test (http://127.0.0.1:8080) !

## Usage

All path can be test with POSTMAN

![Product Name Screen Shot][product-screenshot]

### Open Endpoints

Open endpoints require no Authentication token , only username and password.

-   [SignUp for create account admin] : `POST /api/auth/signup`

```json
{
    "username": "John",
    "email": "John@hotmail.fr",
    "password": "John1234",
    "roles": ["admin"]
}
```

-   [Login] : `POST /api/auth/signin`

### Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request [x-access-token]. A Token can be acquired from the Login view above.

### Current Client related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

-   [Show info]: `GET /api/user/`
-   [Show info contract]: `GET /api/user/contracts/`

### Account admin related

Endpoints for viewing and manipulating the Accounts that the Authenticated Admin
has permissions to access.

data send via req.body in JSON

-   [Show all infos contracts] : `GET /api/admin/contracts/`
-   [Show all infos clients] : `GET /api/admin/users/`
-   [Create client or admin] : `POST /api/admin/user/`

```json
{
    "username": "John",
    "email": "John@hotmail.fr",
    "password": "John1234",
    "roles": ["client"]
}
```

-   [Create contract] : `POST /api/admin/contract/`

    options : - "TR" tout risque - "VU" vol uniquement - "IU" incendie uniquement - "CV" cambriolage vendredi - "TC" toute casse

```json
{
    "start_date": "04-30-2021",
    "client": ["John"],
    "options": ["CV", "TR"]
}
```

-   [Delete an user] : `DELETE /api/admin/user/`

```json
{
    "username": "John"
}
```

<!-- CONTACT -->

## Contact

ANDEOL Kévin - andeol.kevin@gmail.com

Project Link: [https://github.com/kandeol/test-technique-unkle-back-end](https://github.com/kandeol/test-technique-unkle-back-end)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/k%C3%A9vin-andeol-544723195/
[product-screenshot]: images/postman.png

```

```
