
export type AlertType = 'error' | 'success'

export class Alert {
  constructor(
    public message: string,
    public type: AlertType
  ) {}
}
