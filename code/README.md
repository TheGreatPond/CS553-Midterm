# Midterm express server and client

*THIS IS LARGELY THE LAB 3 THAT WE HAD ALREADY DONE MODIFIED TO FIT THE NEEDS OF THE MIDTERM, HOWEVER OUR MIDTERM DOC SAYS WE CAN USE OUR LABS SO I INTEND TO DO SO*

## How to Run

```bash
npm install
npm run server
```

The server runs on:

```text
http://localhost:3000
```

## How to Test/ run the client

```bash
npm test
```

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/tasks` | Return all items |
| GET | `/tasks/:id` | Return one item |
| POST | `/tasks` | Create one item |
| PUT | `/tasks/:id` | Update one item |
| PATCH | `/tasks/:id` | Updates part of one item |
| DELETE | `/tasks/:id` | Delete one item |
