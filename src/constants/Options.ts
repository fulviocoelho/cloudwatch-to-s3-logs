import IOptions from "../interfaces/IOptions";
import { logs as logger } from '../utils/Logs'
import { cw_logs as cloudwatchlogs } from '../aws/CloudWatchLogs'
import { date } from "../utils/Date";
import { folder } from "../utils/Folder";
import { time } from "../utils/Time";

const options: IOptions = {
    cwlogs: cloudwatchlogs({apiVersion: '2014-03-28', region: 'us-east-2'}),
    logs: logger(),
    date: date(),
    folder: folder(),
    time: time()
};

export { options };