import * as React from 'react';
import styles from './index.module.scss';

export interface IValues {
  [key: string]: any;
}

export type Validator = (
  name: string,
  values: IValues,
  args?: any
) => string;

export const required: Validator = (name: string, values: IValues, args?: any): string => {
  if (values[name] === undefined ||
    values[name] === null ||
    values[name] === '') {
    return 'This must be populated'
  }
  return ''
}

export const minLength: Validator = (name: string, values: IValues, length: number): string => {
  if (values[name] && values[name].length < length) {
    return `This must be at least ${length} characters`
  }
  return ''
}

interface IValidation {
  validator: Validator;
  arg?: any;
}

interface IValidationProps {
  [key: string]: IValidation | IValidation[]
}

interface IFormProps {
  defaultValues: IValues;
  validationRules?: IValidationProps;
  onSubmit: (values: IValues) => Promise<ISubmitResult>
}

interface IErrors {
  [key: string]: string[];
}

interface IState {
  values: IValues;
  errors: IErrors;
  submitting: boolean;
  submitted: boolean;
}

interface IFieldProps {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
}

interface IFormContext {
  values: IValues;
  errors: IErrors;
  setValue?: (name: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

const FormContext = React.createContext<IFormContext>({
  values: {},
  errors: {}
})

export class Form extends React.Component<IFormProps, IState> {
  public static Field: React.SFC<IFieldProps> = props => {
    const { name, label, type, options } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>, context: IFormContext) => {
      if (context.setValue) {
        context.setValue(name, e.currentTarget.value)
      }
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>, context: IFormContext) => {
      if (context.validate) {
        context.validate(props.name, e.currentTarget.value)
      }
    }
    return (
      <FormContext.Consumer>
        {context => (
          <div className={styles["form-group"]}>
            <label htmlFor={name}>{label}</label>
            {(type === "Text" || type === "Email") && (
              <input 
                type={type.toLowerCase()} 
                id={name} 
                value={context.values[name]}
                onBlur={e => handleBlur(e, context)}
                onChange={e => handleChange(e, context)} />
            )}
            {type === "TextArea" && (
            <textarea 
              id={name} 
              value={context.values[name]}
              onBlur={e => handleBlur(e, context)}
              onChange={e => handleChange(e, context)} />
            )}
            {type === "Select" && (
              <select 
                value={context.values[name]}
                onBlur={e => handleBlur(e, context)}
                onChange={e => handleChange(e, context)}>
                {options && options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {context.errors[name] && context.errors[name].length > 0 && context.errors[name].map(err => (
              <span className={styles['form-error']} key={err}>{err}</span>
            ))}
          </div>
        )}
      </FormContext.Consumer>

    );
  }

  constructor(props: IFormProps) {
    super(props)
    const errors: IErrors = {}
    Object.keys(props.defaultValues).forEach(key => {
      errors[key] = []
    })
    this.state = {
      values: props.defaultValues,
      errors,
      submitted: false,
      submitting: false
    }
  }
  public render () {
    const { values, errors } = this.state
    const context: IFormContext = {
      values,
      errors,
      setValue: this.setValue,
      validate: this.validate
    }
    return (
      <FormContext.Provider value={context}>
        <form className={styles.form} noValidate={true} onSubmit={this.handleSubmit}>
          {this.props.children}
          <div className={styles['form-group']}>
            <button disabled={this.state.submitted || this.state.submitting} type='submit'>Submit</button>
          </div>
        </form>
      </FormContext.Provider>
    )
  }
  private setValue = (name: string, value: any) => {
    const newValues = {...this.state.values, [name]: value}
    this.setState({ values: newValues })
  }

  private validate = (fieldName: string, value: any): string[] => {
    const rules = this.props.validationRules ? this.props.validationRules[fieldName] : ''
    const errors: string[] = []

    if (Array.isArray(rules)) {
      for (const rule of rules) {
        const error = rule.validator(fieldName, this.state.values, rule.arg)
        if (error) {
          errors.push(error)
        }
      }
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.arg)
        if (error) {
          errors.push(error)
        }
      }
    }

    const newErrors = { ...this.state.errors, [fieldName]: errors }
    this.setState({ errors: newErrors })

    return errors
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!this.validateForm()) {
      this.setState({ submitting: true })
      const result = await this.props.onSubmit(this.state.values)
      this.setState({
        errors: result.errors || {},
        submitted: result.success,
        submitting: false
      })
    }
  }

  private validateForm(): boolean {
    let hasError = false
    const errors: IErrors = {}

    Object.keys(this.props.defaultValues).forEach(key => {
      errors[key] = this.validate(key, this.state.values[key])
      if (errors[key].length > 0) {
        hasError = true
      }
    })

    this.setState({ errors })
    return hasError
  }
}

Form.Field.defaultProps = {
  type: "Text"
}