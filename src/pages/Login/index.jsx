import { SignIn } from '@clerk/react'

function Login() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <SignIn />
    </div>
  )
}

export default Login