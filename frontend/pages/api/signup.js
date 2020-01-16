export default (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json({
    });
  } else {
    res.status(404).json({});
  }
};