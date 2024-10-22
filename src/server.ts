import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify();

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
})

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" }
]

const drivers = [
    { id: 1, name: "Max Versatappen", team: "Red Bull Racing" },
    { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
    { id: 3, name: "Lando Norris", team: "McLaren" }
]

server.get("/teams", async (req, res) => {
    res.type("application/json").code(200);

    return teams;
});

server.get("/driver", (req, res) => {
    res.type("application/json").code(200)

    return drivers;
})

interface DriverParams {
    id: string
}
server.get<{ Params: DriverParams }>("/driver/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const driver = drivers.find(d => d.id === id);
    if (!driver) {
        res.type("application/json").code(404);
        return { message: "Driver not found" }
    } else {
        res.type("application/json").code(200);
        return { driver };
    }
});

server.listen({ port: 3333 }, () => {
    console.log("Server init");
});