import React from 'react'
import { useForm } from 'react-hook-form'
import './search.scss'

export default function Search () {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => console.log(data)

  console.log(watch('example'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="exampleRequired" placeholder="SEARCH" ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}
