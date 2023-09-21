import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    // const token = req.headers.authorization;
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Тo access!',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Тo access!',
        });
    }

};