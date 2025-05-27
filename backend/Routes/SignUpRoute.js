router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const newParent = new Parent({ email, password: hashed });
    await newParent.save();
    res.status(201).json({ message: 'Parent registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering parent' });
  }
});
