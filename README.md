# pawlinx-api
pawlinx backend

***Installation Instructions:***

1.  Install serverless

```npm install -g serverless```

2. Install node-inspector

```npm install -g node-inspector```

3.  Install yarn

```npm install -g yarn```

4.  Install env-cmd

```npm install -g env-cmd```

5.  CD to directory and install npm dependencies

```npm install```

6.  Install Serverless Local DynamoDB Plugin

```sls dynamodb install```

7.  Install Java if running local DynamoDB at:  

```https://www.java.com/en/download/```

***Running Locally using VS Code with Break Points:***

Open the Debugger tab in Visual Studio Code.  Select and run the following in the drop down:

```Launch Program with Node-Inspector```

Wait for the following message in the debug console:  ```Debugger listening on 127.0.0.1:5858```
Node-inspector is now listening on debugger port 5858.  You can now attach the application process to the debugger by running 
the following in the drop down:

```Attach to Node-Inspector```

A initial break point will be set.  Press play to continue executing the application.

***Running Locally in Command Line:***

```npm run start-server-lambda:offline```

***Running Locally in Command Line with Additional Debug Messages:***

```npm run debug-server-lambda:offline```

***DynamoDB and Graphql Endpoints***

Serverless will simulate AWS Lambda locally and run the application on port 4000.
Local DynamoDB will be running on port 8000.

To query the DynamoDB:  http://localhost:8000/shell
To run Graphql queries:  http://localhost:4000/graphiql

***Deploying to AWS Lambda / API Gateway***

``` sls deploy```

