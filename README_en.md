# Movie API
This application utilizes the OMDbApi to search for a list of movies and their details. It has been developed using NestJS and TypeScript.

## Running the project
Before running the project, you will need to create an account and generate an API Key from the following service:<br>
https://www.omdbapi.com/

Install the dependencies:
```shell
npm install
```

Prepare the environment variables by copying the **.env.example** file and replacing the **API_KEY** variable with your generated key:
```shell
cp .env.example .env
```

Start the application:
```shell
npm run start:dev
```

## Documentation
- `GET /movies` - Performs a search for movies using the query and page as query parameters.
- `GET /movies/:imdbID` - Retrieves the details of a specific movie based on its ID.

## Automated Testing
To run the automated tests, use the following command:
```shell
npm run test
```

Make sure to have the dependencies installed before running the tests.

The provided documentation includes the available routes and their corresponding endpoints for searching movies and retrieving specific details. To run the project, follow the instructions provided in the "Running the project" section and ensure that the environment variables are properly configured.

Remember to replace the **API_KEY** variable in the **.env** file with the key generated from the OMDbApi service to ensure the correct functioning of the application.