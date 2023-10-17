import React from "react";
import { Chat } from "../models/chat.model";
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonRouterLink } from "@ionic/react";
import { User as UserIcon,}from "react-feather";
import './chatCard.scss'
import { ChatsPageRoutes } from "../../../utils/routes";
import { animationPageBuilder } from "../../../utils/animations";
const ChatInfo: React.FC<{}>= ()=>{
    return (
        <IonRouterLink 
        routerAnimation={animationPageBuilder}
		routerDirection="forward"
		routerLink={ChatsPageRoutes.CHAT_ROOM}
        >

        <IonCard className="flex rounded-xl h-30 my-3 mb-1 transition my-5 shadow-none "  button>
        <IonCardContent className="flex p-0">

            <div className="p-0 bg-[#453c7e]">
                <UserIcon 
                    width={100}
                    height={80}
                    />
            </div>
            <div className="flex flex-col px-6 p-4">
                <IonCardTitle className="font-bold">Card Title</IonCardTitle>

                <IonCardSubtitle >Card Subtitle</IonCardSubtitle>
            </div>
        </IonCardContent>
      
    </IonCard>
        </IonRouterLink>

        

);
}

       {/* <IonItem className="flex flex-col w-full rounded-xl my-3 mb-1 transition border" color={"light"} lines="none" button detail={false}>
            <div className="p-0 bg-[#453c7e]">
                <UserIcon 
                    width={80}
                    height={80}
                />
            </div>
                { <img src={chat.photo}/> }
            <IonLabel className="mx-10 ">
                <h2>Ricardo</h2>
                <p>Prueba</p>
                {/* <h2>{chat.name}</h2>
                <p>{chat.last}</p> }
            </IonLabel>
        </IonItem> */}
        

export default ChatInfo;