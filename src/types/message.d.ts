declare module "message" {
    interface IMessageEmote {
        type: "emote";
        url: string;
        text: string;
    }
    interface IMessageText {
        type: "text";
        text: string;
    }
    export type IMessage = IMessageEmote | IMessageText;
    export interface IChatMessage {
        user: {
            displayName?: string;
            name: string;
            id: string;
            color: string;
            badges?: string[];
            avatar: string;
            isMod: boolean;
            isSub: boolean;
            subMonths?: number;
            isVip?: boolean;
            isBroadcaster?: boolean;
        };
        special?: string;
        message: IMessage[];
        id: string;
        from: string;
    }
    export interface ISupport {
        username: string;
        avatar: string;
        amount: number | string;
        message?: string;
        currency: string;
    }
    export interface IFollow {
        user: {
            name: string;
            avatar: string;
        };
    }
    export interface ISubscription {
        user: {
            name: string;
            avatar: string;
        };
        level?: number;
    }
    export interface IGiftSub {
        user: {
            name: string;
            avatar: string;
        };
        recipient: {
            name: string;
            avatar: string;
        };
        level?: number;
    }
    export interface IResubscription {
        user: {
            name: string;
            avatar: string;
        };
        months: number;
        message?: string;
    }
    export interface iHost {
        user: {
            name: string;
            avatar: string;
        };
        viewers?: number;
    }
    export interface IRaid {
        user: {
            name: string;
            avatar: string;
        };
        viewers?: number;
    }
    export interface IShopItem {
        name: string;
        price: number;
        currency: string;
        icon: {
            png: string;
            animated: string | null;
        };
        bg: {
            initial: string | null;
            loop: string | null;
        };
    }
    export interface ISticker {
        user: {
            name: string;
            avatar: string;
        };
        sticker: {
            url: string;
            name: string;
            currency: string;
            price: number;
            bg: {
                initial: string | null;
                loop: string | null;
            };
        };
    }
    export interface ICommand {
        command: string;
        user: {
            displayName?: string;
            name: string;
            id: string;
            color: string;
            badges?: string[];
            avatar: string;
            isMod: boolean;
            isSub: boolean;
        };
        args: string[];
        from: string;
    }
    export interface YouTubeRaw {
        pollingIntervalMillis: number;
        pageInfo: {
            totalResults: number;
            resultsPerPage: number;
        };
        nextPageToken: string;
        items: [
            {
                kind: "youtube#liveChatMessage";
                id: string;
                snippet: {
                    type: "textMessageEvent";
                    hasDisplayContent: true;
                    displayMessage: string;
                    textMessageDetails: {
                        messageText: string;
                    };
                };
                authorDetails: {
                    channelId: string;
                    displayName: string;
                    profileImageUrl: string;
                    isVerified: boolean;
                    isChatOwner: boolean;
                    isChatSponsor: boolean;
                    isChatModerator: boolean;
                };
            }
        ];
    }
}