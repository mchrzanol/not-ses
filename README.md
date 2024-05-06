<h1>Verification Code</h1>
<p>POST http://localhost:3000/not-ses/verification-code</p>
<p>pattern: "verification-code"</p>
<p>body content: </p>
<p>{</p>
<p>  "to":string,</p>
<p>  "code":string,</p>
<p>}</p>
<h1>Email Notification</h1>
<p>POST http://localhost:3000/not-ses/sendNotification</p>
<p>pattern: "email-notification"</p>
<p>body content: </p>
<p>{</p>
<p>"Group" or "to" argument is required</p>
<p>  "group":string[],</p>
<p>  "to":string[],</p>
<p>  "title":string,</p>
<p>  "text":string</p>
<p>}</p>
<h1>.env.local.</h1>
<p>BD_HOST=</p>
<p>BD_PORT=</p>
<p>BD_PASSWORD=</p>
<p>BD_USERNAME=</p>
<p>BD_DATABASE=</p>
<p>EMAIL_ID={e.g.not-ses@outlook.com(existing in emails table email)}</p>
<p>QUEUE_NAME=</p>
