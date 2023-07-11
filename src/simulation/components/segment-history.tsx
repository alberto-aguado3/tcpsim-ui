import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../data-store";
import { Segment } from "../models";

type Row = {
    id: string
    srcIp: string
    srcPort: string
    dstIp: string
    dstPort: string
    lost: string
    seqNumber: number
    ackNumber: number
    syn: string
    ack: string
    fin: string
    window: number
    payloadLength: number
}

export const HistoryComponent: React.FC = () => {
    const delivered: Segment[] = useSelector((state: RootState) => state.simulator.history.segments);

    const columns: GridColDef[] = [
        { field: "srcIp", headerName: "Src IP", width: 150 },
        { field: "srcPort", headerName: "Src Port", width: 100 },
        { field: "dstIp", headerName: "Dst IP", width: 150 },
        { field: "dstPort", headerName: "Dst Port", width: 100 },
        { field: "lost", headerName: "Lost?", width: 50 },
        { field: "seqNumber", headerName: "SeqNum", width: 100 },
        { field: "ackNumber", headerName: "AckNum", width: 100 },
        { field: "syn", headerName: "SYN", width: 50 },
        { field: "ack", headerName: "ACK", width: 50 },
        { field: "fin", headerName: "FIN", width: 50 },
        { field: "window", headerName: "Window", width: 100 },
        { field: "payloadLength", headerName: "Payload", width: 150 },

    ];

    const rowData = delivered.map((segment: Segment): Row => {
        return {
            id: segment.id,
            srcIp: segment.header.source.ip,
            srcPort: segment.header.source.port,
            dstIp: segment.header.destination.ip,
            dstPort: segment.header.destination.port,
            lost: segment.travelState === "LOST"? "yes": "no",
            seqNumber: segment.header.seqNumber,
            ackNumber: segment.header.ackNumber,
            syn: segment.header.controlBits.syn ? "X": "",
            ack: segment.header.controlBits.ack ? "X": "",
            fin: segment.header.controlBits.fin ? "X": "",
            window: segment.header.window,
            payloadLength: segment.payload.length,
        };
    });

    return (
        <div>
            <DataGrid columns={columns} rows={rowData}/>
        </div>
    );
};
