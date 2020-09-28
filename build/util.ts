import { execSync, ExecSyncOptions } from 'child_process';

export function exec(cmd: string, options: ExecSyncOptions = { stdio: 'inherit' }) {
  return execSync(cmd, options);
}
