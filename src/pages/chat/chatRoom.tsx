import { IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from "@ionic/react"
import { Header, InputField } from "../../components"
import ChatInfo from "./components/chatInfo"

import {
	User as UserIcon,
    Search as SearchIcon,
	Phone as PhoneIcon,
	Mail as MailIcon,
	MapPin as PinIcon,
	Key as KeyIcon,
    Send as PaperPlaneOutline,
} from "react-feather";
import { BASE_COLORS } from "../../utils";
import './index.scss'
import Message from "./components/message/message";
export const ChatRoom = () => {

    return (
        <IonPage  >
                <Header goBack={true} />
                <IonHeader className="ion-no-border" >
                    <IonToolbar>
                        <ChatInfo></ChatInfo>
                    </IonToolbar>
                </IonHeader>

            <IonContent className="ion-padding ion-margin-bottom auth ">
                <Message message={'sender'}></Message>
                <Message message={'sender'}></Message>
            </IonContent>
            
            <IonFooter className=" bg-[#f1f5f9] flex items-center ion-no-border ion-padding  ">
                <IonInput className="bg-[white] h-14 py-8 border-2  w-full rounded-xl mb-5 transition border border-[#450A7A]" placeholder="Send text"></IonInput>
                <PaperPlaneOutline
                className="mx-5 mb-5" 
                    width={35}
                    height={35}
                    color={BASE_COLORS.purple}
                    
                />
            </IonFooter>

        </IonPage>
    )
}
