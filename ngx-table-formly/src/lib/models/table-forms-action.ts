import { Observable } from 'rxjs';

export type TableFormlyActionSize = 'large' | 'small' | 'default';

export type TableFormlyActionType
  = 'add'
  | 'saveAll'
  | 'custom';

export interface TableFormlyAction {
  actionType?: TableFormlyActionType;
  text?: string;
  ghost?: boolean;
  shape?: 'circle'|'round';
  size?: TableFormlyActionSize;
  type?: 'primary'|'dashed'|'link';
  danger?: boolean;
  onClick?: (action: TableFormlyAction, event: Event) => boolean|Observable<boolean>|void;
  children?: TableFormlyAction[];
}
