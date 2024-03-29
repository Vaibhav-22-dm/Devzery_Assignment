# Devzery_Assignment

## About the Project
This is a Django + React.js app made for an assignment of an internship selection process. Django is used along with Django-REST-Framework to create APIs for a user profile management application. React.js is used to create the responsive UI for the web application. Database used is sqlite3.

## Installation 

To install the following project on your local system follow the steps given below:

- Clone the repository:

    ```
    git clone https://github.com/Vaibhav-22-dm/Devzery_Assignment.git
    ```

- Change directory to newly cloned repository:

    ```
    cd Devzery_Assignment
    ```

### Django Backend

- Install Python 3.10.7

- Install virtualenv

- Create a virtual environment:

    ```
    virtualenv myenv
    ```

- Switch to the newly created environment:

    ```
    cd myenv/Scripts
    ```

    ```
    ./activate
    ```

- Return Back to the parent directory:

    ```
    cd ../../
    ```

- Change directory to Profile_Management

- Build the environment using the given requirements:
    ```
    pip install -r requirements.txt
    ```

- Create an App Password for your gmail account

- Update the App Password (EMAIL_HOST_PASSWORD) and Email (EMAIL_HOST_USER) in settings.py file under Profile_Management folder inside current directory 

- Make migrations

    ```
    python manage.py makemigrations
    ```

- Migrate the changes

    ```
    python manage.py migrate
    ```

- Create Superuser

    ```
    python manage.py createsuperuser
    ```

- Start the django server:

    ```
    python manage.py runserver
    ```

- Backend server is live on http://localhost:8000/

- Django-admin can be accessed on http://localhost:8000/admin

### React.js Frontend

- Install Node.js version 20.11.0

- Change directory to profile_app

    ```
    cd profile_app
    ```

- Install the node modules

    ```
    npm run i
    ```

- Build the app

   
    ```
    npm run build
    ```

- Start the app

    ```
    npm run start
    ```

- Web App is live on http://localhost:3000/

## Features

1. Registration + Email Verification

2. Login + Token based authentication

4. Update Profile

5. Reset Password

6. Search Profiles
