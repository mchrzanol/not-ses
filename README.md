<h1>Verification Code</h1>
<p>POST http://localhost:3000/not-ses/verification-code</p>
<p>or rabbitmq queue: "not-ses-queue" pattern: "verification-code"</p>
<p>body content: </p>
<p>{</p>
<p>  "to":string,</p>
<p>  "username":string,</p>
<p>  "code":string,</p>
<p>  "serviceName":string</p>
<p>}</p>
<h1>Custom Email</h1>
<p>POST http://localhost:3000/not-ses/send</p>
<p>or rabbitmq queue: "not-ses-queue" pattern: "email-request"</p>
<p>body content: </p>
<p>{</p>
<p>  "to":string[],</p>
<p>  "title":string,</p>
<p>  "text":string</p>
<p>}</p>
