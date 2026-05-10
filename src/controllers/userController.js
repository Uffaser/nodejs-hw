import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true },
    { returnDocument: 'after' },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );

  res.status(200).json({ url: user.avatar });
};
