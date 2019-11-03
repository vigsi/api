##VIGSI API

#Running locally:
1. Clone repo
2. Run npm install
3. Create `auth/` directory into the root of the project
4. Copy your `credentials.js` file into the auth directory
5. Run `npm run build-local` to build the image
6. Run `npm run run-local` to start the API locally

You will be able to hit the API on localhost:8080

##Routes:

#`/api/arima/:start&:end`

Inputs: 

    Description:
        Generate signed URLS for all hourly arima data between two timestamps

    start: ISO 8601 date string
    end: ISO 8601 date string
    example: `/api/arima/2019-10-27T06:00:00.000Z&2019-10-28T07:00:00.000Z`

Output:
    Array of signed URLs

#`/api/nn/:start&:end`

Inputs: 

    Description:
        Generate signed URLS for all hourly neural network data between two timestamps

    start: ISO 8601 date string
    end: ISO 8601 date string
    example: `/api/nn/2019-10-27T06:00:00.000Z&2019-10-28T07:00:00.000Z`

Output:
    Array of signed URLs