import launchSchema, { ILaunch } from "../models/launchSchema";
import Users, { IUser } from "../models/userSchema";
import { IResource } from "../models/organizationSchema";
import { getInfoMissiles, getInterceptsMissiles } from "../data/dataUtils";
import { sockets } from "./io";
import { sendEmit, sendToRoom } from "../app";
import { typesMissiles } from "../types/enums";
import { setim } from "./hendelSocketjLaunch";


export const hendelInterceptorLaunch = async (
    idfId: string, launchId: string
) => {
    try {
        const socket = sockets[idfId]

        const Interceptor: IUser = await Users.findById(idfId).lean() as IUser
        if (!Interceptor) throw new Error("");
        const launch: ILaunch = await launchSchema.findById(launchId).lean() as ILaunch
        if (!launch) throw new Error("");
        const resources = Interceptor.organization.resources as IResource[]
        const SelectedIntercepts = SelectingAnInterceptor(resources, launch.type)
        if (!SelectedIntercepts) throw new Error("cant interspect");
        resources.find((r) => r.name == launch.type)!.amount--
        launch.status = "intercepted"
        await Interceptor.save()
        await launch.save()
        sendEmit(socket, "missile-launch")
        sendToRoom(launch.location, "intercepted", launchId)
        const timing = setim.find((s)=>s.id == launch.id)
        clearInterval(timing?.interval)
        clearTimeout(timing?.timeout)

    } catch (error) {
        console.log(error);

    }

}


const SelectingAnInterceptor = (
    resources: IResource[], threat: typesMissiles
) => {
    const missile = getInterceptsMissiles(threat)
    return resources.filter((r) => r.amount > 0)
        .filter((r) => missile.map((m) => m.name).includes(r.name))[0]

} 