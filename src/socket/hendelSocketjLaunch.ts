import { sockets } from "./io";
import { ILaunchDTO, IThreatDTO } from "./eventsTypes";
import { typesMissiles } from "../types/enums";
import { getTimeMissiles } from "../data/dataUtils";
import Users, { IUser } from "../models/userSchema";
import launchSchema, { ILaunch } from "../models/launchSchema";
import { sendEmit, sendToRoom } from "../app";



const defultUser: IUser = new Users({
    username:"string",
    hashedPassword:"string",
    organization:{
        name: "Houthis",
        resources: [        {
            name:typesMissiles["Badr-1"],
            amount: 20
        },
        {
            name: "Quds-1",
            amount: 15
        }

        ],
        budget: 2000000
    },            launched:[{
        type:typesMissiles["Patriot"],
        status:"Hit"
    }]
})
export const setim:{id:string,interval:any,timeout:any}[] = []


export const hendelSocketjLaunch = async ({ location, type, userId }: ILaunchDTO) => {
    try {

        //מסה להוציא את היוזר ללא שליחת אוביקט אלא רק  אי די
        const launcher = await Users.findById(userId)
        if(!launcher) throw new Error("");
        if(launcher.organization.resources.find((name)=> name.name==type)!.amount-- <= 0  ) throw new Error("ampti slik");
        await launcher.save()
        const socket = sockets.userId
        sendEmit(socket,"missile-launch",type)
        const sped = getTimeMissiles(type)

        const launch = await updateArryLaunches({ location, type, userId} )
        const interval = setInterval(() => {
            const timeLeft = sped -( Date.now() - launch.created_at)
            sendEmit(socket,"countdown",{timeLeft, launch:launch.id})
            sendToRoom(location,"countdown",{timeLeft, launch:launch.id})
        }, 1000)
        const endingTime = setTimeout(() => {
            clearInterval(interval)
            launch.status="Hit"
            launch.save()
            sendToRoom(location,"updateArry",)
            sendEmit(socket,"updateArry")
        },sped*1000);
    
        setim.push({id:launch.id,
            interval:interval,
        timeout:endingTime})
        
        //להתחיל ספירה לאחור

    




    /*
    אם בוצע שיגור מירט ע"י משתמש
    יש לעדכן אצל המשגר 
    וכן אצל כל המאויימים(איך?)עי סוקט שמעדכן את המערך של האיומים
    //
      אם נגמר הזמן
       יש לעדכן בדאטא של המשגר ע"י המזהה שלו ששלח בהתחלה ומשמש כמפתח לסוקט 
    יש לעדכן אצל המשגר ע"י הסוקט ששמור במזהה שלו שהשיגור הסתיים בהצלחה
    יש לעדכן בדאטא של כל האיזור על פגיעה
    יש לעדכן בתצוגה שלהם ע"י רנדור של המערך המכיל את האיומים או עדכון ספציפי
       */


    console.log(`[socket.io]  new new room `);
} catch (error) {
        
}
}


const updateArryLaunches =async ({ location, type, userId }: ILaunchDTO)=>{
    try {
        const launch: ILaunch = new launchSchema({
            created_at: Date.now(),
            location:location,
            userId:userId,
            type:typesMissiles[type],
            status:"Launched"
        })
        await launch.save()
        sendToRoom(location,"updateArry",{})
        return launch
        //sendToRoom(location,"threat-launch",{})

        //לידע את המאוים)ע"י חדר) ולהוסיף שיגור למערך של כולם בתצוגה ובדאטה
        //לעדכן את הפרונט במשגר (שירד טיל) ושנוסף טיל במערך

    } catch (error) {
        throw new Error("err");
        
    }
}