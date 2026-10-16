const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // ዳታቤዙን እናስነሳለን

const app = express();

// ሚድልዌር (Middlewares) - ሪኩዌስቶችን ለመቀበል
app.use(cors());
app.use(express.json());

// 1. ሰርቨሩ መስራቱን የምንፈትሽበት መንደርደሪያ ራውት
app.get('/', (req, res) => {
  res.json({ message: 'የ Eyu Tailor Backend በሰላም እየሰራ ነው! 🚀' });
});

// ፖርቱን መክፈት
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ ሰርቨሩ በፖርት ${PORT} ላይ ተነስቷል...`);
});