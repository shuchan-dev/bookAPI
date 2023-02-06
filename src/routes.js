// Import fungsi handler untuk menyimpan catatannya dan ganti hendlernya.
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  // Route Untuk Menyimpan Catatan
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },

  // Route untuk menampilkan Catatan
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },

  // Route untuk menampilkan Detail Catatan
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },

  // Route untuk Mengubah Catatan
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByIdHandler,
  },

  // Route untuk menghapus catatan
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
