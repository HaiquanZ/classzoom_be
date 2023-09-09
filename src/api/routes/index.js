import errorHandler from '../middlewares/errorHandler';
import userRoute from './user.route';
import groupRoute from './group.route';
import postRoute from './post.route';
import roomRoute from './room.route';

const initRoutes = (app) => {
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/group", groupRoute);
    app.use("/api/v1/post", postRoute);
    app.use(errorHandler);
    app.use("/room", roomRoute);
    // return app.use('/', (req, res) => {
    //     res.send('server on');
    // });

    
}
export default initRoutes;