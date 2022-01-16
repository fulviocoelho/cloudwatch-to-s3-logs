import { logs as logger, logs } from './utils/Logs'
import { cw_logs as cloudwatchlogs, cw_logs } from './aws/CloudWatchLogs'
import { folder } from './utils/Folder'
import { date } from './utils/Date'
import IMain from './interfaces/IMain'
import IExportLogGroups from './interfaces/IExportLogGroups'
import { time } from './utils/Time'
import IIsExportTaskDone from './interfaces/IAwaitExportTaskDone'

const main_params: IMain = {
    backup_bucket: 'test-backup-logs',
    days: 600,
    cwlogs: cloudwatchlogs({apiVersion: '2014-03-28', region: 'us-east-2'}),
    logs: logger(),
    date_utils: date(),
    folder_utils: folder(),
    time_utils: time()
};

async function exportLogs(params: IExportLogGroups) {
    const { log_group, logs, folder_utils, date_utils, backup_bucket, days, cwlogs } = params
    logs.info('Processando ', log_group)

    const s3_folder = folder_utils.generatePrefix(log_group)
    const date_epoch = date_utils.fromTodayBack(days)

    console.log(date_epoch)

    const cwlogs_export_params = {
        destination: backup_bucket,
        from: date_epoch.from,
        logGroupName: log_group,
        to: date_epoch.to,
        destinationPrefix: s3_folder
    }

    return await cwlogs.exportLogs(cwlogs_export_params)
}

async function awaitExportTask(params: IIsExportTaskDone) {
    const { task_id, cwlogs, time_utils } = params
    let isExportDone = await cwlogs.isTaskDone(task_id)

    console.log('IS DONE::', isExportDone)

    while(!isExportDone){
        await time_utils.sleep(60)
        isExportDone = await cwlogs.isTaskDone(task_id)
        console.log('IS DONE::', isExportDone)
    }
}

async function main(params: IMain) {
    const { cwlogs, logs, time_utils } = params
    const log_groups = await cwlogs.describeLobGroups()

    if(!log_groups.logGroups || log_groups.logGroups.length === 0) {
        throw new Error()
    }

    for(const log_group of log_groups.logGroups){
        if(!log_group.logGroupName) {
            continue
        }

        const exportlog_params = {
            log_group: log_group.logGroupName,
            ...params
        }

        let processing = true
        while(processing){
            try{
                const { taskId } = await exportLogs(exportlog_params)
                console.log(taskId)
                await awaitExportTask({ task_id: taskId, ...params })
                processing = false
            } catch (e: any) {
                logs.error(e)
                logs.error('ERROR::', e.code)
                if(e.code !== 'LimitExceededException'){
                    throw new Error()
                }
                time_utils.sleep(120)
            }
        }
    }
}

main(main_params);

// const params = {
//     destination: main_params.backup_bucket, /* required */
//     from: 1642029578864, /* required */
//     logGroupName: '/ecs/first-run-task-definition', /* required */
//     to: 16422964350000, /* required */
//     destinationPrefix: 'aws-lambda-poc'
//};

// 1641562993294

// (async () => {
//     const teste = cloudwatchlogs({apiVersion: '2014-03-28', region: 'us-east-2'})
//     const log_groups = await teste.describeLobGroups()
//     console.log(log_groups)
//     // await teste.exportLogs(params)
// })()

// logs.info(generatePrefix(log_group_name))
// logs.info(fromToday(3))