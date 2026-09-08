import LoginForm from '../components/LoginForm'
import InventoryAnimation from '../components/animation';

export default function LandingPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Login form always visible */}
      <div className="flex flex-1 items-center justify-center">
        <LoginForm />
      </div>

      {/* Animation only visible on desktop, centered */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <InventoryAnimation />
      </div>
    </div>
  )
}