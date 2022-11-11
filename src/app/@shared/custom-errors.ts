import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'duplicate',
    format: (label: string, error: any) => `${label} allerede i bruk`,
  },
  {
    error: 'emailInUse',
    format: (label: string, error: any) => `${label} allerede i bruk`,
  },
  {
    error: 'mustMatch',
    format: (label: string, error: any) => `${label} er ikke lik`,
  },
  {
    error: 'required',
    format: (label: string, error: any) => `${label} må oppgis`,
  },
  {
    error: 'email',
    format: (label: string, error: any) => `Ugyldig ${label}`,
  },
  {
    error: 'minlength',
    format: (label: string, error: any) => `${label} minst være ${error.requiredLength}`,
  },
  {
    error: 'maxlength',
    format: (label: string, error: any) => `${label} maks være ${error.requiredLength}`,
  },
  {
    error: 'pattern',
    format: (label: string, error: any) => `Ugyldig ${label}`,
  },
  {
    error: 'DOB',
    format: (label: string, error: any) => `${label} Bruker må være over 18 år`,
  },
  {
    error: 'CourseDate',
    format: (label: string, error: any) => `${label} er ikke lik`,
  },
  {
    error: 'ExpiryDate',
    format: (label: string, error: any) => `${label} er ikke lik`,
  },
];
