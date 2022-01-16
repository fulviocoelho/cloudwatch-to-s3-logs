import ICWLogs from './ICWLogs'
import IDate from './IDate'
import IFolder from './IFolder'
import ILogs from './ILogs'
import ITime from './ITime'

export default interface IMain {
    cwlogs: ICWLogs;
    logs: ILogs;
    folder_utils: IFolder;
    date_utils: IDate;
    time_utils: ITime;
    backup_bucket: string;
    days: number;
}