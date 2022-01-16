export default interface ICWLogs {
    describeLobGroups: () => any
    exportLogs: (params: any) => any
    isTaskDone: (task_id: string) => Promise<boolean>
}