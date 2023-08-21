import errorHandler from '../middlewares/errorHandler';
import userRoute from './user.route';
import groupRoute from './group.route';

const initRoutes = (app) => {
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/group", groupRoute);
    app.use(errorHandler);
    // return app.use('/', (req, res) => {
    //     res.send('server on');
    // });

    
}
export default initRoutes;