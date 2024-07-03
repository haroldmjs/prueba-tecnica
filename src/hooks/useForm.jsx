import { useEffect, useState } from 'react'

const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  // Handler change input
  const handlerChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // Handler blur input
  const handlerBlur = (e) => {
    // handlerChange(e)
    setErrors(validateForm(form))
  }

  // Handler submit form to validate
  const handlerSubmit = async () => {
    setErrors(validateForm(form))

    return new Promise((resolve) => {
      if (Object.keys(errors).length === 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  return {
    form,
    errors,
    handlerChange,
    handlerBlur,
    handlerSubmit
  }
}

export default useForm
