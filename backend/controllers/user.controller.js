import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        const allOtherUsers = await User
        .find({ _id: { $ne: loggedUserId } })
        .select("-password");

        res.status(200).json(allOtherUsers);
    } catch (error) {
        console.log("Error in get get users controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};