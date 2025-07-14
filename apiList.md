# DevTinder APIs

authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connecetionRequestRouter

:status(dynamic)

- POST /request/send/:status/:toUserId :in process -> Done
- POST /request/review/:status/:requestId :in process

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET/user/feed

- GET /connections
- GET /
  Status : ignore, intrested, accepted, rejected

learn about it - schema.pre('save') //schema pre fetch
read about ref & populate (<https://mongoosejs.com/docs/populate.html>)
