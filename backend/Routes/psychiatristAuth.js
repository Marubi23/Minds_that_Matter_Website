const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const Psychiatrist= require ('../models/Psychiatrist.js');

router.post('/')