import { ChannelConfig, PeerConfig, SimConfig } from "tcpsim-logic";
import { Application, ControlBlock, Buffer, Peer, Channel } from "../models";
import { UiState } from "./ui-slice";

export function getUiInitialState(): UiState {
    const ctrlBlockActive: ControlBlock = {
        connectionState: "CLOSED",
        iss: 0,
        rcvNxt: 0,
        rcvWnd: 0,
        sndNxt: 0,
        sndUna: 0,
        sndWnd: 0,
        srcIp: "",
        srcPort: ""
    };
    
    const sndBufferActive: Buffer = {
        cells: [],
        startIndex: 0
    };
    
    const rcvBufferActive: Buffer = {
        cells: [],
        startIndex: 0
    };
    
    const applicationActive: Application = {
        dataToSend: "",
        dataReceived: "",
    };
    
    //const active: Peer = new Peer(ctrlBlockActive, sndBufferActive, rcvBufferActive, applicationActive);
    const active: Peer = {
        controlBlock: ctrlBlockActive,
        sendBuffer: sndBufferActive,
        recvBuffer: rcvBufferActive,
        application: applicationActive
    };

    const ctrlBlockPassive: ControlBlock = {
        connectionState: "CLOSED",
        iss: 0,
        rcvNxt: 0,
        rcvWnd: 0,
        sndNxt: 0,
        sndUna: 0,
        sndWnd: 0,
        srcIp: "",
        srcPort: ""
    };
    
    const sndBufferPassive: Buffer = {
        cells: [],
        startIndex: 0
    };
    
    const rcvBufferPassive: Buffer = {
        cells: [],
        startIndex: 0
    };
    
    const applicationPassive: Application = {
        dataToSend: "",
        dataReceived: "",
    };
    
    //const passive: Peer = new Peer(ctrlBlockPassive, sndBufferPassive, rcvBufferPassive, applicationPassive);
    const passive: Peer = {
        controlBlock: ctrlBlockPassive,
        sendBuffer: sndBufferPassive,
        recvBuffer: rcvBufferPassive,
        application: applicationPassive,
    };

    //const channel: Channel = new Channel(0);
    const channel: Channel = {
        segments: [],
        lossPercent: 0,
    };

    return {
        //simulator: new Simulator(active, passive, channel)
        activePeer: active,
        passivePeer: passive,
        channel: channel
    };
}

export function getLogicInitialState() {
    const activePeer: PeerConfig = {
        applicationData: "Prueba de enviar datos"
    };
    const passivePeer: PeerConfig = {};
    const channel: ChannelConfig = {
        lossPercent: 0,
        rtt: 2*1000,
    };
    
    const simCfg: SimConfig = new SimConfig(activePeer, passivePeer, channel);
    return simCfg;    
}