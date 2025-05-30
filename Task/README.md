Task:-   Create a Simple Order Management System Using Microservices in NestJS
 
-> Build a basic Order Management System using a microservices architecture with two independent NestJS services communicating over    TCP.
 
1. Order Service (Client)
 
->Expose an HTTP POST endpoint to accept order requests.
->Validate incoming requests using DTOs.
->Send order data to the Payment Service over TCP transport.
 
2. Payment Service (Microservice)
 
->Listen for incoming order events over TCP.
->Simulate payment processing with a delay (e.g., 2 seconds).
->Respond with a payment status object.
 
Requirements
 
->Use TCP transport layer for inter-service communication.
->Keep the two services in separate folders/projects to simulate independent deployment.
->Use DTOs for request validation and strong typing.
->Implement error handling and logging in both services.
 
Note-> 
1-> Coding and Naming Conventions
Use camelCase for all variables, method names, class names, and DTO properties in the code (e.g., orderId, processPayment).
 
2->Avoid using AI tools to complete this task rely on your understanding to reinforce and solidify the concepts you have learned.
 
Success Criteria(Output)->
 
->Both services run independently without blocking each other.
->Orders can be created via HTTP requests in the Order Service and processed asynchronously by the Payment Service over TCP.
->Logs clearly show inter-service communication and flow of data.




HTTP POST endpoint /order to receive orders with payload:
{ "orderId": string, "userId": string, "amount": number }
 
 
Respond with a JSON containing payment status and transaction ID, for example:
{ "status": "success", "transaction_id": "abc123" }
 
and Receive the payment service response and send a final HTTP response to the client like below
{
  "message": "Order processed",
  "payment_status": "success",
  "transaction_id": "abc123"
}
 
 
 