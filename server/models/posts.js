import mongoose from "mongoose";

const { Schema, model } = mongoose;

const newPost = new Schema({
  title: String,
  description: String,
});

const postModel = model("POST", newPost);

export default postModel;
