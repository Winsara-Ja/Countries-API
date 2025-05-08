import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user's favorite countries
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

// Add a country to favorites
router.post('/', auth, async (req, res) => {
  try {
    const { countryName, flag, capital, region } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    // Check if country is already in favorites
    const exists = user.favorites.some(fav => fav.countryName === countryName);
    if (exists) {
      return res.status(400).json({ message: 'Country already in favorites' });
    }

    user.favorites.push({ countryName, flag, capital, region });
    await user.save();
    
    res.status(201).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
});

// Remove a country from favorites
router.delete('/:countryName', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter(
      fav => fav.countryName !== req.params.countryName
    );
    await user.save();
    
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites' });
  }
});

export default router;