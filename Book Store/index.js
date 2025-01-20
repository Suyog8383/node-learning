import express from "express";
const app = express();
//middleware
app.use(express.json());

const books = [
  {
    id: 1,
    title: "book 1",
  },
  {
    id: 2,
    title: "book 2",
  },
  {
    id: 3,
    title: "book 3",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

app.get("/book", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const existmentBooks = books.find((book) => book.id === bookId);
  if (existmentBooks) {
    res.status(200).send(existmentBooks);
  } else {
    res.status(404).send("book not found!");
  }
});

app.post("/book/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `book ${books.length + 1}`,
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "new book added!",
  });
});

app.put("/book/update/:id", (req, res) => {
  const bookId = parseInt(req.params.id);

  const existmentBooks = books.find((book) => book.id === bookId);
  if (existmentBooks) {
    existmentBooks.title = req.body.title || existmentBooks.title;
    res.status(200).json({
      message: `book with ID ${bookId} updated successfully`,
      data: existmentBooks,
    });
  } else {
    res.status(402).send("book not found");
  }
});

app.delete("/book/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const findBook = books.findIndex((book) => book.id === bookId);
  if (findBook !== -1) {
    const deleteBook = books.splice(findBook, 1);
    res.status(200).json({
      data: deleteBook,
      message: "book removed!",
    });
  } else {
    res.status(402).send("book not found");
  }
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});
