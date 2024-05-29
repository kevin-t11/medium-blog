import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { CreateBlogInput, UpdateBlogInput, createBlogInput, updateBlogInput } from '@kevint11/medium-common';

// Create the main Hono app
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

//writing a middleware
blogRouter.use('/*', async (c, next) => {
    try {
        // Get the authorization header
        const authheader = c.req.header("authorization") || "";

        // Extracting the Bearer token = ["Bearer", "token"]
        const token = authheader.split(" ")[1];

        if (!token) {
            c.status(403);
            return c.json({ error: "Token is missing!" });
        }

        // Verify the token
        const user = await verify(token, c.env.JWT_SECRET)

        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({ error: "You are not logged in!" });
        }
    } catch (error) {
        c.status(403);
        return c.json({ error: "Invalid token!" });
    }
});


//End point - create a blog post
blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid inputs !"
        })
    }
    const authorId = c.get("userId");
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });
        return c.json({
            id: blog.id
        });

    } catch (error) {
        c.status(400);
        return c.json({
            error: 'Failed to create blog post',
        });
    }
});


//End point - update a blog post
blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid inputs !"
        })
    }

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return c.json({
            id: blog.id
        });

    } catch (error) {
        c.status(400);
        return c.json({
            error: 'Failed to update blog post',
        });
    }
})

// TODO : adding a pagination means not showing the all blog posts but shows only 10 blog posts
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json({
        blogs
    })

})


//End point - get a particular blog post
blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        });
        return c.json({
            blog
        });

    } catch (error) {
        c.status(400);
        return c.json({
            error: 'Failed to getting the blog post',
        });
    }

})

