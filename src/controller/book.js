import handleError from "../middleware/handdleError";
import {
  bookServicePagi,
  createBookservice,
  deleteBookById,
  getAllBookService,
  updateBookById,
} from "../service/bookService";
import fileUploader from "../config/cloudinaryConfig";
const handleGetBooks = async (req, res) => {
  try {
    console.log(req.params);
    const response = await bookServicePagi(req.query);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
      data: response?.data,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
const handleGetAllBooks = async (req, res) => {
  try {
    const response = await getAllBookService();
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
      data: response?.data,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
const handleCreateBook = async (req, res) => {
  try {
    let image = req.file;
    const response = await createBookservice(req.body, image);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
const handleUpdateBook = async (req, res) => {
  try {
    let image = req.file;
    const { id } = req.params;
    console.log("id", id);
    const response = await updateBookById(req.body, id, image);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
const handleDeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteBookById(id);
    return res.status(200).json({
      EC: response?.EC,
      EM: response?.EM,
    });
  } catch (error) {
    return handleError.internalServerError(req, res);
  }
};
export {
  handleGetBooks,
  handleGetAllBooks,
  handleCreateBook,
  handleUpdateBook,
  handleDeleteBook,
};
