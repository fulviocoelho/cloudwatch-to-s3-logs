import { exportLogs } from '../functions/ExportLogs';
import { awaitExportTask } from '../functions/AwaitExportTask';
import IMain from '../interfaces/IMain';
import IDependencies from '../interfaces/IDependencies';
import { options } from '../constants/Options';
import { main } from './methods'

const main_params: IMain = {
    backup_bucket: 'test-backup-logs',
    days: 600,
};

const dependencies: IDependencies = {
    exportLogs,
    awaitExportTask
}

main(main_params, options, dependencies);