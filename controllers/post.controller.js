import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const addPost = async (req, res) => { 
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const addpost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(addpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add a post!" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
        include: {
            postDetail: true,
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        }
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get a post!" });
  }
};
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts!" });
  }
};
export const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update a post!" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const deletepost = await prisma.post.findUnique({
      where: { id: id },
    });
    if (deletepost.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id: id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete a post!" });
  }
};
