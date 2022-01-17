import IIsExportTaskDone from "../interfaces/IAwaitExportTaskDone";
import IOptions from "../interfaces/IOptions";

export async function awaitExportTask(params: IIsExportTaskDone, options: IOptions) {
    const { task_id } = params
    const { cwlogs, time, logs } = options;
    let isExportDone = await cwlogs.isTaskDone(task_id)

    logs.info('IS DONE::', isExportDone)

    while(!isExportDone){
        await time.sleep(60)
        isExportDone = await cwlogs.isTaskDone(task_id)
        logs.info('IS DONE::', isExportDone)
    }
}