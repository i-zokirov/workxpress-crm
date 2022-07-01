import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'redux/actions/userActions'

const Logout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logoutUser())
  })
  return (
    <div></div>
  )
}

export default Logout