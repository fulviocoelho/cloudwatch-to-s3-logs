import IMain from '../interfaces/IMain'
import IExportLogGroups from '../interfaces/IExportLogGroups'
import IOptions from '../interfaces/IOptions';
import IDependencies from '../interfaces/IDependencies';


export async function main(params: IMain, options: IOptions, { awaitExportTask, exportLogs }: IDependencies) {
    const { cwlogs, logs, time } = options
    const cloudwatch = await cwlogs.describeLobGroups()

    if(!cloudwatch.logGroups || cloudwatch.logGroups.length === 0) {
        logs.error('Array de log groups retornado invalido ou vazio')
        throw new Error()
    }

    for(const log_group of cloudwatch.logGroups){
        if(!log_group.logGroupName) {
            continue
        }

        const exportlog_params: IExportLogGroups = {
            log_group: log_group.logGroupName,
            ...params
        }

        let processing = true
        while(processing){
            try{
                const { taskId } = await exportLogs(exportlog_params, options)
                logs.info(taskId)
                await awaitExportTask({ task_id: taskId, ...params }, options)
                processing = false
            } catch (e: any) {
                logs.error(e)
                logs.error('ERROR::', e.code)
                if(e.code !== 'LimitExceededException'){
                    throw new Error()
                }
                time.sleep(parseInt(e.retryDelay))
            }
        }
    }
}