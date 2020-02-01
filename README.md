# Gigapet Backend

## Base Endpoint

`https://gigapet-bw-7.herokuapp.com/`  
base endpoint, it should display  
`Gigapet 7 is alive!`

## Register Endpoint

`https://gigapet-bw-7.herokuapp.com/api/auth/register`

- type: POST
- requires:
  1. username
  1. password
- returns -> token and username
- if username missing -> 400 error displayed
- if password missing -> 400 error displayed

## Login Endpoint

`https://gigapet-bw-7.herokuapp.com/api/auth/login`

- type: POST
- requires:
  1. username
  1. password
- returns - token and username.
- if username missing -> 400 error displayed
- if password missing -> 400 error displayed
