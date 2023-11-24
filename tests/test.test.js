const server = setupServer(
    rest.get("http://api.adviceslip.com/advice", (ctx, req, res) => {
        return res(ctx.json({slip: {id: 107, advice: "YOLO"}}));
    })
);


beforeAll(() => {
    server.listen();
});
afterAll(() => {
    server.close();
});
