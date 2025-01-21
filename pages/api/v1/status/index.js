function status(req, response) {
  return response.status(200).json({ message: "status page it works!" });
}

export default status;
