import { httpStatusCodeEnum } from "../enums/httpStatusCode.enum";

interface ErrorModel {
  message: string;
}

interface WarningModel {
  message: string;
}

export class ResultResponseModel {
  public result: any;
  public errors: Array<ErrorModel>;
  public warnings: Array<WarningModel>;
  public success: boolean;
  public statusCode: httpStatusCodeEnum;

  constructor() {
    this.result = [];
    this.errors = [];
    this.warnings = [];
    this.success = false;
    this.statusCode = -1;
  }
}
