import * as React from 'react';
import { Form, required, minLength, ISubmitResult, IValues } from './Form';

const wait = async (num: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, num)
  })
}

const dummyRequest = async (values: IValues): Promise<ISubmitResult> => {
  await wait(1000)
  return {
    errors: {
      email: ['you can not use this email']
    },
    success: false
  }
}

const ContactUs: React.SFC = () => {
  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    const res = dummyRequest(values)
    return res
  }
  return (
    <Form defaultValues={{
      name: '',
      email: '',
      reason: 'Support',
      remark: ''
    }} validationRules={{
      name: [{ validator: required }, { validator: minLength, arg: 2}],
      email: { validator: required }
    }} onSubmit={handleSubmit}>
      <Form.Field name='name' label='name'  />
      <Form.Field name='email' label='email' type='Email'  />
      <Form.Field name='reason' label='reason' type='Select' options={['Marketing', 'Support', 'Other']}  />
      <Form.Field name='remark' label='remark' type='TextArea'  />
    </Form>
  )
}

export default ContactUs;