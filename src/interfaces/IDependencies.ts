import IIsExportTaskDone from "./IAwaitExportTaskDone";
import IExportLogGroups from "./IExportLogGroups";
import IOptions from "./IOptions";

export default interface IDependencies {
    exportLogs: (params: IExportLogGroups, options: IOptions) => Promise<any>;
    awaitExportTask: (params: IIsExportTaskDone, options: IOptions) => Promise<void>;
}