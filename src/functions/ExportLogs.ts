import IExportLogGroups from "../interfaces/IExportLogGroups"
import IOptions from "../interfaces/IOptions"

export async function exportLogs(params: IExportLogGroups, options: IOptions) {
    const { log_group, backup_bucket, days } = params
    const { logs, folder, date, cwlogs } = options
    logs.info('Processando ', log_group)

    const s3_folder = folder.generatePrefix(log_group)
    const date_epoch = date.fromTodayBack(days)

    logs.info(date_epoch)

    const cwlogs_export_params = {
        destination: backup_bucket,
        from: date_epoch.from,
        logGroupName: log_group,
        to: date_epoch.to,
        destinationPrefix: s3_folder
    }

    return await cwlogs.exportLogs(cwlogs_export_params)
}