import express from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
  res.json({
    message: "Hello World"
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});