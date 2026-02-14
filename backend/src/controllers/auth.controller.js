import authService from '../services/auth.service';

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json({
         user :result.user,
        token: result.token
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export {
    login
}
