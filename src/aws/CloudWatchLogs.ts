import { CloudWatchLogs } from 'aws-sdk'
import ICWLogs from '../interfaces/ICWLogs'

function cw_logs(
    params: CloudWatchLogs.ClientConfiguration, 
    aws_logs: CloudWatchLogs = new CloudWatchLogs(params)
): ICWLogs {
    return {
        describeLobGroups: async () => {
            return aws_logs.describeLogGroups().promise()
        },
        exportLogs: async (params: any) => {
            return aws_logs.createExportTask(params).promise()
        },
        isTaskDone: async (task_id: string) => {
            const export_tasks = await aws_logs.describeExportTasks().promise()
            if(!export_tasks.exportTasks) {
                throw new Error()
            }
            const task = export_tasks.exportTasks.filter((task) => task.taskId === '2754b2bd-a5a2-4460-9011-83737eab2bb5')

            if(task.length === 0 || !task[0].status || !task[0].status.code) {
                throw new Error()
            }

            console.log(task[0])
            console.log(task[0].status.code)
            return task[0].status.code === 'COMPLETED' ? true : false
        }
    }
}

export { cw_logs }