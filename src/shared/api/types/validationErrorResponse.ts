export interface ValidationErrorResponse {
  data: Data;
  status: number;
}

interface Data {
  name: 'ValidationError';
  message: string;
  list: {
    field: string;
    message: string[];
  }[];
}
