# Headless App Query Data Salesforce GraphQL API

This project aims to provide a headless application that interacts with Salesforce using GraphQL API to query data.

## Overview

This headless application is designed to fetch data from Salesforce using GraphQL API. It facilitates querying Salesforce data without the need for a traditional frontend application. You can use this application to retrieve data from Salesforce and integrate it into various backend processes, microservices, or other applications.

## Features

* Queries data from Salesforce using GraphQL API.
* Provides flexibility in fetching specific data sets based on GraphQL queries.
* Supports integration with various backend systems and processes.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine:
    
    ```bash
    git clone https://github.com/tomsouza4/headless-app-query-data-salesforce-graphqlapi.git
    ```
    
2. Install the required dependencies:
    
    ```bash
    # Navigate to the project directory
    cd headless-app-query-data-salesforce-graphqlapi
    ```
 
3. Configure environment variables:(Coming soon, skip to next step)
    
    * Open the `.env` file.
    * Update the Salesforce credentials and GraphQL endpoint as per your Salesforce environment.
      
4. Run the application:
    
    ```bash
    npm install
    npm start
    ```
    
5. Access the application:
    
    Once the application is running, you can access it through the specified endpoint to query Salesforce data using GraphQL queries.
    

## Usage

To use the application, you can:

1. Send GraphQL queries to the specified endpoint.
2. Analyze and process the data fetched from Salesforce based on your requirements.
3. Integrate the application with other systems or processes as needed.

## Dependencies

The project uses the following dependencies:

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [axios](https://axios-http.com/)
* dotenv

## In Salesforce it is required to configure:
- Add http://localhost:3000 to your Salesforce CORS
<img width="519" alt="image" src="https://github.com/tomsouza4/headless-app-query-data-salesforce-graphqlapi/assets/11336182/6d7ad1d9-f7df-4826-ad32-190b5fa85ca8">

- Create a Connected App
<img width="508" alt="image" src="https://github.com/tomsouza4/headless-app-query-data-salesforce-graphqlapi/assets/11336182/6853aea7-91b5-4b0c-8c49-4405687dc4e5">
<img width="962" alt="image" src="https://github.com/tomsouza4/headless-app-query-data-salesforce-graphqlapi/assets/11336182/22a470c2-310d-4e98-9ccc-c07d45db2daf">


#### Command line to get the the oauth token on Mac:
```bash
curl https://YOUR_SERVER_URL/services/oauth2/token -d 'grant_type=client_credentials' -d 'client_id=PASTE_YOUR_CONSUMER_KEY_HERE' -d 'client_secret=PASTE_YOUR_CONSUMER_SECRET_HERE' | jq .access_token | pbcopy
```


#### Copy the token after "access_token" something like:
```json
"access_token":"00D8b0000022ug0!AQ8AQGbKIjjkVTHUIcDCYehMqhmqOqc.iKQsKUaDp3zomRfp8kgZjCgJ8TxDlSGOfzwVkjfNGHpCXd_3vtIEkJFPGZSOkOSv"
```


#### Paste the content to index.js file under const token variable
```js
 const token = "00D8b0000022ug0!AQ8AQNfmDcCNjlqah6UTK90X7WWdRyFfeOXHuEq2hH3fLLTMvRLZ2B9oP5wbjfxzCs.SxtKu0pcCqSWqKVCg4OvisTbkibhU";
```


## Contributing

Contributions to the project are welcome. If you have any suggestions, improvements, or bug fixes, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
