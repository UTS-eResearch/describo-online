import { demandKnownUser } from "../middleware";
import { cloneDeep } from "lodash";
import models from "../models";

export function setupOnedriveRoutes({ server }) {
    server.post(
        "/onedrive/configuration",
        demandKnownUser,
        saveUserOnedriveConfiguration
    );
}

async function saveUserOnedriveConfiguration(req, res, next) {
    let session = await models.session.findOne({
        where: { id: req.session.id },
    });
    let data = cloneDeep(session.data);
    data = {
        ...data,
        rclone: {
            onedrive: req.body,
        },
    };
    await session.update({ data });
    res.send({});
    next();
}
