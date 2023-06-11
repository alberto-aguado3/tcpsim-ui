import { act } from "react-dom/test-utils";
import { Channel } from "./channel";
import { Peer } from "./peer";

export class Simulator2 {
    public activePeer: Peer;
    public passivePeer: Peer;
    public channel: Channel;

    //TODO: Pensar el constructor, como setear estado inicial
    constructor(active: Peer, passive: Peer, channel: Channel) {
        this.activePeer = active;
        this.passivePeer = passive;
        this.channel = channel;
    }
}
