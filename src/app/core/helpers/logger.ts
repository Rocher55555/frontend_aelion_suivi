import * as moment from "moment";
export class Logger {

  public static infoStyle: string[] = [
    'background: blue',
    'color: white',
    'font-size: 1 em'
  ]


  public static info(message:string):void{
    console.log(Logger.messageBuilder(message), Logger.infoStyle.join(';'));
  }

  public static error(message:string): void{}

  public static warning(message: string): void{}


  // pour eviter de copier coller le code dans 'error' et 'warning'

  private static messageBuilder (message : string) : string{
    return moment().format('h:mm:ss') + ' %c' + message;
  }
}
