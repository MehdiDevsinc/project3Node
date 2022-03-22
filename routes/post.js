import { Router } from "express";


const router = Router();

//---post a post
router.post('/', async (req,res) => {
    try {
        res.send( 'creating a post ');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//---get a post
router.get ('/:id', async (req,res) => {
    try {
        res.send ('get a specific post');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//---update a post
router.patch ('/:id', async (req, res) => {
    try {
        res.send ("update a specific post");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//---get all posts
router.get ('/', async (req, res ) => {
    try {
        res.send ('get all posts');
    } catch (error) {
        res.status(500).json ({message: error.message});
    }
})

//----delete a specific post
router.delete ('/:id', async (req, res) => {
    try {
        res.send ("delete a specific post");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;