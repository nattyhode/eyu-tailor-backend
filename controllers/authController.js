const supabase = require('../config/db'); // አዲሱን ማገናኛ እንጠራለን
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. ዩዘርናሙ ዳታቤዝ ውስጥ መኖሩን በ Supabase ፈልጎ ማምጣት
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    // ዩዘሩ ካልተገኘ ወይም ስህተት ካለ
    if (error || !admin) {
      return res.status(401).json({ error: 'የተሳሳተ ዩዘርናም ወይም ፓስወርድ ነው!' });
    }

    // 2. ፓስወርዱ ትክክል መሆኑን ማረጋገጥ
    if (password !== admin.password) {
      return res.status(401).json({ error: 'የተሳሳተ ዩዘርናም ወይም ፓስወርድ ነው!' });
    }

    // 3. ቶከን (JWT Token) ማመንጨት
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'በተሳካ ሁኔታ ገብተዋል!',
      token,
      admin: { username: admin.username }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'በሰርቨር ላይ ችግር ተፈጥሯል' });
  }
};

module.exports = { loginAdmin };