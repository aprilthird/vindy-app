import { IonItem, IonLabel, IonNote, IonText } from "@ionic/react"
import '../../index.scss'
export default function Message({message}:{message:String}){
    return (

    <IonItem 
        className="message owner"
        lines="none" >
        <IonLabel className="messageContent">
            <IonText className=" text-[15px] ion-text-wrap "> Mensaj pruebas  preubas preubas preubas pruebas purebas pruebas  </IonText>
            <IonNote>
                <small>10:00 pm </small>
            </IonNote>
        </IonLabel>
    </IonItem>

                
    )

    
}