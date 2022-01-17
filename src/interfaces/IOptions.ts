import ICWLogs from "./ICWLogs";
import IDate from "./IDate";
import IFolder from "./IFolder";
import ILogs from "./ILogs";
import ITime from "./ITime";

export default interface IOptions {
    cwlogs: ICWLogs;
    folder: IFolder;
    date: IDate;
    time: ITime;
    logs: ILogs;
}