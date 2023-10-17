import { IonContent, IonHeader, IonLabel, IonList, IonPage, IonToolbar, useIonViewDidEnter, IonSearchbar } from "@ionic/react"
import { Card, CardSkeleton, Header, InputField, NumericKeyboard } from "../../components";
import { useState } from "react";
import { Chat } from "./models/chat.model";
import ChatInfo from "./components/chatInfo";
import { useAuthContext } from "../../features/auth/context/auth.hook";
import './index.scss'
import {
	User as UserIcon,
    Search as SearchIcon,
	Phone as PhoneIcon,
	Mail as MailIcon,
	MapPin as PinIcon,
	Key as KeyIcon,
} from "react-feather";
import { BASE_COLORS } from "../../utils";

export const ChatPage = () => {

    const [people, setPeople] = useState<Chat[]>([]);
    const { logout, state } = useAuthContext();
    console.log(state);
    return (
        <IonPage >
            
            <Header goBack={true} />
            <IonContent 
            
            className="ion-padding ion-margin-bottom auth "
            scrollY={true}
            forceOverscroll
            >
                <h2 className="pb-5 text-lg font-bold" > Bandeja de entrada </h2>
               
                <InputField 
                    placeholder="Buscar"
                    icon={
                        <SearchIcon
                            width={20}
                            height={20}
                            color={BASE_COLORS.gray}
                        />
                    }
                />
                <IonList >
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    <IonLabel >
                        <ChatInfo></ChatInfo>
                    </IonLabel>
                    
                </IonList>
            </IonContent>

        </IonPage>
    )
}