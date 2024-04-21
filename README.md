POST http://localhost:3000/not-ses/verification-code
or rabbitmq queue: "not-ses-queue" pattern: "verification-code"
body content: 
{
  "to":string,
  "username":string,
  "code":string,
  "serviceName":string
}

GET http://localhost:3000/not-ses/send
or rabbitmq queue: "not-ses-queue" pattern: "email-request"
body content: 
{
  "to":string[],
  "title":string,
  "text":string
}
