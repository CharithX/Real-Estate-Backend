import jwt from "jsonwebtoken";

export const shouldBeLoggeedIn = async (req, res) => {
 
    console.log(req.userId);
       res.status(200).json({ message: "You are Authenticated" });
};
export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token; 

    if (!token) return res.status(401).json({ message: "Not Authenticated" });

    jwt.verify(token, process.env.JWT_TOKEN, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });
        if (!payload.isAdmin) {
               res.status(403).json({ message:  "Not Authentized" });
        }
    });
    res.status(200).json({ message: "You are Authenticated" });
};
