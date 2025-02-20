export function Card({ children, className = "" }) {
    return <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>{children}</div>
  }
  
  export function CardHeader({ children, className = "" }) {
    return <div className={`space-y-1.5 ${className}`}>{children}</div>
  }
  
  export function CardTitle({ children, className = "" }) {
    return <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>
  }
  
  export function CardDescription({ children, className = "" }) {
    return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
  }
  
  