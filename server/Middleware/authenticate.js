const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
      // Extract the jwt token from the request headers
      const token = req.cookies.jwtoken;
      if(!token) return res.status(401).json({ error: 'Unauthorized' });

      try{
        // Verify the JWT token
        const decoded = jwt.verify(token, "THISISMYSECRETKEY");

        // Attach user information to the request object
        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}


module.exports = authenticate;
