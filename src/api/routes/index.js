import userRoute from './user.route';
const initRoutes = (app) => {
    app.use("/api/v1/user", userRoute);
    return app.use('/', (req, res) => {
        res.send('server on');
    });
}
export default initRoutes;