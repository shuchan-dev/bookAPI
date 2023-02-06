// Library untuk membuat id unik dan acak
const { nanoid } = require("nanoid");
const books = require("./books.js");

// fungsi handler untuk route
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // menggunakan nanoid
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  //  Memasukan nilai-nilai tersebut ke dalam array books menggunakan method push().
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);

  // Validate the neme book undifined
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku, Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  // menentukan apakah newNote sudah masuk ke dalam array. Memanfaatkan method filter() berdasarkan id catatan untuk mengetahuinya.
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  //  menggunakan isSuccess untuk menentukan respons yang diberikan server. Jika isSuccess bernilai true, maka beri respons berhasil. Jika false, maka beri respons gagal.
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// Mendapatkan seluruh Buku.
const getAllBooksHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// Menampilkan detail Book
const getBookByIdHandler = (request, h) => {
  // Catatan yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter.
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Memperbarui Note
const editBookByIdHandler = (request, h) => {
  // Book yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter.
  const { id } = request.params;

  // Mendapatkan data books terbaru yang dikirimkan oleh client melalui body request
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku, Mohon isi nama buku",
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Menghapus Note
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  // dapatkan index dari object catatan sesuia dengan id
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  // jika index bernilai -1, maka kembalikan handler dengan respons gagal.
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
