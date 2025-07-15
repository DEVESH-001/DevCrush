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
- adding pagination in mgdb /feed/?page=1&limit=10 =>first 10 users 1-10
- mgdb fncs .skip() & .limit() => .skip(0) & limit(10)
- /feed?page=3&limit=10 => .skip(20) & limit(10)

## formula skip = (pageNo - 1) * limit ()

- GET /connections
- GET /
  Status : ignore, intrested, accepted, rejected

<https://www.mongodb.com/docs/manual/reference/operator/query-logical/>

learn about it - schema.pre('save') //schema pre fetch
read about ref & populate (<https://mongoosejs.com/docs/populate.html>)
