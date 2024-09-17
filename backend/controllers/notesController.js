const saveNote = (req, res) => {
    const { note } = req.body;
  
    res.status(201).send('Note saved');
  };
  
  module.exports = { saveNote };
  