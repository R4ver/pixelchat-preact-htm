declare module "orchestrator" {
    import { IChatMessage, IFollow, IGiftSub, ISticker, ISubscription, ISupport, ICommand, iHost, IRaid, IResubscription } from "message";
    export interface OrchestratorEvents {
        message: ( msg: IChatMessage ) => void;
        sticker: ( msg: ISticker ) => void;
        support: ( msg: ISupport ) => void;
        command: ( msg: ICommand ) => void;
        follow: ( msg: IFollow ) => void;
        subscription: ( msg: ISubscription ) => void;
        giftsub: ( msg: IGiftSub ) => void;
        host: ( msg: iHost ) => void;
        raid: ( msg: IRaid ) => void;
        resub: ( msg: IResubscription ) => void;
    }
}