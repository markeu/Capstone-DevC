[![Build Status](https://travis-ci.com/markeu/Capstone-DevC.svg?branch=develop)](https://travis-ci.com/markeu/Capstone-DevC) [![Coverage Status](https://coveralls.io/repos/github/markeu/Capstone-DevC/badge.svg?branch=ft-get-feed)](https://coveralls.io/github/markeu/Capstone-DevC?branch=ft-get-feed) 

# Teamwork

An internal social network for employees of an organization. The goal of this
application is to facilitate more interaction between colleagues and promote team bonding.

### Required Features

```
Admin can create an employee user account.  
Admin/Employees can sign in.
Employees can post gifs. 
Employees can write and post articles.
Employees can edit their articles. 
Employees can delete their articles. 
Employees can delete their gifs post. 
Employees can comment on other colleagues' article post.  
Employees can comment on other colleagues' gif post. 
Employees can view all articles and gifs, showing the most recently posted articles or gifs  first. 
Employees can view a specific article. 
Employees can view a specific gif post. 
Admin can delete a comment, article and/or gif flagged as inappropriate. 

```
## Installation and Running the Application

Ensure that you have nodejs and npm installed in your computer

a. Clone this repository into your named folder

```bash
git clone -b master https://github.com/markeu/Capstone-DevC
git status
```
b. Install the project dependencies

```bash
npm install
```

c. start the application

```bash
npm start
```

## Test the endpoints

The application can be tested locally through localhost on port 5000 using postman or https://warm-scrubland-65886.herokuapp.com/ using Heroku

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | api/v1/auth/create-user-root  | Create root user account  |
POST  | api/v1/auth/create-user  | Create user/employee account  |
POST  | api/v1/auth/signin  | Login a user |
POST  | api/v1/articles  | Create a article post |
POST  | api/v1/articles/<:article-id>/comment  | Comment on a article |
POST  | api/v1/gifs/<:gifs-id>/comment  | Comment on a gif |
PATCH  | api/v1/articles/<:article-id>  | Edit article post |
POST  | api/v1/gifs  | Create a gif post |
PATCH  | api/v1/gifs/<:gif-id>  | Edit gif post |
DELETE |  api/v1/gifs/<:gifs-id>  | Delete gif post |
DELETE |  api/v1/articles/<:article-id>  | Delete article post |
GET  |  api/v1/gifs | Get a gif posts |
GET  |  api/v1/articles | Get a article posts |
GET  |  api/v1/gif/<:gif-id>  | Get a specific gif post |
GET  |  api/v1/articles/<:article-id>   | Get a specific article post |
GET  |  api/v1/feeds  | Get feeds |


## Author

* Uche Uzochukwu Mark
