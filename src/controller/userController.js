import { userModel } from "../models/userModel.js";

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields manually
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email.toLowerCase();
    if (req.body.password) user.password = req.body.password;


    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export {updateUser}