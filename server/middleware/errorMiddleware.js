import ApiError from "../error/apiError.js";

export default function (err, req, res) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Упс, ошибочка!" });
}
