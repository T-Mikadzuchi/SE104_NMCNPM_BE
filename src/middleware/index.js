import admin from '../config/firebase-config'
class Middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization;
        try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Unauthorize' });
        } catch (error) {
            return res.json({ message: 'Internal error' })
        }
    }
}
module.exports = new Middleware(); 