// routes/enrollments.js
router.get('/my', auth, async (req, res) => {
  try {
    const enrolls = await Enrollment.find({ userId: req.user.id })
      .populate('simulationId')  // <--- important
      .populate('userId');
    res.json(enrolls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
