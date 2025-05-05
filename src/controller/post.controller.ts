import { Request, Response } from 'express';
import sendResponse from '../utils/response.processor';
import { prisma } from '../config/db';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!req.user) return sendResponse(req, res, 401, 'Unauthorized', null);

    const userId = req?.user?.id;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId
      }
    });

    return sendResponse(req, res, 201, 'Post created successfully', post);
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'Post creation failed', null);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    return sendResponse(req, res, 200, 'Posts retrieved successfully', posts);
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'Post retrieval failed', null);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

    if (!post) return sendResponse(req, res, 404, 'Post not found', null);

    return sendResponse(req, res, 200, 'Post retrieved successfully', post);
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'Post retrieval failed', null);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content }
    });

    return sendResponse(req, res, 200, 'Post updated successfully', post);
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'Post update failed', null);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({ where: { id: parseInt(id) } });

    return sendResponse(req, res, 200, 'Post deleted successfully', null);
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'Post deletion failed', null);
  }
};
