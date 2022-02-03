declare module "helper" {
    import { OrchestratorEvents } from "orchestrator";
    import { IFollow, IGiftSub, ISubscription, ISupport, iHost, IRaid, IResubscription } from "message";
    global {
        /**
         * The \`Pixel\` class is a global helper class for Pixel Chat overlay creation.
         * There are several helpful bits of data associated with it, such as general account information etc.
         * It is also the main event emitter for getting events such as chat messages, follows, etc.
         */
        class Pixel {
            static on<E extends keyof OrchestratorEvents>( event: E, listener: OrchestratorEvents[E] ): void;
            /**
             * Function to load scripts from an external source. Resolves a promise once loaded.
             * Since Pixel Chat overlays allow top level async/await,
             * you can use a top level await for this at the top of your script
             **/
            static loadScripts( url: string | string[] ): Promise<void>;
        }
    }
    type platforms = "twitch" | "glimesh" | "trovo";
    type types = "follow" | "subscription" | "giftsub" | "host" | "raid" | "resub" | "support";
    type history = IFollow | IGiftSub | ISubscription | iHost | IRaid | IResubscription | ISupport;
}